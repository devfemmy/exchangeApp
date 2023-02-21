import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp, wp } from '../utils/helper'
import { useNavigation } from '@react-navigation/native'

const TransactionCard = ({data}: any) => {
    const {header, title, icon, navigationScreen, color} = data
    const navigation = useNavigation() as any
  return (

    <View style={[styles.card, {backgroundColor: color}]}>
      <Text style={{...FONTS.h3, color: icon === "swap" ? COLORS.white : COLORS.black}}>{header}</Text>
      <Text style={{...FONTS.body5,color: icon === "swap" ? COLORS.white : COLORS.lightGray3}}>{title}</Text>
      <View style={{alignItems: 'flex-end'}}>
      <View style={styles.img}>
      <AntDesign name={icon} size={20} color={COLORS.primary} />
      </View>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => navigation.navigate(navigationScreen)}>
            <Text style={{...FONTS.body5, color: COLORS.primary}}>See Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TransactionCard


const styles = StyleSheet.create({
    card: {
        height: hp(170),
        borderRadius: 10,
        marginBottom: hp(20),
        padding: hp(15)
    },
    img: {
        backgroundColor: COLORS.white,
        padding: hp(10),
        width: wp(50),
        height: hp(50),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: hp(15)
    },
    btn: {
        backgroundColor: COLORS.white,
        width: hp(100),
        padding: hp(10),
        alignItems: 'center',
        borderRadius: 10,
    }
})