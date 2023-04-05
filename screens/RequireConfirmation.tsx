/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Notifier, NotifierComponents} from 'react-native-notifier';

import {hp, wp} from '../utils/helper';
import {COLORS, FONTS} from '../utils/constants/theme';
import IconTextButton from '../components/IconTextButton';
import GlobalStyle from '../utils/globalStyle';
import {generateSigninToken, verifySignin} from '../slice/AuthSlice';
import {useAppDispatch} from '../app/hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';


const RequireConfirmation = (props: any) => {
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
        var response = (await dispatch(verifySignin(data))) as any;
        if (verifySignin.fulfilled.match(response)) {
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

  const resendCode = async () => {
    setLoader(true);
    const data = {
      email: emailAddress,
    };
    try {
        var response = (await dispatch(generateSigninToken(data))) as any;
        if (generateSigninToken.fulfilled.match(response)) {
            setLoader(false);
            Notifier.showNotification({
                title: 'Success',
                description: "New token sent to your mail",
                Component: NotifierComponents.Alert,
                componentProps: {
                  alertType: 'success',
                },
              });

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

      <Text style={{...FONTS.h2, fontWeight: '600'}}>Verify New Device</Text>

      <Text
        style={{
          ...FONTS.body5,
          color: COLORS.gray,
        }}>
            <Text>Enter the OTP code sent to your email </Text>
            <Text style={{color: COLORS.primary}}>{`${emailAddress?.substr(0,9)}***`}</Text>
        </Text>

      {/* <View style={styles.otp}>
          <OTPTextView
              tintColor={COLORS.primary}
              textInputStyle={styles.textInputContainer}
              handleTextChange={(text: string) => setCode(text)}
              inputCount={6}
              keyboardType="default"
              returnKeyType="done"
            />
      </View> */}
                <View style={{alignItems: 'center', marginVertical: 25, marginBottom: 5}}>
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
                cellSize={50}
                cellSpacing={8}
                cellStyleFocused={{
                  borderColor: COLORS.primary,
                  borderBottomWidth: 4,
                }}
                value={code}
                onTextChange={(value: string) => setCode(value)}
              />

          </View>
      <View style={styles.bottom}>
       <TouchableOpacity onPress={() => resendCode()}>
         <Text style={{textAlign: 'center', color: COLORS.primary, marginVertical: hp(10)}}>Resend Code</Text>
       </TouchableOpacity>
        <IconTextButton
          label="Verify"
          isLoading={loader}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default RequireConfirmation;

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
    // flex: 3,
  },
  bottom: {
    flex: 1,
    marginTop: hp(20),
  },
  textInputContainer: {
    backgroundColor: COLORS.primary2,
    borderRadius: 5,
    color: COLORS.primary,
    borderWidth: 0,
    width: hp(43),
    height: hp(43),
    paddingHorizontal: hp(2),
    fontSize: hp(14),
  },
});
