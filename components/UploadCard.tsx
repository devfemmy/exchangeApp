import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS, FONTS } from '../utils/constants/theme'
import { StyleSheet } from 'react-native'
import { hp } from '../utils/helper'

const UploadCard = ({header}: any) => {
  return (
    <View style={styles.div}>
    <AntDesign name="addfolder" size={20} color={COLORS.primary} />
    <Text style={{...FONTS.body5, color: COLORS.primary}}>
     {header}
    </Text>
  </View>
  )
}

export default UploadCard

const styles = StyleSheet.create({
    div: {
        marginTop: hp(30),
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 15,
        borderStyle: 'dashed',
        backgroundColor: COLORS.primary2,
        height: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(50),
      },
})