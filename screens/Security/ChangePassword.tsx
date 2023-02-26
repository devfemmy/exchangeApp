/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants/theme';
import MainLayout from '../mainLayout';
import { hp } from '../../utils/helper';
import HeaderComponent from '../../components/HeaderComponent';
import GlobalStyle from '../../utils/globalStyle';
import { useFormik } from 'formik';
import { changePasswordData } from '../../utils/types';
import { changePasswordSchema } from '../../utils/schemas';
import { TextInput } from '../../components/TextInput';
import IconTextButton from '../../components/IconTextButton';

export default function ChangePassword({navigation}: any) {
  const initialValues: changePasswordData = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const handleCredentialSubmit = (data: any) => {

  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: changePasswordSchema,
      onSubmit: (data: changePasswordData) => handleCredentialSubmit(data),
    });
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
    },
  });
  return (
    <View style={[GlobalStyle.container]}>
      <MainLayout>
        <ScrollView>
          <HeaderComponent onPress={() => navigation.goBack()} />
          <Text style={{...FONTS.h2}}>Change Password</Text>
          <Text style={styles.textStyle}>Your new Password must be different from the previous password</Text>
          <View style={{marginVertical: 8}}>
              <TextInput
                  label={'Old Password'}
                  value={values.oldPassword}
                  onBlur={handleBlur('oldPassword')}
                  onChangeText={handleChange('oldPassword')}
                  errorMsg={touched.oldPassword ? errors.oldPassword : undefined}
                />
              <TextInput
                  label={'New Password'}
                  value={values.newPassword}
                  onBlur={handleBlur('newPassword')}
                  onChangeText={handleChange('newPassword')}
                  errorMsg={touched.newPassword ? errors.newPassword : undefined}
                />
              <TextInput
                  label={'Confirm Password'}
                  value={values.confirmNewPassword}
                  onBlur={handleBlur('confirmNewPassword')}
                  onChangeText={handleChange('confirmNewPassword')}
                  errorMsg={touched.confirmNewPassword ? errors.confirmNewPassword : undefined}
                />
          </View>
          <View style={styles.btnContainer}>
          <IconTextButton label="Save Changes" handlePress={handleSubmit}/>
        </View>
        </ScrollView>
      </MainLayout>
    </View>
  );
}
