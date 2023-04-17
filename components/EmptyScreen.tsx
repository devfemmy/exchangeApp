import { View, Text } from 'react-native'
import React from 'react'

import { COLORS, FONTS } from '../utils/constants/theme'
import Empty from "../assets/svg/empty.svg"
import { hp } from '../utils/helper'
import { useAppSelector } from '../app/hooks'
import { modeStatus } from '../slice/TradeSlice'

const EmptyScreen = () => {
  const modeInfo = useAppSelector(modeStatus);

  
  return (
    <View style={{alignItems: 'center', marginTop: hp(-30)}}>
   <Empty />
    <Text
      style={{
        ...FONTS.h3,
        fontWeight: '600',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: modeInfo ? COLORS.lightBlack : COLORS.white,
      }}>
      No transaction yet
    </Text>
    <Text style={{...FONTS.body3, textAlign: 'center',color: modeInfo ? COLORS.lightBlack : COLORS.white,}}>
      This place is empty because you haven't done any transaction
    </Text>
  </View>
  )
}

export default EmptyScreen