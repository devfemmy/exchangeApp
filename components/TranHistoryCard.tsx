/* eslint-disable no-sequences */
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp, wp } from '../utils/helper'
import moment from 'moment'
import { useAppSelector } from '../app/hooks'
import { modeStatus } from '../slice/TradeSlice'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TranHistoryCard = ({data, handlePress}: any) => {
  const modeInfo = useAppSelector(modeStatus);

  
  return (
    <TouchableOpacity onPress={() => handlePress(data)}>
    <View style={styles.actionCard2}>
      <View style={GlobalStyle.rowStart}>
        <View style={styles.icons}>
          <AntDesign name='swap' size={20} color={COLORS.darkGreen} />
        </View>
        <View style={{marginLeft: hp(10), width: wp(90)}}>
          <Text style={{...FONTS.body3, color:modeInfo ? COLORS.black : COLORS.white}}>
           {data?.fromCurrency}
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color:modeInfo ? COLORS.gray : COLORS.white,
              fontSize: hp(10)
            }}>
              {moment(data?.timeStamp).format('MMMM Do YYYY')}
          </Text>
        </View>
      </View>
      <View style={[GlobalStyle.rowStart, {width: wp(70)}]}>

        <View style={{marginLeft: hp(10)}}>
          <Text style={{...FONTS.body5, textAlign: 'center',color:modeInfo ? COLORS.black : COLORS.white}}>
           To
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color:modeInfo ? COLORS.gray : COLORS.white,
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
        {/* <Text
          style={{
            ...FONTS.body5,
            fontWeight: '600',
          }}>{`${format(
          parseFloat(data?.toCurrencyAmt).toFixed(5).slice(0, -1)
        )}`}</Text> */}
                <Text
          style={{
            ...FONTS.body5,
            fontWeight: '600',
            color:modeInfo ? COLORS.black : COLORS.white
          }}>{data?.toCurrencyAmt.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0]}</Text>
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
        borderColor: "rgba(72, 95, 230, 0.5)",
        borderWidth: 0.4,
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