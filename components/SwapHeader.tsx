import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import GlobalStyle from '../utils/globalStyle'
import { COLORS } from '../utils/constants/theme'
import { hp } from '../utils/helper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

const SwapHeader = ({header, handlePress}: any) => {
    const navigation = useNavigation() as any

  return (
    <View style={[GlobalStyle.rowBetween, {marginBottom: hp(20)}]}>
              <AntDesign
                name="arrowleft"
                size={hp(20)}
                onPress={() => navigation.goBack()}
              />
              <TouchableOpacity onPress={() => handlePress()}>
                <View style={styles.swap}>
                  <Text style={{marginRight: hp(5)}}>{header}</Text>
                  <MaterialIcons name="history" size={20} />
                </View>
              </TouchableOpacity>
            </View>
  )
}

export default SwapHeader

const styles = StyleSheet.create({
    swap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        paddingHorizontal: hp(10),
        paddingVertical: hp(5),
      },
})