/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable keyword-spacing */
/* eslint-disable quotes */
/* eslint-disable semi */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import GlobalStyle from '../utils/globalStyle';
import {hp, wp} from '../utils/helper';
import {COLORS, FONTS} from '../utils/constants/theme';
import {TextInput} from '../components/TextInput';
import {LoginFormData} from '../utils/types';
import {LoginSchema} from '../utils/schemas';
import {useFormik} from 'formik';
import IconTextButton from '../components/IconTextButton';
import {useAppDispatch} from '../app/hooks';
import {signInUser} from '../slice/AuthSlice';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);

  const initialValues: LoginFormData = {
    emailAddress: '',
    password: '',
  };

  const handleCredentialSubmit = async (data: any) => {
    setLoader(true);
    try {
      var response = (await dispatch(signInUser(data))) as any;
      if (signInUser.fulfilled.match(response)) {
        setLoader(false);
        if (response?.payload?.data?.requiresConfirmation) {
          return navigation?.navigate('RequireConfirmation', {
            params: {
              emailAddress: data?.emailAddress,
              newAccount: true,
            },
          });
        }
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

  const {values, errors, touched, handleChange, handleSubmit, handleBlur} =
    useFormik({
      initialValues,
      validationSchema: LoginSchema,
      onSubmit: (data: LoginFormData) => handleCredentialSubmit(data),
    });

  return (
    <KeyboardAwareScrollView style={[GlobalStyle.container, styles.div]}>
      <View>
        {/* <HeaderComponent onPress={() => navigation.goBack()} /> */}
        <View style={styles.margin} />
        <Text style={{...FONTS.h2, fontWeight: '700'}}>Log in</Text>
        <Text style={[GlobalStyle.subTitle, {marginBottom: hp(5)}]}>
          Let’s get you started right away
        </Text>
        <ScrollView>
          <View style={styles.top}>
            <TextInput
              label={'Email'}
              value={values.emailAddress}
              onBlur={handleBlur('emailAddress')}
              onChangeText={handleChange('emailAddress')}
              errorMsg={touched.emailAddress ? errors.emailAddress : undefined}
            />

            <TextInput
              label={'Password'}
              isPassword
              value={values.password}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              errorMsg={touched.password ? errors.password : undefined}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPassword')}>
              <Text
                style={{
                  ...FONTS.body4,
                  textAlign: 'right',
                  marginBottom: hp(15),
                  color: COLORS.primary,
                }}>
                Forget Password ?
              </Text>
            </TouchableOpacity>
            <IconTextButton
              label="Login"
              onPress={handleSubmit}
              isLoading={loader}
            />
          </View>
        </ScrollView>

        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
          <View style={styles.bottom}>
            <Text>
              <Text
                style={{
                  ...FONTS.body4,
                   textAlign: 'center',
                  marginRight: hp(5),
                  color: '#808080',
                }}>
                Don’t have an account?   
              </Text>
              <Text> </Text>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.primary,
                  marginLeft: hp(3),
                }}>
                 Create Account
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  div: {
    paddingVertical: hp(70),
  },
  icon: {
    marginVertical: hp(20),
  },
  img: {
    width: wp(40),
  },
  top: {
    flex: 5,
    marginTop: hp(20),
  },
  margin: {
    marginVertical: 20,
  },
  bottom: {
    marginVertical: 10,
  },
});
