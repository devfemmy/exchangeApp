/* eslint-disable no-sequences */
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'
import { format, getCurrentDate, hp, wp } from '../utils/helper'

const TranHistoryCard = ({data, handlePress}: any) => {

  return (
    <TouchableOpacity onPress={() => handlePress(data)}>
    <View style={styles.actionCard2}>
      <View style={GlobalStyle.rowStart}>
        <View style={styles.icons}>
          <AntDesign name='swap' size={20} color={COLORS.darkGreen} />
        </View>
        <View style={{marginLeft: hp(10)}}>
          <Text style={{...FONTS.body3}}>
           {data?.fromCurrency}
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.gray
            }}>
              {getCurrentDate(data?.timeStamp)}
              {/* {data?.timeStamp} */}
          </Text>
        </View>
      </View>
      <View style={[GlobalStyle.rowStart, {width: wp(70)}]}>

        <View style={{marginLeft: hp(10)}}>
          <Text style={{...FONTS.body5, textAlign: 'center'}}>
           To
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.gray,
              textAlign: 'center'
            }}>
              {data?.toCurrency}
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            ...FONTS.body5,
            fontWeight: '600',
          }}>{`${format(
          parseFloat(data?.toCurrencyAmt).toFixed(5).slice(0, -1)
        )}`}</Text>
        <Text
          style={{
            ...FONTS.body5,
            textTransform: 'capitalize',
            color: data?.status === "success" ? COLORS.darkGreen : data?.status === "fail" ? COLORS.red : COLORS.orange
          }}>{data?.status}</Text>
      </View>
    </View>
  </TouchableOpacity>
  )
}

export default TranHistoryCard

const styles = StyleSheet.create({
    margin: {
        // marginVertical: 20,
      },
      icon: {
        marginVertical: 20,
      },
      hr: {
        width: "100%",
        height: hp(2),
        backgroundColor: COLORS.lightGray2,
        marginVertical: hp(15)
      },
      actionCard2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(15),
        paddingBottom: hp(10),
        borderColor: COLORS.lightGray3,
        borderWidth: 1,
        paddingVertical: hp(15),
        paddingHorizontal: hp(10),
        borderRadius: 10
      },
      icons: {
        width: wp(40),
        height: hp(40),
        backgroundColor: COLORS.lightGreen,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
      },
})