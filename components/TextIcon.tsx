/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
import {Text, StyleSheet, View } from 'react-native'
import React from 'react'
import {COLORS, FONTS, SIZES} from '../utils/constants/theme'
import { hp } from '../utils/helper'



const TextIconIndicator = ({text, bg, color, icon}: any) => {
  const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: hp(25),
        minWidth: hp(85),
        borderRadius: 8,
        backgroundColor: bg,
    },
    text: {
      color: color,
      fontSize: hp(13),
      marginRight: hp(5)
    }

})
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View>
        {icon}
      </View>
    </View>
  )
}

export default TextIconIndicator
