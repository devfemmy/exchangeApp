import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants/theme';
import MainLayout from '../mainLayout';
import { hp } from '../../utils/helper';
import HeaderComponent from '../../components/HeaderComponent';
import GlobalStyle from '../../utils/globalStyle';
import OTPTextView from 'react-native-otp-textinput';

export default function VerifyPhonePin({navigation}: any) {
  const styles = StyleSheet.create({
    textStyle: {
      color: '#808080',
      marginVertical: hp(15),
      fontSize: hp(14),
      lineHeight: hp(25),
    },
    textStyle2: {
      color: '#808080',
      marginVertical: hp(15),
      fontSize: hp(14),
      lineHeight: hp(25),
      textAlign: 'center',
    },
    textInputContainer: {
      backgroundColor: COLORS.primary2,
      borderRadius: 5,
      color: COLORS.primary,
      borderWidth: 0,
      width: hp(63),
      height: hp(63),
    },
  });
  return (
    <View style={[GlobalStyle.container]}>
      <MainLayout>
        <ScrollView>
          <HeaderComponent onPress={() => navigation.goBack()} />
          <Text style={{...FONTS.h2}}>Verify your Phone Number</Text>
          <Text style={styles.textStyle}>Enter the OTP code sent to your number 08140768378</Text>
          <View style={{marginVertical: 0, paddingHorizontal: 8}}>
            <OTPTextView
              tintColor={COLORS.primary}
              textInputStyle={styles.textInputContainer}
              handleTextChange={(text: string) => console.log(text)}
              inputCount={4}
              keyboardType="numeric"
              returnKeyType="done"
            />
            <Text style={styles.textStyle2}>Didn’t get the code ? Resend</Text>
          </View>
        </ScrollView>
      </MainLayout>
    </View>
  )
}