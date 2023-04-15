import { View, Text } from 'react-native'
import React, { useState } from 'react'
import GlobalStyle from '../utils/globalStyle'
import HeaderComponent from '../components/HeaderComponent'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp } from '../utils/helper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ChatWootWidget from '@chatwoot/react-native-widget';
import config from '../slice/config'
import { useAppSelector } from '../app/hooks'
import { userState } from '../slice/AuthSlice'
import { modeStatus } from '../slice/TradeSlice'

const SupportScreen = ({navigation}: any) => {
  const [showWidget, toggleWidget] = useState(false);
  const userStateInfo = useAppSelector(userState);
  const modeInfo = useAppSelector(modeStatus);
  const getUserInfo = userStateInfo?.userData
  ? userStateInfo?.userData
  : userStateInfo;

  const user = {
    identifier: getUserInfo?.emailAddress,
    name: getUserInfo?.firstName + " " + getUserInfo?.lastName,
    avatar_url: getUserInfo?.image,
    email: getUserInfo?.emailAddress,
    identifier_hash: '',
  };
  const customAttributes = { accountId: getUserInfo?.id, pricingPlan: 'paid', status: 'active' };
  const websiteToken = config?.chatwoot_url;
  const baseUrl = 'https://app.chatwoot.com';
  const locale = 'en';


  
  return (
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : "#1a202c"}]}>
        <HeaderComponent onPress={() => navigation.goBack()} />
      <Text style={{...FONTS.h2, fontWeight: '600'}}>Reach out to Us</Text>
      <Text style={{...FONTS.body5, color: COLORS.gray, marginTop: hp(10), marginBottom: hp(30)}}>We love to hear from you and we will always be available to help!</Text>
   <TouchableOpacity onPress={() => toggleWidget(true)}>
   <View style={{backgroundColor: COLORS.lightPrimary, padding: hp(15), borderRadius: 10}}>
        <Text>Chat with us</Text>
    </View>
    {
        showWidget&&
          <ChatWootWidget
            websiteToken={websiteToken}
            locale={locale}
            baseUrl={baseUrl}
            closeModal={() => toggleWidget(false)}
            isModalVisible={showWidget}
            user={user}
            customAttributes={customAttributes}
          />
      }
   </TouchableOpacity>
    </View>
  )
}

export default SupportScreen