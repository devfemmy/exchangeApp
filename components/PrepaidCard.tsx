import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../utils/constants/theme'
import { format, hp, wp } from '../utils/helper'
import GlobalStyle from '../utils/globalStyle'
import { tether } from '../assets/images'
import { TouchableOpacity } from 'react-native-gesture-handler'

const PrepaidCard = () => {
  return (
    <TouchableOpacity onPress={() => {}}>
    <View style={styles.actionCard2}>
      <View style={GlobalStyle.rowStart}>
        <Image
          source={tether}
          resizeMode="cover"
          style={styles.icons}
        />
        <View style={{marginLeft: hp(10)}}>
          <Text style={{...FONTS.h3}}>
            Annex Loaded
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.gray,
              }}>September 15, 12:01</Text>
          </View>
        </View>
      </View>
      <View
        style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
       <Text
              style={{
                ...FONTS.body5,
                marginLeft: hp(4),
                fontWeight: '600'
              }}>{format(1500)}</Text>
               <Text
              style={{
                ...FONTS.body5,
                marginLeft: hp(4),
                color:COLORS.darkGreen
              }}>Successful</Text>
      </View>
    </View>
  </TouchableOpacity>
  )
}

export default PrepaidCard


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