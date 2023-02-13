import { View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import OTPInputView from '@twotalltotems/react-native-otp-input'


import { hp, wp } from '../utils/helper'
import { COLORS, FONTS } from '../utils/constants/theme'
import IconTextButton from '../components/IconTextButton'
import GlobalStyle from '../utils/globalStyle'


const EmailVerification = (props: any) => {
    const emailAddress = props?.route?.params?.params?.email
    const [loader, setLoader] = useState(false)
 
    const [code, setCode] = useState<any>()

  

    const handleSubmit = async () => {
        setLoader(false)
    }


    return (
        <View style={GlobalStyle.container}>
            <AntDesign onPress={() => props.navigation.goBack()} name="arrowleft" style={styles.icon} size={hp(20)} color={COLORS.gray2} />

            <Text style={{...FONTS.h2}}>Verify your Email Address</Text>

            <Text style={{...FONTS.body5, color: COLORS.gray}}>{`Enter the OTP code sent to your email ${emailAddress}`}</Text>

            <View style={styles.otp}>
                <OTPInputView
                    style={styles.otpInputView}
                    pinCount={6}
                    code={code}
                    onCodeChanged={code => {
                        setCode(code)
                    }}
                    keyboardType='default'
                    autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                />
            </View>
            <View style={styles.bottom}>
            <IconTextButton label='Continue' isLoading={loader} onPress={handleSubmit} />
            </View>
        </View>
    )
}

export default EmailVerification

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(10),
        flex: 1,
        backgroundColor: 'white'
    },
    txt: {
        marginTop: hp(35)
    },
    txt2: {
        marginTop: hp(10),
        marginBottom: hp(24)
    },
    icon: {
        marginVertical: hp(20)
    },
    otpInputView: {
        width: '87%',
        height: hp(50),
        
    },
    underlineStyleBase: {
        width: wp(40),
        height: hp(40),
        borderRadius: 5,
        color: 'black'
      },
    
      underlineStyleHighLighted: {
        borderColor: "#03DAC6",
      },
    otp: {
        width: '100%',
        marginTop: hp(40),
        marginHorizontal: hp(5),
        flex: 3,
    },
    bottom: {
        flex: 1
    }
})