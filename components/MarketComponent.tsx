import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/globalStyle'
import { hp, wp } from '../utils/helper'
import { COLORS, FONTS } from '../utils/constants/theme'

const MarketComponent = ({info, navigation,type, action}: any) => {
  return (
    <TouchableOpacity
    onPress={type === "funding" ? () =>
      navigation.navigate('AssetInfo', {
        currency: info?.currency,
        assetType: type,
        icon: info?.icon,
        name: info?.token
      })
      : () => {} 
    }>
    <View style={styles.actionCard2}>
      <View style={[GlobalStyle.rowStart, {width: "30%"}]}>
        <Image
          source={info?.icon}
          resizeMode="cover"
          style={styles.icons}
        />
        <View style={{marginLeft: hp(10)}}>
          <Text style={{...FONTS.body3, color: COLORS.lightBlack, fontWeight: 'bold'}}>
            {info?.token}
          </Text>
          <Text style={{...FONTS.body5, color: COLORS.lightBlack, textTransform: 'uppercase'}}>
            {info?.currency}
          </Text>
        </View>
        
      </View>
     {action(info?.currency?.toUpperCase())}
     {/* <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', width: "30%"}}>
                 <Text style={{...FONTS.h3,color: COLORS.lightBlack, fontWeight: "bold"}}>{`$${format(marketData?.current_price.toFixed(2))}`}</Text>
                      <Text style={{...FONTS.body5, color: marketData?.price_change_percentage_24h === 0 ? COLORS.lightGray : marketData?.price_change_percentage_24h > 0 ? COLORS.darkGreen : COLORS.red}}>{`${marketData?.price_change_24h.toFixed(2) + " " + `(${marketData?.price_change_percentage_24h.toFixed(2)})%`}`}</Text>
                 </View> */}
    </View>
  </TouchableOpacity>
  )
}

export default MarketComponent


const styles = StyleSheet.create({
    actionCard2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(10),
        paddingBottom: hp(10),
        borderBottomColor: COLORS.lightGray3,
        borderBottomWidth: 1,
      },
      icons: {
        width: wp(30),
        height: hp(30),
      },
})