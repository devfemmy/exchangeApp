import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp, wp } from '../utils/helper'
import HeaderComponent from '../components/HeaderComponent'
import TranHistoryCard from '../components/TranHistoryCard'


const SwapHistory = ({navigation}: any) => {
  return (
    <View style={GlobalStyle.container}>
              <View style={styles.margin} />
              <HeaderComponent onPress={() => navigation.goBack()} /> 
      <Text style={{...FONTS.h2, fontWeight: '600'}}>Swap History</Text>
     
     <View style={styles.hr}></View>

     <View>
    <TranHistoryCard header="Swap" />
     </View>
    </View>
  )
}

export default SwapHistory

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
        borderBottomColor: COLORS.lightGray2,
        borderBottomWidth: 1,
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