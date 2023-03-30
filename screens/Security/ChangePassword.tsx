/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
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
import {changePassword} from '../../slice/AuthSlice';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import { useAppDispatch } from '../../app/hooks';

export default function ChangePassword({navigation}: any) {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const initialValues: changePasswordData = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const handleCredentialSubmit = async (data: changePasswordData) => {
    const payload = {
      currentPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    setLoader(true);
    try {
      var response = (await dispatch(changePassword(payload))) as any;
      if (changePassword.fulfilled.match(response)) {
        setLoader(false);
        let msg = response?.payload?.message as string;
        Notifier.showNotification({
          title: 'Success',
          description: msg,
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
                  isPassword
                  value={values.oldPassword}
                  onBlur={handleBlur('oldPassword')}
                  onChangeText={handleChange('oldPassword')}
                  errorMsg={touched.oldPassword ? errors.oldPassword : undefined}
                />
              <TextInput
                  isPassword
                  label={'New Password'}
                  value={values.newPassword}
                  onBlur={handleBlur('newPassword')}
                  onChangeText={handleChange('newPassword')}
                  errorMsg={touched.newPassword ? errors.newPassword : undefined}
                />
              <TextInput
                  isPassword
                  label={'Confirm Password'}
                  value={values.confirmNewPassword}
                  onBlur={handleBlur('confirmNewPassword')}
                  onChangeText={handleChange('confirmNewPassword')}
                  errorMsg={touched.confirmNewPassword ? errors.confirmNewPassword : undefined}
                />
          </View>
          <View style={styles.btnContainer}>
          <IconTextButton label="Save Changes" isLoading={loader} onPress={handleSubmit}/>
        </View>
        </ScrollView>
      </MainLayout>
    </View>
  );
}
