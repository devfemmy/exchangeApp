/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/globalStyle'
import HeaderComponent from '../components/HeaderComponent'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp, wp } from '../utils/helper'
import { List } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather'


const ReferAndEarn = ({navigation}: any) => {
  return (
    <View style={GlobalStyle.container}>
     <HeaderComponent handlePress={() => navigation?.goBack()} />
    
        <View style={GlobalStyle.rowBetween}>
        <Text style={{...FONTS.h2,fontWeight:"700" }}>Refer a Friend</Text>
        <Text style={{...FONTS.h2,fontWeight:"700" }}>0/20</Text>
        </View>
        <Text style={{...FONTS.body5, color: COLORS.gray, width: wp(250), marginVertical: hp(10) }}>and earn $1 worth of TRON for every active user you refer</Text>
        <List.Item
    title={<Text style={{...FONTS.body3, color: COLORS.gray}}>Copy your referral Code</Text>}
    description={<Text style={{...FONTS.body4, color: COLORS.gray}}>share with friends</Text>}
    left={(props:any )=> <View style={styles.circle}><Text style={{...FONTS.body3, color: COLORS.white}}>1</Text></View>}
  />
   <List.Item
    title={<Text style={{...FONTS.body3, color: COLORS.gray}}>Friends register with your</Text>}
    description={<Text style={{...FONTS.body4, color: COLORS.gray}}>referral code</Text>}
    left={(props:any )=> <View style={styles.circle}><Text style={{...FONTS.body3, color: COLORS.white}}>2</Text></View>}
  />
   <List.Item
    title={<Text style={{...FONTS.body3, color: COLORS.gray}}>User sign up and trade</Text>}
    description={<Text style={{...FONTS.body5, color: COLORS.gray}}>crypto of atleast $100</Text>}
    left={(props:any )=> <View style={styles.circle}><Text style={{...FONTS.body3, color: COLORS.white}}>3</Text></View>}
  />

<List.Item
    title={<Text style={{...FONTS.body3, color: COLORS.gray}}>Get $1 TRON on first</Text>}
    description={<Text style={{...FONTS.body5, color: COLORS.gray}}>completed transaction</Text>}
    left={(props:any )=> <View style={styles.circle}><Text style={{...FONTS.body3, color: COLORS.white}}>4</Text></View>}
  />

  <Text style={{...FONTS.body5, textAlign: 'center', color: COLORS.gray, marginVertical: hp(10)}}>Refer link</Text>

  <View style={[GlobalStyle.rowStart, styles.card]}>
    <Text style={{...FONTS.h2, fontWeight: 'bold', marginRight: hp(20)}}>GLEERX-123463774</Text>
    <Feather name="copy" color={COLORS.primary} size={20} />
  </View>
  <Text style={{...FONTS.body5, textAlign: 'center', color: COLORS.gray, marginVertical: hp(10)}}>Terms and Conditions Apply</Text>

    </View>
  )
}

export default ReferAndEarn

const styles = StyleSheet.create({
    card: {
        padding: hp(20),
        backgroundColor: COLORS.primary2,
        justifyContent: 'center',
        borderRadius: 10
    },
    circle: {
        width: wp(50),
        height: hp(50),
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center'
    }
})