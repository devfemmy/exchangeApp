import { View, Text } from 'react-native'
import React from 'react'

import { FONTS } from '../utils/constants/theme'
import Empty from "../assets/svg/empty.svg"
import { hp } from '../utils/helper'

const EmptyScreen = () => {
  return (
    <View style={{alignItems: 'center', marginTop: hp(-30)}}>
   <Empty />
    <Text
      style={{
        ...FONTS.h3,
        fontWeight: '600',
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