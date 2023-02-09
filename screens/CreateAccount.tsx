/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/globalStyle'
import { CreateAccountFormDataUi } from '../utils/types';
import { useFormik } from 'formik';
import { CreateAccountSchema } from '../utils/schemas';
import { FONTS } from '../utils/constants/theme';
import { TextInput } from '../components/TextInput';
import IconTextButton from '../components/IconTextButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { hp, wp } from '../utils/helper';

const CreateAccount = ({navigation}: any) => {

  const initialValues: CreateAccountFormDataUi = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    // gender: '',
    password: '',
    confirmPassword: ''
  };

  const continueSubmit = (data: any) => {

  }

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: CreateAccountSchema,
      onSubmit: (data: CreateAccountFormDataUi) => continueSubmit(data),
      enableReinitialize: true
    });



  return (
    <View style={GlobalStyle.container}>
         <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.rowBtw}>
            <Text style={{...FONTS.h2}} >Create Account</Text>
            <View />
          </View>
  
          <Text style={{...FONTS.body5}} >kindly provide the information we need.</Text>
          <TextInput
            label={'Email'}
            value={values.email}
            onBlur={handleBlur('email')}
            onChangeText={handleChange('email')}
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
            label={'Password'}
            isPassword
            value={values.password}
            onBlur={handleBlur('password')}
            onChangeText={handleChange('password')}
            errorMsg={touched.password ? errors.password : undefined}
          />

          <TextInput
            label={'Confirm Password'}
            isPassword
            value={values.confirmPassword}
            onBlur={handleBlur('confirmPassword')}
            onChangeText={handleChange('confirmPassword')}
            errorMsg={touched.confirmPassword ? errors.confirmPassword : undefined}
          />


          {/* <View style={[styles.row, { marginVertical: hp(2) }]}>
            {
              cookieSelected ? <Pressable onPress={() => setCookieSelected(false)}><View style={styles.coloredBox}></View></Pressable> : <Pressable onPress={() => setCookieSelected(true)}><View style={styles.box}></View></Pressable>
            }

            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: hp(10) }}>
              <TextField text='I agree to privacy policy' fontSize={hp(12)} fontWeight='400' lineHeight={hp(18)} />
              <TextField text=' cookies policy ' color='#485FE6' fontWeight='bold' fontSize={hp(12)} lineHeight={hp(18)} />
              <TextField text='and ' fontSize={hp(12)} fontWeight='400' lineHeight={hp(18)} />
              <TextField text='terms and conditions.' color='#485FE6' fontWeight='bold' fontSize={hp(12)} lineHeight={hp(18)} />
            </View>
          </View> */}

          <View style={styles.btnContainer}>
            <IconTextButton label="Create Account" onPress={handleSubmit} />
          </View>

        </View>


        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View style={styles.span}>
            <Text style={{...FONTS.body5}}>Already have an account ?</Text>
            <Text style={{...FONTS.body5, marginLeft: 5}}>Log in</Text>

          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}

export default CreateAccount

const styles = StyleSheet.create({
  icon: {
    // marginTop: hp(20)
  },
  contain: {
    paddingHorizontal: wp(10),
    backgroundColor: 'white',
    flex:1
  },
  txt: {
    marginTop: hp(5)
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
  rangeDiv: {
    marginBottom: hp(20)
  },
  coloredBox: {
    width: wp(20),
    height: hp(20),
    backgroundColor: 'blue'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  box: {
    width: wp(20),
    height: hp(20),
    backgroundColor: '#E2E6FD'
  },
  rowBtw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(25),
    paddingBottom: hp(10)
  }
})