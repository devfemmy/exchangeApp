import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/globalStyle'
import { hp, wp } from '../utils/helper'
import { COLORS, FONTS } from '../utils/constants/theme'

import { TextInput } from '../components/TextInput'
import { LoginFormData } from '../utils/types'
import { LoginSchema } from '../utils/schemas'
import { useFormik } from 'formik'
import IconTextButton from '../components/IconTextButton'

import { TouchableOpacity } from 'react-native-gesture-handler'

const Login = ({navigation}: any) => {

  const initialValues: LoginFormData = {
    emailAddress: '',
    password: '',
  };


  const handleCredentialSubmit = (data: any) => {
    console.log({data})  
  }

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
  useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (data: LoginFormData) => handleCredentialSubmit(data),
  });



  return (
    <View style={[GlobalStyle.container, styles.div]}>

      <Text style={{...FONTS.h2}}>Log in</Text>
      <Text style={{...FONTS.body5, color: COLORS.gray}}>Let’s get you started right away</Text>
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
  <Text style={{...FONTS.body4, textAlign: 'right', marginBottom: hp(15)}}>Forget Password ?</Text>
        <IconTextButton label="Log in" onPress={handleSubmit} />
      </View>
     
     <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
     <View style={styles.bottom}>
          <Text style={{...FONTS.body4, textAlign: 'center'}}>Don’t have an account ? Create Account</Text>
      </View>
     </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  div: {
    paddingVertical: hp(100),

  },
  icon: {

  },
  img: {
    width: wp(40)
  },
  top: {
    flex: 5,
    marginTop: hp(20)
  },
  bottom: {

  }
})


