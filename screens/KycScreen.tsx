/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyle from '../utils/globalStyle';
// import CountryPicker from 'react-native-country-picker-modal';
import {COLORS, FONTS} from '../utils/constants/theme';
import {hp, wp} from '../utils/helper';
// import {useAppSelector} from '../app/hooks';
// import {userState} from '../slice/AuthSlice';
// import {SelectInput} from '../components/SelectInput';
// import {TextInput} from '../components/TextInput';
import Dojah from 'react-native-dojah';
// import UploadCard from '../components/UploadCard';
// import { PhoneNumberData } from '../utils/types';
// import { useFormik } from 'formik';
// import { PhoneSchema } from '../utils/schemas';
// import SelectDropdowns from '../components/SelectDropdowns';
import config from '../slice/config';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {getUserDetail, userState} from '../slice/AuthSlice';
import SuccessIcon from '../assets/svg/success.svg';
import HeaderComponent from '../components/HeaderComponent';
import { modeStatus } from '../slice/TradeSlice';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const KycScreen = ({navigation}: any) => {
  const userStateInfo = useAppSelector(userState);
  const dispatch = useAppDispatch()
  const modeInfo = useAppSelector(modeStatus);
  const getUserInfo = userStateInfo?.userData
    ? userStateInfo?.userData
    : userStateInfo;
  const [isKycVerified, setIsKycVerified] = useState(false);

  useEffect(() => {
    if (getUserInfo?.isKycVerified) {
      setIsKycVerified(true);
      dispatch(getUserDetail())
    }
  }, []);
 
  const appID = config.dojah_appId_key;

  /**
   *  This is your account public key
   *  (go to your dashboard at
   *  https://dojah.io/dashboard to
   *  retrieve it. You can also regenerate one)
   */
  const publicKey = config?.dojah_public_key;

  /**
   *  This is the widget type you'd like to load
   *  (go to your dashboard at
   *  https://dojah.io/dashboard to enable different
   *  widget types)
   */
  const type = 'custom';

  /**
   *  These are the configuration options
   *  available to you are:
   *  {debug: BOOL, pages: ARRAY[{page: STRING, config: OBJECT}]}
   *
   *  The config object is as defined below
   *
   *  NOTE: The otp and selfie options are only
   *  available to the `verification` widget
   */
  const configs = {
    debug: true,
    pages: [
      {page: 'countries'},
      {page: 'user-data'},
      {page: 'selfie'},
      {
        page: 'id',
        config: {
          bvn: true,
          passport: true,
          nin: true,
          dl: true,
          custom: true,
          mobile: false,
          otp: false,
          selfie: false,
        },
      },
      {page: 'address'},
    ],
  };

  /**
   *  These are the user's data to verify, options
   *  available to you possible options are:
   *  {first_name: STRING, last_name: STRING, dob: DATE STRING}
   *
   *  NOTE: Passing all the values will automatically skip
   *  the user-data page (thus the commented out `last_name`)
   */
  const userData = {
    first_name: getUserInfo?.firstName,
    last_name: getUserInfo?.lastName, // 'Nna'
    dob: getUserInfo?.dateOfBirth,
  };

  /**
   *  These are the metadata options
   *  You can pass any values within the object
   */
  const metadata = {
    user_id: getUserInfo?.id,
  };

  /**
   * @param {String} responseType
   * This method receives the type
   * The type can only be one of:
   * loading, begin, success, error, close
   * @param {String} data
   * This is the data from doja
   */
  const response = (responseType: any, data: any) => {
    if (responseType === 'success') {
      setIsKycVerified(true);
      dispatch(getUserDetail())
    } else if (responseType === 'error') {
    } else if (responseType === 'close') {
    } else if (responseType === 'begin') {
    } else if (responseType === 'loading') {
    }
  };
  useEffect(() => {
    Dojah.hydrate(appID, publicKey);
  }, [appID, publicKey]);

  /**
   *  The `ViewStyle` of the outermost `View` wrapping the Dojah container
   *  defaults to {width: '100%', height: '100%'}
   */
  const outerContainerStyle = {width: '100%', height: '100%'};

  /**
   *  The `ViewStyle` of the `WebView` containing the Dojah connection
   *  This prop is passed to the WebView `style` prop
   */
  const style = {};

  /**
   *  The `ViewStyle` of the innermost `View` within the WebView
   *  This prop is passed to the WebView `containerStyle` prop
   */
  const innerContainerStyle = {};



  return (
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
      <View style={styles.top}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderComponent onPress={() => navigation.goBack()} />
        {!isKycVerified ? (
          <View>
          {/* <Text style={{...FONTS.h2, fontWeight: '700',color: modeInfo ? COLORS.darkMode : COLORS.white}}>KYC Verification</Text>
          <Text style={{...FONTS.body4, color: COLORS.gray, width: wp(250)}}>
            Complete your kyc process to increase your transaction limit
          </Text> */}

          <View style={[GlobalStyle.rowStart, {marginVertical: hp(15)}]}>
            <View
              style={{
                width: '50%',
                borderBottomWidth: 1,
                paddingBottom: hp(10),
                borderBottomColor: COLORS.primary,
              }}>
              <Text style={{...FONTS.body4,color: modeInfo ? COLORS.darkMode : COLORS.white}}>Level 2</Text>
            </View>
          </View>

              <ScrollView style={styles.dojahContainer} showsVerticalScrollIndicator={false}>
                <Dojah
                  response={response}
                  appID={appID}
                  publicKey={publicKey}
                  config={configs}
                  type={type}
                  userData={userData}
                  metadata={metadata}
                  outerContainerStyle={outerContainerStyle}
                  style={style}
                  innerContainerStyle={innerContainerStyle}
                />

                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.gray,
                    marginTop: hp(10),
                  }}>
                  On this level, you will provided the neccessary documents as
                  stated below to complete this process.
                </Text>

                <View style={{marginTop: hp(20)}}>
                  <View style={styles.div2}>
                    <Text
                      style={{
                        fontSize: hp(40),
                        marginRight: hp(5),
                        marginTop: hp(-5),
                      }}>
                      {'\u2022'}
                    </Text>
                    <Text style={{...FONTS.body3}}> Bio Data</Text>
                  </View>
                  <View style={styles.div2}>
                    <Text
                      style={{
                        fontSize: hp(40),
                        marginRight: hp(5),
                        marginTop: hp(-5),
                      }}>
                      {'\u2022'}
                    </Text>
                    <Text style={{...FONTS.body3}}> Government Data</Text>
                  </View>
                  <View style={styles.div2}>
                    <Text
                      style={{
                        fontSize: hp(40),
                        marginRight: hp(5),
                        marginTop: hp(-5),
                      }}>
                      {'\u2022'}
                    </Text>
                    <Text style={{...FONTS.body3}}>
                      {' '}
                      ID / Document Verification
                    </Text>
                  </View>
                  <View style={styles.div2}>
                    <Text
                      style={{
                        fontSize: hp(40),
                        marginRight: hp(5),
                        marginTop: hp(-5),
                      }}>
                      {'\u2022'}
                    </Text>
                    <Text style={{...FONTS.body3}}> Valid Address</Text>
                  </View>
                </View>
              </ScrollView>
              </View>
            ) 
            : (
              <View>
                <View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: hp(-70),
                    }}>
                    <SuccessIcon />
                  </View>
                  <Text
                    style={{
                      ...FONTS.h2,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      color: COLORS.successGreen,
                      marginVertical: hp(30),
                    }}>
                    KYC COMPLETED
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body4,
                      textAlign: 'center',
                      marginTop: hp(-20),
                    }}>
                    Your account has been successfully verified
                  </Text>
                </View>
              </View>
            )}
        </ScrollView>
      </View>
      <View></View>

      <View style={styles.bottom}></View>
    </View>
  );
};

export default KycScreen;

const styles = StyleSheet.create({
  div: {
    paddingVertical: hp(70),
  },
  div2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginVertical: hp(20),
  },
  top2: {
    marginTop: hp(20),
  },
  contain: {
    paddingHorizontal: wp(10),
    flex: 1,
    backgroundColor: 'white',
  },
  countryPicker: {
    // backgroundColor: 'red',
    height: hp(70),
    justifyContent: 'center',
  },
  txt: {
    marginTop: hp(35),
  },
  txt2: {
    marginTop: hp(10),
    marginBottom: hp(24),
  },
  btnContainer: {
    marginVertical: hp(15),
    width: '100%',
  },
  span: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp(20),
  },
  fg: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  top: {
    flex: 5,
  },
  bottom: {
    flex: 1,
    marginTop: hp(20),
  },
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    marginVertical: hp(20),
    alignItems: 'center',
  },
  icons: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  dojahContainer: {
    flex: 1
  },
  form: {},
});
