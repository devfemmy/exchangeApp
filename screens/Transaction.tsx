/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */


import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import MainLayout from './mainLayout'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp } from '../utils/helper'
import TransactionCard from '../components/TransactionCard'

const Transaction = () => {

  const transactionArray = [
    {
        id: 1,
        header: "Token Transactions",
        title: "View all your token transactions",
        icon: 'arrowdown',
        navigationScreen: "Deposit",
        color: COLORS.primary2,
    },
    {
        id: 2,
        header: "Swap History",
        title: "View all your swap transactions",
        icon: 'swap',
        navigationScreen: "Swap",
        color: COLORS.primary,
    },
    {
        id: 4,
        header: "Zend Prepaid History",
        title: "View all your prepaid transactions",
        icon: 'sync',
        navigationScreen: "Prepaid",
        color: COLORS.primary2,
    },
    {
        id: 5,
        header: "Zend USD",
        title: "View all your usd transactions",
        icon: 'arrowdown',
        navigationScreen: "ZendUsd",
        color: COLORS.lightOrange,
    },
]


  return (
    <MainLayout>
    <View style={GlobalStyle.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{...FONTS.h2, marginBottom: hp(5)}}>Transactions</Text>
          <Text style={{...FONTS.body5, marginBottom: hp(30)}}>
          Select a transaction history you'll like to view
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