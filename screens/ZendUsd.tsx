import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import GlobalStyle from '../utils/globalStyle'
import HeaderComponent from '../components/HeaderComponent'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp } from '../utils/helper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import IconTextButton from '../components/IconTextButton'
import { TextInput } from '../components/TextInput'
import { useFormik } from 'formik'
import { CompanyVerificationSchema } from '../utils/schemas'
import { CompanyVerificationFormData } from '../utils/types'
import { useAppDispatch } from '../app/hooks'
import { verifyOrganisation } from '../slice/ZendSlice'
import { Notifier, NotifierComponents } from 'react-native-notifier'

const ZendUsd = ({navigation}: any) => {
  const dispatch = useAppDispatch()
  const [loader, setLoader] = useState(false)

  const initialValues: CompanyVerificationFormData = {
    CACNumber: '',
    registeredName: '',
  };

  const handleSubmitData = async (data: any) => {
    setLoader(true)
    const payload = {
      CACNumber: data?.CACNumber,
      registeredName: data?.registeredName,
      isUpload: true
    }
    try {
     var response = await dispatch(verifyOrganisation(payload))
     if(verifyOrganisation.fulfilled.match(response)) {
      setLoader(false);
      navigation.navigate("CacUploadSuccess")
     }
     else {
      var errMsg = response?.payload as string
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
    }
    catch(e) {
      setLoader(false);
    }

  }

  const {values, errors, touched, handleChange, handleSubmit, handleBlur} =
  useFormik({
    initialValues,
    validationSchema: CompanyVerificationSchema,
    onSubmit: (data: CompanyVerificationFormData) => handleSubmitData(data),
  });


  return (
    <View style={GlobalStyle.container}>
      <HeaderComponent onPress={() => navigation.goBack()} />
      <Text style={{...FONTS.h3, fontWeight: '600'}}>Welcome to Zend USD</Text> 
      <Text style={{...FONTS.body4, marginTop: hp(20), color: COLORS.gray}}>Welcome to zend USD, before you can carry out any transactions you have to upload your company CAC Document</Text> 
    
        <View style={styles.div}>
            <AntDesign name="addfolder" size={20} color={COLORS.gray} />
            <Text style={{...FONTS.body5, color: COLORS.gray}}>Upload CAC Document</Text>
        </View>
        {/* <View style={styles.div2}>
            <AntDesign name="addfolder" size={20} color={COLORS.gray} />
            <Text style={{...FONTS.body5, color: COLORS.gray}}>Upload Mermat</Text>
        </View> */}
        <TextInput
              label={'Enter Name of Company'}
              value={values?.registeredName}
              onBlur={handleBlur('registeredName')}
              onChangeText={handleChange('registeredName')}
              errorMsg={touched.registeredName ? errors.registeredName : undefined}
            
            />
        <TextInput
              label={'Enter Cac registration number'}
              value={values?.CACNumber}
              onBlur={handleBlur('CACNumber')}
              onChangeText={handleChange('CACNumber')}
              errorMsg={touched.CACNumber ? errors.CACNumber : undefined}
            />
         <IconTextButton label="Upload Document" onPress={() => handleSubmit()} isLoading={loader} />
    </View>
  )
}

export default ZendUsd

const styles = StyleSheet.create({
    div: {
        marginTop: hp(30),
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 15,
        borderStyle: 'dashed',
        backgroundColor: COLORS.primary2,
        height: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(30)
    },
    div2: {
      borderColor: COLORS.primary,
      borderWidth: 1,
      borderRadius: 15,
      borderStyle: 'dashed',
      backgroundColor: COLORS.primary2,
      height: hp(100),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: hp(20)
  }
})