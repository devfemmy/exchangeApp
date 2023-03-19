import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/globalStyle'
import HeaderComponent from '../components/HeaderComponent'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp } from '../utils/helper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import IconTextButton from '../components/IconTextButton'
import { TextInput } from '../components/TextInput'

const ZendUsd = ({navigation}: any) => {
  return (
    <View style={GlobalStyle.container}>
      <HeaderComponent onPress={() => navigation.goBack()} />
      <Text style={{...FONTS.h3, fontWeight: '600'}}>Welcome to Zend USD</Text> 
      <Text style={{...FONTS.body4, marginTop: hp(20), color: COLORS.gray}}>Welcome to zend USD, before you can carry out any transactions you have to upload your company CAC Document</Text> 
    
        <View style={styles.div}>
            <AntDesign name="addfolder" size={20} color={COLORS.gray} />
            <Text style={{...FONTS.body5, color: COLORS.gray}}>Upload CAC Document</Text>
        </View>
        <View style={styles.div2}>
            <AntDesign name="addfolder" size={20} color={COLORS.gray} />
            <Text style={{...FONTS.body5, color: COLORS.gray}}>Upload Mermat</Text>
        </View>
        <TextInput
              label={'Enter Name of Company'}
              value={""}
            
            />
        <TextInput
              label={'Enter Cac registration number'}
              value={""}
            
            />
         <IconTextButton label="Upload Document" onPress={() => navigation.navigate("CacUploadSuccess")} />
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