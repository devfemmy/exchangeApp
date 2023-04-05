/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants/theme';
import MainLayout from '../mainLayout';
import { hp } from '../../utils/helper';
import HeaderComponent from '../../components/HeaderComponent';
import GlobalStyle from '../../utils/globalStyle';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { TextInput } from '../../components/TextInput';
import IconTextButton from '../../components/IconTextButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changePin, updatePin, userState } from '../../slice/AuthSlice';
import { Notifier, NotifierComponents } from 'react-native-notifier';

export default function ChangeTransactionPin({navigation}: any) {
  const [password, setPassword] = useState<any>();
  const [loader, setLoader] = useState(false);
  const [pin, setPin] = useState<any>();
  const dispatch = useAppDispatch();
  const userStateInfo = useAppSelector(userState);
  const getUserInfo = userStateInfo?.userData ? userStateInfo?.userData : userStateInfo;



  const handleSubmit = async () => {
    if (password?.length <= 0 || password === undefined) {
      return  Notifier.showNotification({
        title: 'Error',
        description: 'Password is required',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });
    }
    if (pin?.length <= 0 || pin === undefined) {
      return  Notifier.showNotification({
        title: 'Error',
        description: 'Pin is required',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });
    }
    setLoader(true);
    const payload = {
      pin,
      password,
    };
    try {
      if (getUserInfo?.hasSetPin) {
        const response = await dispatch(updatePin(payload));
        if (updatePin.fulfilled.match(response)){
          setLoader(false);
          return navigation.navigate("SuccessScreen",{
            params: {
              header: "Transaction Pin successfully changed",
              text: "You have successfully changed your transaction pin"
            }
          })
        }
        else {
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
        const response = await dispatch(changePin(payload));
        if (changePin.fulfilled.match(response)){
          setLoader(false);
          return navigation.navigate("SuccessScreen",{
            params: {
              header: "Transaction pin successfully changed",
              text: "You have successfully changed your transaction pin"
            }
          })
        }
        else {
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

    }
    catch (e){
      console.log({e});
      setLoader(false);
    }
  };



  const styles = StyleSheet.create({
    textStyle: {
      marginVertical: hp(15),
      color: '#4F4F4F',
      lineHeight: 20,
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
          <Text style={{...FONTS.h2}}>Reset Transaction Pin</Text>
          <Text style={styles.textStyle}>Protect all delecate informations on this application to prevents intruder</Text>
          <TextInput
              label="Enter login password"
              isPassword
              value={password}
              onChangeText={(value) => setPassword(value)}
              errorMsg={undefined}
          />
          {/* <View style={{marginVertical: 8, paddingVertical: 20}}>
            <OTPTextView
              tintColor={COLORS.primary}
              textInputStyle={styles.textInputContainer}
              handleTextChange={(text: string) => setPin(text)}
              inputCount={4}
              keyboardType="numeric"
            />
          </View> */}
             <Text style={{...FONTS.h3, fontWeight: '600'}}>Enter Pin</Text>
          <View style={{alignItems: 'center', marginVertical: 25}}>
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
                value={pin}
                onTextChange={(value: string) => setPin(value)}
              />

          </View>
          <View>
            <IconTextButton label="Submit" isLoading={loader} onPress={handleSubmit} />
          </View>
        </ScrollView>
      </MainLayout>
    </View>
  );
}
