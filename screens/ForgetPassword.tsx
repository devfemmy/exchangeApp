/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import { ForgetPasswordFormData } from '../utils/types';
import { useFormik } from 'formik';
import { ForgetPasswordSchema } from '../utils/schemas';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextInput } from '../components/TextInput';
import IconTextButton from '../components/IconTextButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { hp, wp } from '../utils/helper';
import { COLORS, FONTS } from '../utils/constants/theme';
import HeaderComponent from '../components/HeaderComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ForgetPassword = ({navigation}: any) => {
  const initialValues: ForgetPasswordFormData = {
    emailAddress: '',
  };

  const handleCredentialSubmit = (data: any) => {

  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: ForgetPasswordSchema,
      onSubmit: (data: ForgetPasswordFormData) => handleCredentialSubmit(data),
    });

  return (
    <KeyboardAwareScrollView style={[GlobalStyle.container, styles.div]}>
        <View style={styles.top}>
        {/* <AntDesign onPress={() => navigation.goBack()} name="arrowleft" style={styles.icon} size={hp(20)} color={COLORS.gray2} />
         */}
          <HeaderComponent onPress={() => navigation.goBack()} />

        <Text style={{...FONTS.h2}}>Forget Password</Text>

        <Text style={[GlobalStyle.subTitle, {marginBottom: hp(5)}]}>Please Enter the email address you used in creating this account</Text>

       <View style={styles.top2}>
       <TextInput
          label={'Email'}
          value={values.emailAddress}
          onBlur={handleBlur('emailAddress')}
          onChangeText={handleChange('emailAddress')}
          errorMsg={touched.emailAddress ? errors.emailAddress : undefined}
        />
       </View>

        <View style={styles.btnContainer}>
          <IconTextButton label="Send Recovery Link" onPress={handleSubmit}/>
        </View>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
          <View style={styles.span}>
          <Text>
          <Text style={{...FONTS.body4, textAlign: 'center', color: '#808080'}}>
            Don’t have an account? 
          </Text>
          <Text style={{...FONTS.body4,color: COLORS.primary, marginLeft: hp(3)}}>
 Create Account
          </Text>
          </Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgetPassword;


const styles = StyleSheet.create({
  div: {
    paddingVertical: hp(70),

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
    flex: 2,
    justifyContent: 'flex-end',
  },
});
