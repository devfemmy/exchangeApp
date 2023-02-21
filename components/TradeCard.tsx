import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { stroke } from '../assets/images'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp } from '../utils/helper'

const TradeCard = ( {data}: any) => {
    const navigation = useNavigation() as any
    const {icon, header, title, navigationScreen} = data

  return (
   <View style={styles.row}>
    <TouchableOpacity onPress={() => navigation.navigate(navigationScreen)}>
     <View style={GlobalStyle.rowStart}>
        <View style={styles.view} >
           <View style={styles.img}>
           <AntDesign name={icon} color={COLORS.primary} />
           </View>
            <View>
                <Text style={{...FONTS.body3}}>{header}</Text>
                <Text style={{...FONTS.body5}}>{title}</Text>
            </View>
        </View>
        <View>
        <Image source={stroke} />
        </View>
    </View>
   </TouchableOpacity>
   </View>
  )
}

export default TradeCard

const styles = StyleSheet.create({
    row: {
        paddingVertical: hp(10)
    },
    view: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        backgroundColor: COLORS.primary2,
        padding: hp(10),
        borderRadius: 50,
        marginRight: hp(15)
    }
})