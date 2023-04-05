/* eslint-disable quotes */
import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import {Notifier, NotifierComponents} from 'react-native-notifier';

import {hp, wp} from '../utils/helper';
import {COLORS, FONTS} from '../utils/constants/theme';
import IconTextButton from '../components/IconTextButton';
import GlobalStyle from '../utils/globalStyle';
import {verifyEmail} from '../slice/AuthSlice';
import {useAppDispatch} from '../app/hooks';


const EmailVerification = (props: any) => {
  const emailAddress = props?.route?.params?.params?.emailAddress;
  const isNewAccount = props?.route?.params?.params?.newAccount;
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const [code, setCode] = useState<any>();

  const handleSubmit = async () => {
    setLoader(true);
    const data = {
      token: code?.toLowerCase(),
      email: emailAddress,
    };
    try {
      if (isNewAccount) {
        var response = (await dispatch(verifyEmail(data))) as any;
        if (verifyEmail.fulfilled.match(response)) {
            setLoader(false);
           
        } else {
          var errMsg = response?.payload as string;
          setLoader(false);
          
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
      else {

      }
    } catch (e) {}
  };

  return (
    <View style={GlobalStyle.container}>
      <AntDesign
        onPress={() => props.navigation.goBack()}
        name="arrowleft"
        style={styles.icon}
        size={hp(20)}
        color={COLORS.gray2}
      />

      <Text style={{...FONTS.h2}}>Verify your Email Address</Text>

      <Text
        style={{
          ...FONTS.body5,
          color: COLORS.gray,
        }}>{`Enter the OTP code sent to your email ${emailAddress}`}</Text>

      <View style={styles.otp}>
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
                codeLength={6}
                cellSize={40}
                cellSpacing={20}
                cellStyleFocused={{
                  borderColor: COLORS.primary,
                  borderBottomWidth: 4,
                }}
                value={code}
                onTextChange={(value: string) => setCode(value)}
              />
      </View>
      <View style={styles.bottom}>
        <IconTextButton
          label="Continue"
          isLoading={loader}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(10),
    flex: 1,
    backgroundColor: 'white',
  },
  txt: {
    marginTop: hp(35),
  },
  txt2: {
    marginTop: hp(10),
    marginBottom: hp(24),
  },
  icon: {
    marginVertical: hp(20),
  },
  otpInputView: {
    width: '87%',
    height: hp(50),
  },
  underlineStyleBase: {
    width: wp(40),
    height: hp(40),
    borderRadius: 5,
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  otp: {
    width: '100%',
    marginTop: hp(40),
    marginHorizontal: hp(5),
    flex: 3,
  },
  bottom: {
    flex: 1,
  },
});
