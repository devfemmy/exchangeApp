import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FONTS } from '../../utils/constants/theme';
import CountryPicker from 'react-native-country-picker-modal';
import MainLayout from '../mainLayout';
import { hp } from '../../utils/helper';
import HeaderComponent from '../../components/HeaderComponent';
import GlobalStyle from '../../utils/globalStyle';
import { TextInput } from '../../components/TextInput';
import { PhoneNumberData } from '../../utils/types';
import { useFormik } from 'formik';
import { PhoneSchema } from '../../utils/schemas';
import IconTextButton from '../../components/IconTextButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { VerifyPhonenumber } from '../../slice/AuthSlice';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { modeStatus } from '../../slice/TradeSlice';

export default function VerifyPhone({navigation}: any) {
  const [countryCode, setCountryCode] = useState('NG');
  const [, setCountry] = useState(null);
  const dispatch = useAppDispatch()
  const [loader, setLoader] = useState(false)
  const initialValues: PhoneNumberData = {
    phone: '',
  };
  const modeInfo = useAppSelector(modeStatus);

  const handleCredentialSubmit = async (data: any) => {
    const payload = {
      phoneNumber: data?.phone
    }
    setLoader(true)
    try {
      var response = await dispatch(VerifyPhonenumber(payload))
      if(VerifyPhonenumber.fulfilled.match(response)){
          setLoader(false)
          navigation.navigate('VerifyPhonePin', {
            params: {
              phone: data?.phone
            }
          });
      }
      else {
        var errMsg = response?.payload as string
        setLoader(false)
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
    catch(e){
      setLoader(false)
    }
    
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: PhoneSchema,
      onSubmit: (data: PhoneNumberData) => handleCredentialSubmit(data),
    });
  const styles = StyleSheet.create({
    textStyle: {
      color: '#808080',
      marginVertical: hp(15),
      fontSize: hp(14),
    },
    btnContainer: {
      marginVertical: hp(15),
      width: '100%',
    },
    countryPicker: {
      // backgroundColor: 'red',
      height: hp(70),
      justifyContent: 'center',
    }
  });
  const onSelect = (country: any) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };
  return (
    <View style={[GlobalStyle.container,{backgroundColor: modeInfo ? "white" : "#1a202c"}]}>
      <MainLayout>
        <ScrollView>
          <HeaderComponent onPress={() => navigation.goBack()} />
          <Text style={{...FONTS.h2}}>What’s your Phone Number</Text>
          <Text style={styles.textStyle}>Kindly Provide your phone number</Text>
          <View style={GlobalStyle.rowBetweenNoCenter}>
            <View style={styles.countryPicker}>
              <CountryPicker
                withCallingCode
                withFlag
                withFilter
                countryCode={countryCode}
                onSelect={onSelect}
                visible={false}
              />
            </View>
            <View style={{width: '89%',}}>
              <TextInput
              label={'Phone Number'}
              value={values.phone}
              onBlur={handleBlur('phone')}
              onChangeText={handleChange('phone')}
              errorMsg={touched.phone ? errors.phone : undefined}
            />
            </View>
        </View>
        <View style={styles.btnContainer}>
          <IconTextButton label="Verify Phone Number" isLoading={loader} onPress={handleSubmit}/>
        </View>
        </ScrollView>
      </MainLayout>
    </View>
  );
}
