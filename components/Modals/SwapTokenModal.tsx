/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, { useState } from 'react';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {COLORS, FONTS} from '../../utils/constants/theme';
  import {format, hp, wp} from '../../utils/helper';
  import {TextInput} from '../TextInput';
  import {tokenBalanceData} from '../../utils/constants/tokenList';
  import GlobalStyle from '../../utils/globalStyle';
  import {ScrollView} from 'react-native-gesture-handler';
import {useAppSelector } from '../../app/hooks';
import { tradingAccount } from '../../slice/WalletSlice';
  
  const SwapTokenModal = ({modalVisible, setModalVisible, selectedToken, setSelectedToken}: any) => {
    const [value, setValue] = useState("")

   const tradingAccountInfo: any = useAppSelector(tradingAccount)
    const searchToken = tokenBalanceData?.filter(data => data?.currency?.toLowerCase().includes(value?.toLowerCase()) || data?.token?.toLowerCase().includes(value?.toLowerCase()))
  


    const selectType = (data: any) => {
        setSelectedToken(data)
    }

    const tradingAssets = (data: any) => {
      switch (data) {
        case data?.toUpperCase():
          return  <View style={styles.sub}>
            <Text style={{...FONTS.body5}}>{`${format(
            tradingAccountInfo?.[data?.toUpperCase()]?.availBal ?   `${parseFloat(tradingAccountInfo?.[data?.toUpperCase()]?.availBal).toFixed(2)}` : 0     
          )}`}</Text>
          <Text style={{...FONTS.body5, fontWeight: '600'}}>{`$${format(
            tradingAccountInfo?.[data?.toUpperCase()]?.availBal ?   parseFloat(tradingAccountInfo?.[data?.toUpperCase()]?.availBal).toFixed(2) : 0     
          )}`}</Text>    
        </View>
          break;
          default: 
            break;
          }
    }


    const assets = () => {
      return searchToken?.map(info => {
        return (
          <TouchableOpacity onPress={ selectedToken?.toLowerCase() === info?.currency?.toLowerCase() ? () => {} : () => selectType(info)}>
            <View style={[styles.actionCard2, {backgroundColor: selectedToken?.toLowerCase() === info?.currency?.toLowerCase() ? COLORS.lightGray2 : COLORS.white}]}>
              <View style={GlobalStyle.rowStart}>
                <Image
                  source={info?.icon}
                  resizeMode="cover"
                  style={styles.icons}
                />
                <View style={{marginLeft: hp(10)}}>
                  <Text style={{...FONTS.body3, fontWeight: '600'}}>
                    {info?.token}
                  </Text>
                  <Text style={{...FONTS.body5, textTransform: 'uppercase'}}>
                    {info?.currency}
                  </Text>
                </View>
              </View>
              {tradingAssets(info?.currency?.toUpperCase())}
              
            </View>
          </TouchableOpacity>
        );
      });
    };
  
    return (
     <View>
       <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setModalVisible()}>
                <View style={styles.end}>
                  <AntDesign name="close" size={30} />
                </View>
              </TouchableOpacity>
  
              <Text style={{...FONTS.h3, textAlign: 'center'}}>Select Token</Text>
              <View style={styles.search}>
                <TextInput label={'Search Assets'} value={value} onChangeText={(value) => setValue(value)} searchInput />
              </View>
              <ScrollView>{assets()}</ScrollView>
            </View>
          </View>
        </Modal>
      </View>
     </View>
    );
  };
  
  export default SwapTokenModal;
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.transparentBlack
    },
    modalView: {
      margin: 20,
      height: hp(600),
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 25,
      width: '90%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    end: {
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    search: {
      marginVertical: hp(15),
    },
    icons: {
      width: wp(20),
      height: hp(20),
    },
    actionCard2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp(10),
      paddingBottom: hp(10),
      padding: 10,
      borderRadius: 10,
    },
    sub: {
      justifyContent: 'flex-end', 
      alignItems: 'flex-end',
      width: "30%"
    }
  });