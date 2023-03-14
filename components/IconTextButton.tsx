/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
import {Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import {COLORS, FONTS, SIZES} from "../utils/constants/theme"
import { hp } from '../utils/helper'



const IconTextButton = ({label, containerStyle, isLoading,disabled, onPress}: any) => {
  return (
    <TouchableOpacity disabled={disabled} style={[styles.container, {borderRadius: SIZES.radius, backgroundColor: COLORS.primary, ...containerStyle}]} onPress={onPress}>
      {isLoading ? <ActivityIndicator color={COLORS.white} />  : <Text style={{...FONTS.h5, color: COLORS.white, fontSize: hp(15)}} >{label}</Text>}
    </TouchableOpacity>
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