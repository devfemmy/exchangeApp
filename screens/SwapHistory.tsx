/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, FlatList, ScrollView, Pressable, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp, wp } from '../utils/helper'
import HeaderComponent from '../components/HeaderComponent'
import TranHistoryCard from '../components/TranHistoryCard'
import { useAppDispatch } from '../app/hooks'
import { getSwapHistory } from '../slice/TradeSlice'
import SwapDetailModal from '../components/Modals/SwapDetail'
import { TextInput } from '../components/TextInput'
import EmptyScreen from '../components/EmptyScreen'
import Pagination from '../components/Pagination'


const SwapHistory = ({navigation}: any) => {
  const [swapData, setSwapData] = useState<any>()
  const dispatch = useAppDispatch() as any
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState<any>();
  const [value, setValue] = useState("")
  const [type, setType] = useState('all');
  const [page, setPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
    setDetails(null);
  };

  const handleModalOpen = (data: any) => {
    setModalVisible(true);
    setDetails(data);
  };

  useEffect(() => {
    const payload = {
        page: page, 
        status: type === "all" ? "" : type, 
        id: value?.length <= 0 ? "" : value
      }
    dispatch(getSwapHistory(payload)).then((pp: any)=> setSwapData(pp?.payload))
  }, [type, value, page])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const payload = {
      page: page, 
      status: type === "all" ? "" : type, 
      id: value?.length <= 0 ? "" : value
    }
  dispatch(getSwapHistory(payload)).then((pp: any)=> setSwapData(pp?.payload))
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

 
  const handlePagination = (data: any) => {
    if(data === "next") {
     setPage(swapData?.nextPage) 
    }
    else {
     setPage(swapData?.page - 1) 
    }
   }

  return (
    <View style={GlobalStyle.container}>
              <View style={styles.margin} />
              <HeaderComponent onPress={() => navigation.goBack()} /> 
      <Text style={{...FONTS.h2, fontWeight: '600'}}>Swap History</Text>
     
     <View style={styles.hr}></View>

     <View style={[GlobalStyle.rowStart]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
               width: wp(70),
              borderColor: type === 'all' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'all' ? 1 : 1,
              //  borderColor: COLORS.primary,
               borderRadius: hp(20),
              marginRight: hp(10),
              padding: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('all')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color: type === 'all' ? COLORS.primary : 'rgb(128, 128, 128)',
                }}>
                All
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              // backgroundColor:
              //   type === 'withdraw' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              borderColor: type === 'success' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'success' ? 1 : 1,
               borderRadius: hp(20),
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('success')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'success' ? COLORS.primary : COLORS.gray1,
                }}>
                Success
              </Text>
            </Pressable>
          </View>
          <View
            style={{
               width: wp(100),
              // backgroundColor:
              //   type === 'deposit' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
               borderRadius: hp(20),
              borderColor: type === 'pending' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'pending' ? 1 : 1,
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('pending')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'pending' ? COLORS.primary : COLORS.gray,
                }}>
                Pending
              </Text>
            </Pressable>
          </View>
          <View
            style={{
               width: wp(100),
              // backgroundColor:
              //   type === 'successful' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
               borderRadius: hp(20),
              borderColor: type === 'fail' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'fail' ? 1 : 1,
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('fail')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'fail' ? COLORS.primary : COLORS.gray,
                }}>
                Failed
              </Text>
            </Pressable>
          </View>

        </ScrollView>
      </View>
      
      <View style={styles.hr}></View>

     <View>
              <TextInput
                label={'Search transaction by id'}
                value={value}
                onChangeText={(value: any) => setValue(value)}
                searchInput
                style={{backgroundColor: COLORS.ldPrimary}}
              />
            </View>
            {
        swapData?.transactions?.length < 1 && <EmptyScreen />
      }
     <View style={{marginBottom: hp(280)}}>
      <FlatList 
        keyExtractor={item => item?.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{flexGrow: 1}}
        ListFooterComponent={swapData?.transactions?.length > 1 ? <Pagination data={swapData?.transactions} handlePagination={(data:any) => handlePagination(data)} /> : null}
        data={swapData?.transactions}
        renderItem={(item) => {
         return <TranHistoryCard data={item?.item} handlePress={(data: any) => handleModalOpen(data)} />;
        }}
      />
     </View>

     <SwapDetailModal modalVisible={modalVisible} setModalVisible={() => handleModalClose()} data={details} />
    </View>
  )
}

export default SwapHistory

const styles = StyleSheet.create({
    margin: {
        // marginVertical: 20,
      },
      icon: {
        marginVertical: 20,
      },
      hr: {
        width: "100%",
        height: hp(2),
        backgroundColor: COLORS.lightGray2,
        marginVertical: hp(15)
      },
      actionCard2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(10),
        paddingBottom: hp(10),
        borderBottomColor: COLORS.lightGray2,
        borderBottomWidth: 1,
      },
      icons: {
        width: wp(40),
        height: hp(40),
        backgroundColor: COLORS.primary2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
      },
})