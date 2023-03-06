import { View, Text } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS, FONTS } from '../utils/constants/theme'

const EmptyScreen = () => {
  return (
    <View style={{alignItems: 'center'}}>
    <Feather name="cloud-off" size={200} color={COLORS.primary} />
    <Text
      style={{
        ...FONTS.h3,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
      }}>
      No transaction yet
    </Text>
    <Text style={{...FONTS.body3, textAlign: 'center'}}>
      This place is empty because you haven't done any transaction
    </Text>
  </View>
  )
}

export default EmptyScreen