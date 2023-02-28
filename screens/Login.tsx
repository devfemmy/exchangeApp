/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable keyword-spacing */
/* eslint-disable quotes */
/* eslint-disable semi */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import GlobalStyle from '../utils/globalStyle'
import { hp, wp } from '../utils/helper'
import { COLORS, FONTS } from '../utils/constants/theme'
import { TextInput } from '../components/TextInput'
import { LoginFormData } from '../utils/types'
import { LoginSchema } from '../utils/schemas'
import { useFormik } from 'formik'
import IconTextButton from '../components/IconTextButton'
import { useAppDispatch} from '../app/hooks'
import { signInUser } from '../slice/AuthSlice'
import { Notifier, NotifierComponents } from 'react-native-notifier';
import HeaderComponent from '../components/HeaderComponent'





const Login = ({navigation}: any) => {
 const dispatch = useAppDispatch()
 const [loader, setLoader] = useState(false)

 
  const initialValues: LoginFormData = {
    emailAddress: '',
    password: '',
  };


  const handleCredentialSubmit = async (data: any) => {
    setLoader(true)
    try {
      var response = await dispatch(signInUser(data)) as any
      if(signInUser.fulfilled.match(response)){
        setLoader(false)
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

    }
  }

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
  useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (data: LoginFormData) => handleCredentialSubmit(data),
  });



  return (
    <View style={[GlobalStyle.container, styles.div]}>
      {/* <HeaderComponent onPress={() => navigation.goBack()} /> */}
      <View style={styles.margin} />
      <Text style={{...FONTS.h2}}>Log in</Text>
      <Text style={[GlobalStyle.subTitle, {marginBottom: hp(5)}]}>Let’s get you started right away</Text>
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
   <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}><Text style={{...FONTS.body4, textAlign: 'right', marginBottom: hp(15), color: '#808080'}}>Forget Password ?</Text></TouchableOpacity>
        <IconTextButton label="Login" onPress={handleSubmit} isLoading={loader} />
      </View>
     
     <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
     <View style={styles.bottom}>
          <Text style={{...FONTS.body4, textAlign: 'center', color: '#808080'}}>Don’t have an account ? Create Account</Text>
      </View>
     </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  div: {
    paddingVertical: hp(70),

  },
  icon: {
    marginVertical: hp(20)
  },
  img: {
    width: wp(40)
  },
  top: {
    flex: 5,
    marginTop: hp(20)
  },
  margin: {
    marginVertical: 20,
  },
  bottom: {

  }
})


