/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable semi */
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/globalStyle'
import { hp, wp } from '../utils/helper';
import { ResetPasswordData } from '../utils/types';
import { resetPasswordSchema } from '../utils/schemas';
import { useFormik } from 'formik';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextInput } from '../components/TextInput';
import IconTextButton from '../components/IconTextButton';
import { COLORS, FONTS } from '../utils/constants/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../components/HeaderComponent';

const ResetPassword = ({navigation}: any) => {
  const initialValues: ResetPasswordData = {
    newPassword: '',
    confirmNewPassword: ''
};

const handleCredentialSubmit = (data: any) => {

}


const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
        initialValues,
        validationSchema: resetPasswordSchema,
        onSubmit: (data: ResetPasswordData) => handleCredentialSubmit(data),
    });
  return (
    <View style={GlobalStyle.container}>
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
       <ScrollView>
                <View style={styles.top}>
                <HeaderComponent onPress={() => navigation.goBack()} />
                    {/* <AntDesign onPress={() => navigation.goBack()} name="arrowleft" style={styles.icon} size={hp(20)} color={COLORS.gray2} /> */}

                    <Text style={{...FONTS.h2}}>Reset Password</Text>

                    <Text style={{...FONTS.body5, color: COLORS.gray}}>Your new Password must be different from the previous password</Text>
                    <View style={styles.top2}>
                    <TextInput
                        label={'Enter New Password'}
                        isPassword
                        value={values.newPassword}
                        onBlur={handleBlur('newPassword')}
                        onChangeText={handleChange('newPassword')}
                        errorMsg={touched.newPassword ? errors.newPassword : undefined}
                    />

                    <TextInput
                        label={'Confirm New Password'}
                        isPassword
                        value={values.confirmNewPassword}
                        onBlur={handleBlur('confirmNewPassword')}
                        onChangeText={handleChange('confirmNewPassword')}
                        errorMsg={touched.confirmNewPassword ? errors.confirmNewPassword : undefined}
                    />
                    </View>

                    <View style={styles.btnContainer}>
                        <IconTextButton label='Reset Password' handlePress={handleSubmit} />
                    </View>

                    <View style={styles.bg}>
                        <View style={styles.rowStart}>
                            <View style={styles.circle}>
                            </View>
                            <Text>At least 8 characters</Text>
                        </View>
                        <View style={styles.rowStart}>
                            <View style={styles.circle}>
                            </View>
                            <Text>At least one uppercase letter</Text>
                        </View>
                        <View style={styles.rowStart}>
                            <View style={styles.circle}>
                            </View>
                            <Text>At least onelowercase letter</Text>
                        </View>
                        <View style={styles.rowStart}>
                            <View style={styles.circle}>
                            </View>
                            <Text>At least one number</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            </KeyboardAwareScrollView>
    </View>
  )
}

export default ResetPassword


const styles = StyleSheet.create({
  icon: {
      marginVertical: hp(20)
  },
  contain: {
      paddingHorizontal: wp(10),
      flex: 1,
      backgroundColor: 'white'
  },
  top2: {
    marginTop: hp(20)
  },
  txt: {
      marginTop: hp(35)
  },
  txt2: {
      marginTop: hp(10),
      marginBottom: hp(24)
  },
  btnContainer: {
      marginVertical: hp(15),
      width: '100%'
  },
  span: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: hp(20)
  },
  fg: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
  },
  top: {
      flex: 5
  },
  bottom: {
      flex: 2,
      justifyContent: 'flex-end'
  },
  rowStart: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: hp(10)
  },
  circle: {
      width: wp(20),
      height: hp(20),
      borderRadius: 50,
      backgroundColor: '#E2E6FD',
      marginRight: hp(5)
  },
  tt: {
      marginLeft: hp(10)
  },
  bg: {
      marginTop: hp(20)
  }
})