import { View, Text, Linking } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/globalStyle'
import HeaderComponent from '../components/HeaderComponent'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp } from '../utils/helper'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SupportScreen = ({navigation}: any) => {
  return (
    <View style={GlobalStyle.container}>
        <HeaderComponent onPress={() => navigation.goBack()} />
      <Text style={{...FONTS.h2, fontWeight: '600'}}>Reach out to Us</Text>
      <Text style={{...FONTS.body5, color: COLORS.gray, marginTop: hp(10), marginBottom: hp(30)}}>We love to hear from you and we will always be available to help!</Text>
   <TouchableOpacity onPress={() => Linking.openURL('mailto:support@zendwallet.com')}>
   <View style={{backgroundColor: COLORS.lightPrimary, padding: hp(15), borderRadius: 10}}>
        <Text>Send us an email</Text>
    </View>
   </TouchableOpacity>
    </View>
  )
}

export default SupportScreen