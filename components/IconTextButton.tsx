/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
import {Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import {COLORS, FONTS, SIZES} from "../utils/constants/theme"



const IconTextButton = ({label, containerStyle, isLoading, onPress}: any) => {
  return (
    <TouchableOpacity style={[styles.container, {borderRadius: SIZES.radius, backgroundColor: COLORS.primary, ...containerStyle}]} onPress={onPress}>
      {isLoading ? <ActivityIndicator color={COLORS.white} />  : <Text style={{...FONTS.h3, color: COLORS.white}} >{label}</Text>}
    </TouchableOpacity>
  )
}

export default IconTextButton


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 50
    }

})