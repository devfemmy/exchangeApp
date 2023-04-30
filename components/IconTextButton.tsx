/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
import {Text, StyleSheet, ActivityIndicator, View } from 'react-native'
import React from 'react'
import {COLORS, FONTS, SIZES} from "../utils/constants/theme"
import { hp } from '../utils/helper'
import { TouchableOpacity } from 'react-native-gesture-handler'



const IconTextButton = ({label, containerStyle, isLoading,disabled, onPress}: any) => {
  return (
    <View style={{opacity: disabled ? 0.4 : 1}}>
    <TouchableOpacity disabled={disabled} style={[styles.container, {borderRadius: SIZES.radius, backgroundColor: COLORS.primary, ...containerStyle}]} onPress={onPress}>
      {isLoading ? <ActivityIndicator color={COLORS.white} />  : <Text style={{...FONTS.h5, color: COLORS.white, fontSize: hp(15)}} >{label}</Text>}
    </TouchableOpacity>
    </View>

  )
}

export default IconTextButton


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: hp(65)
    }

})