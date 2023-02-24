/* eslint-disable react-native/no-inline-styles */


import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { FONTS, COLORS } from '../utils/constants/theme'


const TabIcon = ({focused, icon, iconStyle, label, isTrade}: any) => {
if(isTrade){
    return (
        <View style={[styles.container,{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
        }]}>
      <Image 
        source={icon}
        resizeMode="contain"
        style={{
            width: 30,
            height: 30,
            tintColor: COLORS.white,
            ...iconStyle,
        }}
      />
    </View>
    )
}
  return (
    <View style={styles.container}>
      <Image 
        source={icon}
        resizeMode="contain"
        style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.primary : COLORS.lightPrimary,
            ...iconStyle,
        }}
      />
      <Text style={[styles.text, {color: focused ? COLORS.primary : COLORS.lightPrimary, ...FONTS.h5}]}>{label}</Text>
    </View>
  )
}

export default TabIcon;


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
       fontWeight: '700',
    }
})