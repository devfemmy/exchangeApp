/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalStyle from '../utils/globalStyle';
import HeaderComponent from '../components/HeaderComponent';
import { COLORS, FONTS } from '../utils/constants/theme';
import { copyToClipboard, hp, wp } from '../utils/helper';
import { List } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getReferrerCode } from '../slice/WalletSlice';
import { userState } from '../slice/AuthSlice';


const ReferAndEarn = ({navigation}: any) => {
  let [referralCode, setReferralCode] = useState<any>();
  const userStateInfo = useAppSelector(userState);
  const dispatch = useAppDispatch()
  const getUserInfo = userStateInfo?.userData
  ? userStateInfo?.userData
  : userStateInfo;

  useEffect(() => {
    const payload = {
      userId: getUserInfo?.id
    }
    dispatch(getReferrerCode(payload)).then(pp => setReferralCode(pp?.payload?.data))
  }, [])
  

  return (
    <View style={GlobalStyle.container}>
     <HeaderComponent onPress={() => navigation?.goBack()} />

      <View>
      <View style={[GlobalStyle.rowBetween, styles.card]}>
        <View>
        <Text style={{...FONTS.body5, textAlign: 'left', color: COLORS.gray}}>Referral Code</Text>
          <Text style={{...FONTS.h2, fontWeight: '600', marginRight: hp(20)}}>{referralCode?.referralCode}</Text>
        </View>
        <TouchableOpacity onPress={() => copyToClipboard(referralCode?.referralCode)}>
          <Feather name="copy" color={COLORS.primary} size={20} />
        </TouchableOpacity>
      </View>
        <Text style={{...FONTS.body5, textAlign: 'left', color: COLORS.gray, marginVertical: hp(10)}}>Terms and Conditions Apply</Text>
      </View>

        <View style={GlobalStyle.rowBetween}>
        <Text style={{...FONTS.h2, fontSize: hp(20) }}>Refer a Friend</Text>
        </View>
        <Text style={{...FONTS.body4, color: COLORS.gray, marginVertical: hp(10) }}>Earn $1 worth of TRON for every active user you refer</Text>
        <List.Item
    title={<Text style={{...FONTS.body3, color: COLORS.gray}}>Copy your referral Code</Text>}
    description={<Text style={{...FONTS.body4, color: COLORS.gray}}>share with friends</Text>}
    left={(props:any )=> <View style={styles.circle}><Text style={{...FONTS.body3, color: COLORS.white}}>1</Text></View>}
  />

   <List.Item
    title={<Text style={{...FONTS.body3, color: COLORS.gray}}>Friends register with your</Text>}
    description={<Text style={{...FONTS.body4, color: COLORS.gray}}>referral code</Text>}
    left={(props:any )=> <View style={styles.circle}><Text style={{...FONTS.body3, color: COLORS.white}}>2</Text></View>}
  />
   <List.Item
    title={<Text style={{...FONTS.body3, color: COLORS.gray}}>User sign up and trade</Text>}
    description={<Text style={{...FONTS.body5, color: COLORS.gray}}>crypto of atleast $100</Text>}
    left={(props:any )=> <View style={styles.circle}><Text style={{...FONTS.body3, color: COLORS.white}}>3</Text></View>}
  />

<List.Item
    title={<Text style={{...FONTS.body3, color: COLORS.gray}}>Get $1 TRON on first</Text>}
    description={<Text style={{...FONTS.body5, color: COLORS.gray}}>completed transaction</Text>}
    left={(props:any )=> <View style={styles.circle}><Text style={{...FONTS.body3, color: COLORS.white}}>4</Text></View>}
  />
    </View>
  );
};

export default ReferAndEarn;

const styles = StyleSheet.create({
    card: {
        padding: hp(10),
        backgroundColor: COLORS.primary2,
        borderRadius: 10,
        paddingHorizontal: hp(20),
    },
    circle: {
        width: wp(50),
        height: hp(50),
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
