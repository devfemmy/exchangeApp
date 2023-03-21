import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import GlobalStyle from '../utils/globalStyle'
import HeaderComponent from '../components/HeaderComponent'
import { COLORS, FONTS } from '../utils/constants/theme'

import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from '../components/TextInput'
import { hp, wp } from '../utils/helper'
import IconTextButton from '../components/IconTextButton'
import OTPTextView from 'react-native-otp-textinput';
import { useAppDispatch } from '../app/hooks'
import { getWithdrawalOtp, submitExternalWithdraw, submitInternalWithdraw } from '../slice/TradeSlice'
import { ActivityIndicator } from 'react-native-paper'
import { Notifier, NotifierComponents } from 'react-native-notifier';
import SuccessModal from '../components/Modals/SuccessModal'


const TwoFactorVerification = (props: any) => {
    const [emailCode, setEmailCode] = useState("")
    const amount = props?.route?.params?.params?.amount
    const user = props?.route?.params?.params?.user
    const  walletType = props?.route?.params?.params?.walletType
    const  currencyName = props?.route?.params?.params?.currencyName
    const userAddress = props?.route?.params?.params?.userAddress
    const chain = props?.route?.params?.params?.chain
    const [emailLoader, setEmailLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [visible, setVisible] = useState(false)
    const [messageId, setMessageId] = useState<any>("")
    const [pin, setPin] = useState<any>("")
    const dispatch = useAppDispatch()


    const handleSubmitInternal = async () => {
        const payload = {
            currency: currencyName?.toUpperCase(),
            type: walletType === "Zend Pay" ? "internal" : "external",
            amount: amount,
            toUser: user,
            pin: pin,
            emailOtp: emailCode,
            messageId: messageId
        }
        setLoader(true)
        try {
            var response = await dispatch(submitInternalWithdraw(payload))
            if(submitInternalWithdraw.fulfilled.match(response)){
                setLoader(false)
                setVisible(true)
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
        catch(e) {
            setLoader(false)
        }
    }

    const handleSubmitExternal = async () => {
        const payload = {
            currency: currencyName?.toUpperCase(),
            type: walletType === "Zend Pay" ? "internal" : "external",
            amount: amount,
            toAddr: userAddress,
            pin: pin,
            emailOtp: emailCode,
            messageId: messageId,
            chain: chain
        }
        setLoader(true)
        try {
            var response = await dispatch(submitExternalWithdraw(payload))
            if(submitInternalWithdraw.fulfilled.match(response)){
                setLoader(false)
                setVisible(true)
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
        catch(e) {
            setLoader(false)
        }
    }

    const resendMail = () => {
        setEmailLoader(true)
        dispatch(getWithdrawalOtp()).then(pp => {
            setMessageId(pp?.payload?.messageID)
            setEmailLoader(false)
        })
    }


  return (
    <View style={GlobalStyle.container}>
        <HeaderComponent onPress={() => props?.navigation.goBack()} />
      <Text style={{...FONTS.h2, fontWeight: '600'}}>2FA Verification</Text>
      <Text style={{...FONTS.body5, fontWeight: '500', color: COLORS.gray}}>Just making sure its you </Text>
      <Text style={{...FONTS.body5, fontWeight: '500', color: COLORS.gray}}>We send an OTP to your email, kindly enter it below </Text>
    
        <View style={styles.div}>
            <Text>Email code</Text>
             <View style={GlobalStyle.rowStart}>
            <View style={styles.input}>
            <TextInput  
                    placeholderTextColor={COLORS.black}
                    placeholder=''
                   inputMode="text"
                    keyboardType="default"
                    value={emailCode}
                    onChangeText={value => setEmailCode(value)}
                    style={{backgroundColor: COLORS.primary2}}  />
            </View>
             <TouchableOpacity style={styles.btn} onPress={() => resendMail()}>
              {emailLoader ? <ActivityIndicator color={COLORS.white} /> :   <Text style={{...FONTS.body5, color: COLORS.white}}>Send code</Text>}
             </TouchableOpacity>
             </View>
        </View>

        <View style={styles.div}>
            <Text>Transaction Pin</Text>
             <View style={GlobalStyle.rowStart}>
            <View style={styles.input}>
            <View style={{marginVertical: 8,}}>
            <OTPTextView
              tintColor={COLORS.primary}
              textInputStyle={styles.textInputContainer}
              handleTextChange={(text: string) => setPin(text)}
              inputCount={4}
              keyboardType="default"
              returnKeyType="done"
            />
          </View>
            </View>
             </View>

             <View style={{marginTop: hp(20)}}>
                <IconTextButton label="Submit" isLoading={loader} onPress={() => walletType === "Zend Pay" ? handleSubmitInternal() : handleSubmitExternal()}  />
             </View>

             <SuccessModal visible={visible} handleVisible={() => setVisible(false)} />
        </View>
    </View>
  )
}

export default TwoFactorVerification


const styles = StyleSheet.create({
    input: {
        width: "70%",
    },
    div: {
        marginTop: hp(20)
    },
    btn: {
        backgroundColor: COLORS.primary,
        height: hp(50),
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(100),
        marginTop: hp(-15),
        borderRadius: hp(10),
        marginLeft: hp(10)
    },
      textInputContainer: {
        backgroundColor: COLORS.primary2,
        borderRadius: 5,
        color: COLORS.primary,
        borderWidth: 0,
        width: hp(50),
        height: hp(50),
      },
})