/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyle from '../utils/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import {useAppSelector} from '../app/hooks';
import {userState} from '../slice/AuthSlice';
import SuccessIcon from '../assets/svg/success.svg';

const KycScreen = ({navigation}: any) => {
  const userStateInfo = useAppSelector(userState);
  const getUserInfo = userStateInfo?.userData
    ? userStateInfo?.userData
    : userStateInfo;
  const [isKycVerified, setIsKycVerified] = useState(false);

  useEffect(() => {
    if (getUserInfo?.isKycVerified) {
      setIsKycVerified(true);
    }
  }, []);
  // const [type, setType] = useState(1)
  // const userStateInfo = useAppSelector(userState);
  // const [countryCode, setCountryCode] = useState('NG');
  // const [, setCountry] = useState(null);
  // const initialValues: PhoneNumberData = {
  //   phone: '',
  // };
  // const handleCredentialSubmit = (data: any) => {
  //   console.log('HandleSubmit');
  // };
  // const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
  //   useFormik({
  //     initialValues,
  //     validationSchema: PhoneSchema,
  //     onSubmit: (data: PhoneNumberData) => handleCredentialSubmit(data),
  //   });
  // const onSelect = (country: any) => {
  //   setCountryCode(country.cca2);
  //   setCountry(country);
  // };
  // const getUserInfo = userStateInfo?.userData
  //   ? userStateInfo?.userData
  //   : userStateInfo;

  // const [selectedKin, setSelectedKin] = useState("")
  // const [selectedVerifyType, setSelectedVerifyType] = useState("")

  // const sectionOne = () => {
  //     return (
  //         <View>
  //              <View style={styles.container}>
  //         {/* <View style={GlobalStyle.profileCircle2}>
  //           <Image source={{uri: getUserInfo?.image}} style={styles.icons} />
  //         </View>
  //         <View
  //           style={{
  //             backgroundColor: COLORS.primary2,
  //             padding: hp(10),
  //             borderRadius: 10,
  //           }}>
  //           <Text style={{...FONTS.body4, color: COLORS.primary}}>
  //             Upload a Selfie
  //           </Text>
  //         </View> */}
  //       </View>
  //       <View style={GlobalStyle.rowBetweenNoCenter}>
  //         <View style={styles.countryPicker}>
  //           <CountryPicker
  //             withCallingCode
  //             withFlag
  //             withFilter
  //             countryCode={countryCode}
  //             onSelect={onSelect}
  //             visible={false}
  //           />
  //         </View>
  //         <View style={{width: '89%',}}>
  //           <TextInput
  //           label={'Phone Number'}
  //           value={values.phone}
  //           onBlur={handleBlur('phone')}
  //           onChangeText={handleChange('phone')}
  //           errorMsg={touched.phone ? errors.phone : undefined}
  //         />
  //         </View>
  //     </View>

  //       {/* <View style={styles.form}>
  //         <SelectInput placeholder="Date of Birth" />
  //         <SelectInput placeholder="Nationality" />
  //         <TextInput label="State" />
  //         <TextInput label="Street Name" />
  //         <SelectInput placeholder="Gender" />
  //         <SelectInput placeholder="Marital Status" />
  //       </View> */}
  //         </View>
  //     )
  // }

  // const sectionTwo = () => {
  //     return (
  //         <View>

  //       <View style={styles.form}>
  //       <TextInput label="Name Next of Kin" />
  //         <SelectDropdowns
  //             label="Next of Kin Relationship"
  //             data={[
  //               {
  //                 id: 1,
  //                 name: "Father"
  //               },
  //               {
  //                 id: 2,
  //                 name: "Sibling"
  //               },
  //               {
  //                 id: 3,
  //                 name: "Friend"
  //               }
  //             ]}
  //             selected={selectedKin}
  //             setSelected={(value: any) => setSelectedKin(value)}
  //           />

  //         <TextInput label="Next of kin Address" />
  //         <SelectDropdowns
  //             label="Verification Type ID"
  //             data={[
  //               {
  //                 id: 1,
  //                 name: "Voter's Card"
  //               },
  //               {
  //                 id: 2,
  //                 name: "National ID Card"
  //               },
  //               {
  //                 id: 3,
  //                 name: "Passport"
  //               }
  //             ]}
  //             selected={selectedVerifyType}
  //             setSelected={(value: any) => setSelectedVerifyType(value)}
  //           />

  //         <TextInput label="Verification Number" />
  //         <UploadCard header="Upload scanned ID" />
  //       </View>
  //         </View>
  //     )
  // }
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
    console.log('kyc response', responseType, data);
    if (responseType === 'success') {
      setIsKycVerified(true);
    } else if (responseType === 'error') {
    } else if (responseType === 'close') {
    } else if (responseType === 'begin') {
    } else if (responseType === 'loading') {
    }
  };
  useEffect(() => {
    console.log('WIDGET IS CALLED');
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
    <View style={GlobalStyle.container}>
      <View style={styles.top}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            style={styles.icon}
            size={hp(20)}
            color={COLORS.gray2}
          />

          <Text style={{...FONTS.h2, fontWeight: '700'}}>KYC Verification</Text>
          <Text style={{...FONTS.body4, color: COLORS.gray, width: wp(250)}}>
            Complete your kyc process to increase your transaction limit
          </Text>

          <View style={[GlobalStyle.rowStart, {marginVertical: hp(15)}]}>
            {/* <View style={{width: type === 1 ? "50%" : "100%", borderBottomWidth: 1,paddingBottom: hp(10), borderBottomColor: COLORS.primary}}>
                <Text style={{...FONTS.body4}}>{type === 1 ? "1/2" : "2/2"}</Text>
            </View> */}
            <View
              style={{
                width: '50%',
                borderBottomWidth: 1,
                paddingBottom: hp(10),
                borderBottomColor: COLORS.primary,
              }}>
              <Text style={{...FONTS.body4}}>Level 2</Text>
            </View>
          </View>
          <View>
            {!isKycVerified ? (
              <View>
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
              </View>
            ) : (
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
          </View>
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
  form: {},
});
