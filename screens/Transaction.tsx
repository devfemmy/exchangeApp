/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */


import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import MainLayout from './mainLayout'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp, wp } from '../utils/helper'
import TransactionCard from '../components/TransactionCard'

const Transaction = () => {

  const transactionArray = [
    {
      id: 1,
      header: "Swap History",
      title: "View all your swap transactions",
      icon: 'swap',
      navigationScreen: "SwapHistory",
      color: COLORS.primary2,
  },
    {
        id: 2,
        header: "Token Transactions",
        title: "View all your token transactions",
        icon: 'profile',
        navigationScreen: "TokenHistory",
        color: COLORS.lightOrange,
    }, 
    {
        id: 3,
        header: "Zend USD History",
        title: "View all your usd transactions",
        icon: 'pay-circle1',
        navigationScreen: "ZendUsd",
        color: COLORS.primary2,
    },
    {
        id: 4,
        header: "Zend Prepaid History",
        title: "View all your prepaid transactions",
        icon: 'sync',
        navigationScreen: "Prepaid",
        color: COLORS.primary2,
    },
   
]


  return (
    <MainLayout>
    <View style={GlobalStyle.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{...FONTS.h2, marginBottom: hp(5)}}>Transactions</Text>
          <Text style={{...FONTS.body5, color: COLORS.lightGray3, marginBottom: hp(30), width: wp(200)}}>
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