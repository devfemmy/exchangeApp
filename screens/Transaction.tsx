/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */


import { View, Text,ScrollView } from 'react-native'
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

const Transaction = () => {
  const modeInfo = useAppSelector(modeStatus);
  const transactionArray = [
    {
      id: 2,
      header: "Token Transactions",
      title: "View all your token transactions",
      icon: <HistoryIcon />,
      navigationScreen: "TokenHistory",
      color: COLORS.lightOrange,
  }, 
    {
      id: 1,
      header: "Swap History",
      title: "View all your swap transactions",
      icon: <SwapIcon />,
      navigationScreen: "SwapHistory",
      color: COLORS.primary2,
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
        color: COLORS.primary2,
    },
   
]


  return (
    <MainLayout>
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
    <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{...FONTS.h2, fontWeight: '600', marginBottom: hp(5),color: modeInfo ? COLORS.lightBlack : COLORS.white}}>Transactions</Text>
          <Text style={{...FONTS.body4, color: modeInfo ? COLORS.gray : COLORS.white, marginBottom: hp(30), width: wp(200)}}>
          Kindly select the transaction category you are looking for
            </Text>
            {
              transactionArray?.map(data => {
                return <TransactionCard data={data} />
              })
            }
          </ScrollView>
   </View> 
  </MainLayout> 
  )
}

export default Transaction