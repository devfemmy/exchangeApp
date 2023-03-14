import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'
import { format, hp, wp } from '../utils/helper'

const TranHistoryCard = ({header}: any) => {
  return (
    <TouchableOpacity>
    <View style={styles.actionCard2}>
      <View style={GlobalStyle.rowStart}>
        <View style={styles.icons}>
          <AntDesign name='arrowup' size={20} color={COLORS.primary} />
        </View>
        <View style={{marginLeft: hp(10)}}>
          <Text style={{...FONTS.body3}}>
           {header}
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.gray
            }}>
              From msjjsbb
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
          10000,
        )} ETH`}</Text>
        <Text
          style={{
            ...FONTS.body5,
            color: COLORS.darkGreen
          }}>Successful</Text>
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
        marginBottom: hp(10),
        paddingBottom: hp(10),
      },
      icons: {
        width: wp(40),
        height: hp(40),
        backgroundColor: COLORS.primary2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
      },
})