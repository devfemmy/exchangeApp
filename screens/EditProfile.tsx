/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import GlobalStyle from '../utils/globalStyle'
import { ForgetPasswordFormData, ProfileFormData } from '../utils/types';
import CountryPicker from 'react-native-country-picker-modal';
import { useFormik } from 'formik';
import { ForgetPasswordSchema, ProfileAccountSchema } from '../utils/schemas';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextInput } from '../components/TextInput';
import IconTextButton from '../components/IconTextButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { hp, wp } from '../utils/helper';
import { COLORS, FONTS } from '../utils/constants/theme';
import { Image } from 'react-native';
import { useAppSelector } from '../app/hooks';
import { userState } from '../slice/AuthSlice';

const EditProfile = ({navigation}: any) => {
  const userStateInfo = useAppSelector(userState);
  const [countryCode, setCountryCode] = useState('NG');
  const [, setCountry] = useState(null);

  const getUserInfo = userStateInfo?.userData ? userStateInfo?.userData : userStateInfo


  const initialValues: ProfileFormData = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    country: '',
    streetName: '',
    gender: '',
    phone: '',
    dob: '',
  };

  const handleCredentialSubmit = (data: any) => {

  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: ProfileAccountSchema,
      onSubmit: (data: ProfileFormData) => handleCredentialSubmit(data),
    });

    const onSelect = (country: any) => {
      setCountryCode(country.cca2);
      setCountry(country);
    };

  return (
    <View style={[GlobalStyle.container, styles.div]}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.top}>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" style={styles.icon} size={hp(20)} color={COLORS.gray2} />

        <Text style={{...FONTS.h2, fontWeight: '700'}}>Edit Profile</Text>

        <View style={styles.container}>
          {/* <View style={GlobalStyle.level}>
            <Text style={{...FONTS.h4, color: '#4F4F4F', fontWeight: '500'}}>Beginner</Text>
          </View> */}
          <View style={GlobalStyle.profileCircle2}>
            <Image source={{uri: getUserInfo?.image}} style={styles.icons} />
          </View>
          <View>
            <Text style={{...FONTS.h3, fontSize: hp(18), fontWeight: '600', color: COLORS.primary, textAlign: 'center'}}>Olatunji Monsurat</Text>
            <Text style={{...FONTS.h4, fontSize: hp(16), fontWeight: '400', color: '#808080', textAlign: 'center'}}>@Techbabby</Text>
          </View>
        </View>

       <View style={styles.top2}>
          <TextInput
              label={'First Name'}
              value={values.firstName}
              onBlur={handleBlur('firstName')}
              onChangeText={handleChange('firstName')}
              errorMsg={touched.firstName ? errors.firstName : undefined}
            />
          <TextInput
              label={'Last Name'}
              value={values.lastName}
              onBlur={handleBlur('lastName')}
              onChangeText={handleChange('lastName')}
              errorMsg={touched.lastName ? errors.lastName : undefined}
            />
          <TextInput
              label={'Email'}
              value={values.email}
              onBlur={handleBlur('emailAddress')}
              onChangeText={handleChange('emailAddress')}
              errorMsg={touched.email ? errors.email : undefined}
            />
            <TextInput
              label={'Username'}
              value={values.username}
              onBlur={handleBlur('username')}
              onChangeText={handleChange('username')}
              errorMsg={touched.username ? errors.username : undefined}
            />
            <TextInput
              label={'House Address'}
              value={values.streetName}
              onBlur={handleBlur('streetName')}
              onChangeText={handleChange('streetName')}
              errorMsg={touched.streetName ? errors.streetName : undefined}
            />
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
       </View>

        <View style={styles.btnContainer}>
          <IconTextButton label="Save Changes" handlePress={handleSubmit}/>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;


const styles = StyleSheet.create({
  div: {
    paddingVertical: hp(70),

  },
  icons: {
    width: "100%", 
    height: "100%",
    borderRadius: 50
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
    flex: 2,
    justifyContent: 'flex-end',
  },
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    marginVertical: hp(20),
    alignItems: 'center',
  },
});
