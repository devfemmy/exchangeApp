/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants/theme';
import MainLayout from '../mainLayout';
import { hp } from '../../utils/helper';
import HeaderComponent from '../../components/HeaderComponent';
import GlobalStyle from '../../utils/globalStyle';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import IconTextButton from '../../components/IconTextButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { verifyPhoneNumberOtp } from '../../slice/AuthSlice';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { modeStatus } from '../../slice/TradeSlice';

export default function VerifyPhonePin(props: any) {
  const dispatch = useAppDispatch()
  const [loader, setLoader] = useState(false)
  const phone = props?.route?.params?.params?.phone
  const [token, setToken] = useState<any>()
  const modeInfo = useAppSelector(modeStatus);
  
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
    btnContainer: {
      marginVertical: hp(15),
      width: '100%',
    },
  });


  
  const handleSubmit = async () => {
    const payload = {
      phoneNumber: phone,
      token: token,
      pin: ""
    }
    setLoader(true)
    try {
      var response = await dispatch(verifyPhoneNumberOtp(payload))
      if(verifyPhoneNumberOtp.fulfilled.match(response)){
          setLoader(false)
          return props?.navigation.navigate("SuccessScreen",{
            params: {
              header: "Phone verification successfully",
              text: "You have successfully verified your phone number"
            }
          })
      }
      else {
        var errMsg = response?.payload as string
        setLoader(false)
        Notifier.showNotification({
          title: 'Error',
          description: errMsg,
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
          },
        });
      }
    }
    catch(e){
      setLoader(false)
    }
    
  };


  return (
    <View style={[GlobalStyle.container,{backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
      <MainLayout>
        <ScrollView>
          <HeaderComponent onPress={() => props?.navigation.goBack()} />
          <Text style={{...FONTS.h2}}>Verify your Phone Number</Text>
          <Text style={styles.textStyle}>Enter the OTP code sent to your number 08140768378</Text>
          <View style={{marginVertical: 0, paddingHorizontal: 8}}>
            {/* <OTPTextView
              tintColor={COLORS.primary}
              textInputStyle={styles.textInputContainer}
              handleTextChange={(text: string) => setToken(text)}
              inputCount={4}
              keyboardType="default"
            /> */}
          <View style={{alignItems: 'center', marginVertical: 15}}>
            <SmoothPinCodeInput
              keyboardType="default"
                cellStyle={{
                  backgroundColor: COLORS.primary2,
                  borderRadius: 5,
                  color: COLORS.primary,
                  borderWidth: 0,
                  // width: hp(63),
                  // height: hp(63),
                }}
                codeLength={4}
                cellSize={65}
                cellSpacing={20}
                cellStyleFocused={{
                  borderColor: COLORS.primary,
                  borderBottomWidth: 4,
                }}
                value={token}
                onTextChange={(value: string) => setToken(value)}
              />

          </View>
            <Text style={styles.textStyle2}>Didn’t get the code ? Resend</Text>
            <View style={styles.btnContainer}>
          <IconTextButton label="Verify Phone Number" isLoading={loader} onPress={handleSubmit}/>
        </View>
          </View>
        </ScrollView>
      </MainLayout>
    </View>
  )
}