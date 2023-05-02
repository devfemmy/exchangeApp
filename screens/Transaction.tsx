/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */


import { View, Text,ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import MainLayout from './mainLayout'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp, wp } from '../utils/helper'
import TransactionCard from '../components/TransactionCard';
import SwapIcon from '../assets/svg/swap.svg';
import HistoryIcon from '../assets/svg/bitcoin-convert.svg';
import UsdIcon from '../assets/svg/usd.svg';
import TransIcon from '..//assets/svg/transaction-minus.svg'
import { useAppSelector } from '../app/hooks'
import { modeStatus } from '../slice/TradeSlice'
import { userState } from '../slice/AuthSlice'

const Transaction = () => {
  const modeInfo = useAppSelector(modeStatus);
  const userStateInfo = useAppSelector(userState);
  const getUserInfo = userStateInfo?.userData
  ? userStateInfo?.userData
  : userStateInfo;
  const transactionArray = [
    {
      id: 2,
      header: "Token Transactions",
      title: "View all your token transactions",
      icon: <HistoryIcon />,
      navigationScreen: "TokenHistory",
      color: "#e2e6fd",
  }, 
    {
      id: 1,
      header: "Swap History",
      title: "View all your swap transactions",
      icon: <SwapIcon />,
      navigationScreen: "SwapHistory",
      color: COLORS.primary,
  },
  {
    id: 4,
    header: "Zend Prepaid",
    title: "View all your prepaid transactions",
    icon: <TransIcon />,
    navigationScreen: "ZendPrepaidHistory",
    color: COLORS.primary2,
},
    {
        id: 3,
        header: "Zend USD",
        title: "View all your usd transactions",
        icon: <UsdIcon />,
        navigationScreen: "ZendUsdHistory",
        color: COLORS.lightOrange,
    },
   
]


  return (
    <MainLayout>
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
    <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{...FONTS.h2, fontWeight: '600', marginBottom: hp(5),color: modeInfo ? COLORS.lightBlack : COLORS.white}}>Transactions</Text>
       <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15}}>
       <Text style={{...FONTS.body4, color: modeInfo ? COLORS.gray : COLORS.white, marginBottom: hp(30), width: wp(200)}}>
          Select a transaction you will like to view
            </Text>
            <View>
                <Image style={styles.image} resizeMode='cover'  source={{uri: getUserInfo?.image}} defaultSource={require('../assets/images/placeholder.png')} />
            </View>
       </View>
            {
              transactionArray?.map((data, i) => {
                return <TransactionCard data={data} index={i} />
              })
            }
          </ScrollView>
   </View> 
  </MainLayout> 
  )
}

export default Transaction

const styles = StyleSheet.create({
  image: {
    width: wp(50),
    height: hp(50),
    borderRadius: 50,
},
})