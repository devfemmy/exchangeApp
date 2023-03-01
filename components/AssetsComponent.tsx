import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS, FONTS } from '../utils/constants/theme'
import { format, hp, wp } from '../utils/helper'
import GlobalStyle from '../utils/globalStyle'

const AssetsComponent = ({info, data, handleClick}: any) => {
  return (
    <TouchableOpacity onPress={() => handleClick(info, data)}>
    <View style={styles.actionCard2}>
      <View style={GlobalStyle.rowStart}>
        <Image
          source={info?.icon}
          resizeMode="cover"
          style={styles.icons}
        />
        <View style={{marginLeft: hp(10)}}>
          <Text style={{...FONTS.h3}}>
            {info?.token}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.gray,
              }}>{`$${format(data?.current_price.toFixed(2))}`}</Text>
            <Text
              style={{
                ...FONTS.body5,
                marginLeft: hp(4),
                color:
                  data?.price_change_percentage_24h === 0
                    ? COLORS.lightGray
                    : data?.price_change_percentage_24h > 0
                    ? COLORS.darkGreen
                    : COLORS.red,
              }}>{`${
              data?.price_change_24h.toFixed(2) +
              ' ' +
              `(${data?.price_change_percentage_24h.toFixed(2)})%`
            }`}</Text>
          </View>
        </View>
      </View>
      <View
        style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <AntDesign name="right" color={COLORS.gray} />
      </View>
    </View>
  </TouchableOpacity>
  )
}

export default AssetsComponent


const styles = StyleSheet.create({
    icons: {
        width: wp(30),
        height: hp(30),
      },
      actionCard2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(10),
        paddingBottom: hp(10),
        padding: 10,
        borderRadius: 10,
        borderBottomColor: COLORS.lightGray3,
        borderBottomWidth: 1,
      },
})