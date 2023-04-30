/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, Pressable, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, {useEffect, useState} from 'react'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp, wp } from '../utils/helper'
import HeaderComponent from '../components/HeaderComponent'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getTransactionHistory, modeStatus } from '../slice/TradeSlice'
import { TextInput } from '../components/TextInput'
import EmptyScreen from '../components/EmptyScreen'

import TransactionDetailModal from '../components/Modals/TransactionDetail'
import HistoryCard from '../components/HistoryCard'
import Pagination from '../components/Pagination'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'


const TokenHistory = ({navigation}: any) => {
  const [transactionData, setTransactionData] = useState<any>()
  const dispatch = useAppDispatch()
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState<any>();
  const [value, setValue] = useState("")
  const [type, setType] = useState('all');
  const [page, setPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false);
  const modeInfo = useAppSelector(modeStatus);
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
        status: (type === "success" || type === "incoming" || type === "pending" || type === "failed") ? type : "", 
        id: "",
        type: (type === "all" || type === "success" || type === "incoming" || type === "pending" || type === "failed")  ? "" : type,
      }
    dispatch(getTransactionHistory(payload)).then((pp: any) => setTransactionData(pp?.payload))
  }, [type, page])

  const onButtonClicked = () => {
    const payload = {
      page: page, 
      status: (type === "success" || type === "incoming" || type === "pending" || type === "failed") ? type : "", 
      id: value?.length <= 0 ? "" : value,
      type: (type === "all" || type === "success" || type === "incoming" || type === "pending" || type === "failed")  ? "" : type,
    }
  dispatch(getTransactionHistory(payload)).then((pp: any) => setTransactionData(pp?.payload))
  }


  const handlePagination = (data: any) => {
   if(data === "next") {
    setPage(transactionData?.nextPage) 
   }
   else {
    setPage(transactionData?.page - 1) 
   }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const payload = {
      page: page, 
      status: (type === "success" || type === "incoming" || type === "pending" || type === "failed") ? type : "", 
      id: value?.length <= 0 ? "" : value,
      type: (type === "all" || type === "success" || type === "incoming" || type === "pending" || type === "failed")  ? "" : type,
    }
  dispatch(getTransactionHistory(payload)).then((pp: any) => setTransactionData(pp?.payload))
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  return (
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
              <View style={styles.margin} />
              <HeaderComponent onPress={() => navigation.goBack()} /> 
      <Text style={{...FONTS.h3, fontWeight: '600',color:modeInfo ? COLORS.black : COLORS.white}}>Token Transactions</Text>
      {/* <View style={[GlobalStyle.rowStart, {marginTop: hp(30), marginBottom: hp(20)}]}>
        <ScrollView style={{paddingVertical: 20}} horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="always">
       
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
            }} pointerEvents="none">
            <TouchableOpacity onPress={() => setType('all')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color: type === 'all' ? COLORS.primary : 'rgb(128, 128, 128)',
                }}>
                All
              </Text>
            </TouchableOpacity>
          </View>
          <View
          pointerEvents="none"
            style={{
              width: wp(100),
              // backgroundColor:
              //   type === 'withdraw' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              borderColor: type === 'withdraw' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'withdraw' ? 1 : 1,
               borderRadius: hp(20),
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setType('withdraw')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                  type === 'withdraw' ? COLORS.primary : COLORS.gray1,
                }}>
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>
          <View
          pointerEvents="none"
            style={{
              width: wp(100),
              // backgroundColor:
              //   type === 'deposit' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
               borderRadius: hp(20),
              borderColor: type === 'deposit' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'deposit' ? 1 : 1,
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setType('deposit')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'deposit' ? COLORS.primary : COLORS.gray,
                }}>
                Deposit
              </Text>
            </TouchableOpacity>
          </View>
          <View
          pointerEvents="none"
            style={{
              width: wp(100),
              // backgroundColor:
              //   type === 'successful' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
               borderRadius: hp(20),
              borderColor: type === 'success' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'success' ? 1 : 1,
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setType('success')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'success' ? COLORS.primary : COLORS.gray,
                }}>
                Successful
              </Text>
            </TouchableOpacity>
          </View>
          <View
          pointerEvents="none"
            style={{
              width: wp(100),
              // backgroundColor:
              //   type === 'incoming' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
                 marginRight: hp(10),
              borderRadius: hp(20),
              borderColor: type === 'incoming' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'incoming' ? 1 : 1,
              padding: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setType('incoming')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'incoming' ? COLORS.primary : COLORS.gray,
                }}>
                Incoming
              </Text>
            </TouchableOpacity>
          </View>
          <View
          pointerEvents="none"
            style={{
              width: wp(100),
              // backgroundColor:
              //   type === 'pending' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              //   marginRight: hp(10),
               borderRadius: hp(20),
              borderColor: type === 'pending' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'pending' ? 1 : 1,
              marginRight: hp(10),
              padding: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setType('pending')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'pending' ? COLORS.primary : COLORS.gray,
                }}>
                Pending
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: wp(100),
              // backgroundColor:
              //   type === 'failed' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              borderRadius: hp(20),
              //   marginRight: hp(10),
                borderColor: type === 'failed' ? COLORS.primary : COLORS.gray,
                borderWidth: type === 'failed' ? 1 : 1,
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setType('failed')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color: type === 'failed' ? COLORS.primary : COLORS.gray,
                }}>
                Failed
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View> */}
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
         borderColor: type === 'withdraw' ? COLORS.primary : COLORS.gray,
         borderWidth: type === 'withdraw' ? 1 : 1,
          borderRadius: hp(20),
           marginRight: hp(10),
           padding: hp(5),
           justifyContent: 'center',
           alignItems: 'center',
       }}>
       <Pressable onPress={() => setType('withdraw')}>
         <Text
           style={{
             ...FONTS.h5,
             textAlign: 'center',
             color:
               type === 'withdraw' ? COLORS.primary : COLORS.gray1,
           }}>
           Withdraw
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
         borderColor: type === 'deposit' ? COLORS.primary : COLORS.gray,
         borderWidth: type === 'deposit' ? 1 : 1,
           marginRight: hp(10),
           padding: hp(5),
           justifyContent: 'center',
           alignItems: 'center',
       }}>
       <Pressable onPress={() => setType('deposit')}>
         <Text
           style={{
             ...FONTS.h5,
             textAlign: 'center',
             color:
               type === 'deposit' ? COLORS.primary : COLORS.gray,
           }}>
           Deposit
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
         borderColor: type === 'successful' ? COLORS.primary : COLORS.gray,
         borderWidth: type === 'successful' ? 1 : 1,
           marginRight: hp(10),
           padding: hp(5),
           justifyContent: 'center',
           alignItems: 'center',
       }}>
       <Pressable onPress={() => setType('successful')}>
         <Text
           style={{
             ...FONTS.h5,
             textAlign: 'center',
             color:
               type === 'successful' ? COLORS.primary : COLORS.gray,
           }}>
           Successful
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
         borderColor: type === 'incoming' ? COLORS.primary : COLORS.gray,
         borderWidth: type === 'incoming' ? 1 : 1,
           marginRight: hp(10),
           padding: hp(5),
           justifyContent: 'center',
           alignItems: 'center',
       }}>
       <Pressable onPress={() => setType('incoming')}>
         <Text
           style={{
             ...FONTS.h5,
             textAlign: 'center',
             color:
               type === 'incoming' ? COLORS.primary : COLORS.gray,
           }}>
           Incoming
         </Text>
       </Pressable>
     </View>
     {/* <View
       style={{
          width: wp(100),
         // backgroundColor:
         //   type === 'successful' ? COLORS.primary : COLORS.white,
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
         borderColor: type === 'failed' ? COLORS.primary : COLORS.gray,
         borderWidth: type === 'failed' ? 1 : 1,
           marginRight: hp(10),
           padding: hp(5),
           justifyContent: 'center',
           alignItems: 'center',
       }}>
       <Pressable onPress={() => setType('failed')}>
         <Text
           style={{
             ...FONTS.h5,
             textAlign: 'center',
             color:
               type === 'failed' ? COLORS.primary : COLORS.gray,
           }}>
           Failed
         </Text>
       </Pressable>
     </View> */}
   </ScrollView>
 </View>
 
 <View style={styles.hr}></View>

     <View style={GlobalStyle.rowStart}>
             <View style={{width: '85%'}}>
             <TextInput
                label={'Search transaction by id'}
                value={value}
                onChangeText={(value: any) => setValue(value)}
                searchInput
                style={{backgroundColor: COLORS.ldPrimary}}
              />
             </View>
              <View style={styles.box}>
               <TouchableOpacity onPress={() => onButtonClicked()}>
               <AntDesign name="search1" color={COLORS.white} size={20} />
               </TouchableOpacity>
              </View>
            </View>
            {
        transactionData?.transactions?.length < 1 && <EmptyScreen />
      }
     <View style={{marginBottom: hp(350)}}>
      <FlatList 
        keyExtractor={item => item?.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={transactionData?.transactions?.length > 1 ? <Pagination data={transactionData} handlePagination={(data:any) => handlePagination(data)} /> : null}
        data={transactionData?.transactions}
        renderItem={(item) => {
         return <HistoryCard data={item?.item} handleClick={(data: any) => handleModalOpen(data)} />;
        }}
      />
     </View>

     <TransactionDetailModal modalVisible={modalVisible} setModalVisible={() => handleModalClose()} data={details} />
    </View>
  )
}

export default TokenHistory

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
      },
      icons: {
        width: wp(40),
        height: hp(40),
        backgroundColor: COLORS.primary2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
      },
      box: {
        backgroundColor: COLORS.primary,
        width: '15%',
        height: 50,
        marginTop: hp(-14),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 5
      }
})