/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import GlobalStyle from '../utils/globalStyle';
import {CreateAccountFormDataUi} from '../utils/types';
import {useFormik} from 'formik';
import {CreateAccountSchema} from '../utils/schemas';
import {COLORS, FONTS} from '../utils/constants/theme';
import {TextInput} from '../components/TextInput';
import IconTextButton from '../components/IconTextButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {hp, wp} from '../utils/helper';
import {useAppDispatch} from '../app/hooks';
import {createUser, verifyEmailSend} from '../slice/AuthSlice';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CreateAccount = ({navigation}: any) => {
  const [cookieSelected, setCookieSelected] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const initialValues: CreateAccountFormDataUi = {
    email: '',
  };

  const continueSubmit = async (data: any) => {
    const payload = {
      email: data?.email,
    };
    setLoader(true);
    try {
      var response = await dispatch(createUser(payload));
      if (createUser.fulfilled.match(response)) {
        setLoader(false);
        dispatch(verifyEmailSend(data?.email)).then(() => {
          return navigation.navigate('EmailVerification', {
            params: {
              emailAddress: data?.email,
              newAccount: true,
            },
          });
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
    } catch (e) {
      console.log({e});
    }
  };

  const {values, errors, touched, handleChange, handleSubmit, handleBlur} =
    useFormik({
      initialValues,
      validationSchema: CreateAccountSchema,
      onSubmit: (data: CreateAccountFormDataUi) => continueSubmit(data),
      enableReinitialize: true,
    });

  return (
    <View style={[GlobalStyle.container, styles.div]}>
      <View style={styles.top}>
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          style={styles.icon}
          size={hp(20)}
          color={COLORS.gray2}
        />
        <Text style={{...FONTS.h2}}>Welcome Zend Wallet</Text>
        <Text style={{...FONTS.h3, marginVertical: hp(15)}}>
          Create Account
        </Text>
        <Text
          style={{...FONTS.body5, color: COLORS.gray, marginBottom: hp(15)}}>
          Your account creation will be fast and swift. Kindly provide your
          email address
        </Text>

        <TextInput
          label={'Email'}
          value={values.email}
          onBlur={handleBlur('email')}
          onChangeText={handleChange('email')}
          errorMsg={touched.email ? errors.email : undefined}
        />

        <View style={[styles.row, {marginVertical: hp(15)}]}>
          {cookieSelected ? (
            <TouchableOpacity onPress={() => setCookieSelected(false)}>
              <View style={styles.coloredBox}></View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setCookieSelected(true)}>
              <View style={styles.box}></View>
            </TouchableOpacity>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: hp(10),
            }}>
            <Text>
              <Text style={{...FONTS.body4, color: COLORS.lightGray3}}>I Certify that i am</Text>
              <Text style={{...FONTS.body4, color: COLORS.primary}}>
                18 years{' '}
              </Text>
              <Text style={{...FONTS.body4, color: COLORS.lightGray3}}>of age or older </Text>
            </Text>
          </View>
        </View>

        <View style={[styles.row, {marginVertical: hp(2)}]}>
          {cookieSelected ? (
            <TouchableOpacity onPress={() => setCookieSelected(false)}>
              <View style={styles.coloredBox}></View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setCookieSelected(true)}>
              <View style={styles.box}></View>
            </TouchableOpacity>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: hp(10),
              width: wp(400),
            }}>
            <Text>
              <Text style={{...FONTS.body4, color: COLORS.lightGray3}}>I agree to privacy policy </Text>
              <Text style={{...FONTS.body4, color: COLORS.primary}}>
                cookies policy {'\n'} and terms and conditions.
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.btnContainer}>
          <IconTextButton
            label="Create Account"
            onPress={handleSubmit}
            isLoading={loader}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View style={[styles.span]}>
            <Text style={{...FONTS.body5}}>Already have an account ?</Text>
            <Text style={{...FONTS.body5, marginLeft: 5}}>Log in</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  div: {
    paddingVertical: hp(70),
  },
  icon: {
    marginVertical: hp(20),
  },
  contain: {
    paddingHorizontal: wp(10),
    backgroundColor: 'white',
    flex: 1,
  },
  txt: {
    marginTop: hp(5),
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
  rangeDiv: {
    marginBottom: hp(20),
  },
  coloredBox: {
    width: wp(20),
    height: hp(20),
    backgroundColor: 'blue',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  box: {
    width: wp(20),
    height: hp(20),
    backgroundColor: '#E2E6FD',
  },
  rowBtw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(25),
    paddingBottom: hp(10),
  },
  top: {
    flex: 5,
    marginTop: hp(20),
  },
  bottom: {},
});
