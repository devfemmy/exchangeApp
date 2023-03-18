/* eslint-disable semi */
import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/globalStyle'
import HeaderComponent from '../components/HeaderComponent'
import { FONTS } from '../utils/constants/theme'
import { format, hp, wp } from '../utils/helper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import IconTextButton from '../components/IconTextButton'

const ConfirmSwap = (props: any) => {
    const fromIcon =  props?.route.params.info.fromIcon
   const fromName = props?.route.params.info.fromName
    const toIcon = props?.route.params.info.toIcon
   const toName = props?.route.params.info.toName
   const amount = props?.route.params.info.amount

 
  return (
    <View style={GlobalStyle.container}>
        <HeaderComponent  onPress={() => props?.navigation.goBack()} />
      <Text style={{...FONTS.h2, fontWeight: "700"}}>Confirm Swap</Text>
      <Text style={{...FONTS.body5}}>Kindly confirm this transaction</Text>
      <View style={styles.div}>
      <View style={styles.div2}>
        <Image source={fromIcon} style={styles.icon} />
        <AntDesign name="swap" size={20} />
        <Image source={toIcon} style={styles.icon} />
      </View>
      </View> 
      
       <View>
        <View style={[GlobalStyle.rowBetween, {paddingVertical: hp(15)}]}>
            <Text>Rate</Text>
            <Text></Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {paddingVertical: hp(15)}]}>
            <Text>From</Text>
            <Text style={{textTransform: 'uppercase'}}>{format(amount)} {fromName}</Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {paddingVertical: hp(15)}]}>
            <Text>Fee</Text>
            <Text style={{textTransform: 'uppercase'}}>{toName}</Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {paddingVertical: hp(15)}]}>
            <Text>Total value to receive</Text>
            <Text style={{textTransform: 'uppercase'}}>{toName}</Text>
        </View>
      </View>

      <View style={{marginTop: hp(40)}}>
            <IconTextButton label="Swap Token" />
          </View>

    </View>
  )
}

export default ConfirmSwap

const styles = StyleSheet.create({
    icon: {
        width: wp(30),
        height: hp(30)
    },
    div: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp(30)
    },
    div2: {
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})