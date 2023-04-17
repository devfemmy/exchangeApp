import {View, Text, ScrollView} from 'react-native';
import React, { useState } from 'react';
import GlobalStyle from '../utils/globalStyle';
import HeaderComponent from '../components/HeaderComponent';
import {COLORS, FONTS} from '../utils/constants/theme';
import {hp, wp} from '../utils/helper';
import IconTextButton from '../components/IconTextButton';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createUsd } from '../slice/ZendSlice';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { userState } from '../slice/AuthSlice';
import { modeStatus } from '../slice/TradeSlice';


const PaymentDetails = (props: any) => {
  const {amount, rate, country, amtToReceive,phoneNumber, beneficiaryName, beneficiaryAddress, beneficiaryEmail,invoiceInfo, swiftCode,bankAccount, bankName} = props?.route?.params?.params
  const [loader, setLoader] = useState(false)
  const dispatch = useAppDispatch()
  const userStateInfo = useAppSelector(userState);
  const getUserInfo = userStateInfo?.userData
  ? userStateInfo?.userData
  : userStateInfo;
  const modeInfo = useAppSelector(modeStatus);

  const handleSubmit = async () => {
      setLoader(true)
      const payload = {
        data: {
        swiftCode: swiftCode,
        amount: parseFloat(amount),
        charges: 0,
        beneficiary: {
            name: beneficiaryName,
            address: beneficiaryAddress,
            bankName: bankName,
            bankAccountNumber: bankAccount,
            emailAddress: beneficiaryEmail,
            phoneNumber: phoneNumber,
            country: country
        },
        paymentInvoice: {
            isUploaded: true,
            file: invoiceInfo?.uri
        },
        },
        userId: getUserInfo?.id
      }
      try{
        var response = await dispatch(createUsd(payload))
        if(createUsd.fulfilled.match(response)){
          setLoader(false)
          return props?.navigation.navigate("SuccessScreen")
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
      catch(e){

      }
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
      <View>
      <HeaderComponent onPress={() => props?.navigation.goBack()} />
      <Text style={{...FONTS.h3, fontWeight: '600', color:modeInfo ? COLORS.black : COLORS.white}}>
        Confirm Payment Details
      </Text>
      <Text style={{...FONTS.body5, color: COLORS.gray}}>
        Kindly confirm your details
      </Text>

      <View style={{marginTop: hp(10)}}>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color:modeInfo ? COLORS.gray : COLORS.white}}>Country</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
              color:modeInfo ? COLORS.black : COLORS.white
            }}>
            {country}
          </Text>
        </View>

        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color:modeInfo ? COLORS.gray : COLORS.white}}>
            Amount you want to send
          </Text>
          <Text style={{...FONTS.body4, fontWeight: '600',color:modeInfo ? COLORS.black : COLORS.white}}>${amount}</Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color:modeInfo ? COLORS.gray : COLORS.white}}>Rate</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
              color:modeInfo ? COLORS.black : COLORS.white
            }}>
            {rate}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color:modeInfo ? COLORS.gray : COLORS.white}}>
            Beneficiary Name
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
              color:modeInfo ? COLORS.black : COLORS.white
            }}>
            {beneficiaryName}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color:modeInfo ? COLORS.gray : COLORS.white}}>
            Beneficiary Address
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
              color:modeInfo ? COLORS.black : COLORS.white
            }}>
           {beneficiaryAddress}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color:modeInfo ? COLORS.gray : COLORS.white}}>Bank Name</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
              color:modeInfo ? COLORS.black : COLORS.white
            }}>
           {bankName}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color:modeInfo ? COLORS.gray : COLORS.white}}>
            Account Number
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
              color:modeInfo ? COLORS.black : COLORS.white
            }}>
            {bankAccount}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color:modeInfo ? COLORS.gray : COLORS.white}}>Beneficiary Email</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
              color:modeInfo ? COLORS.black : COLORS.white
            }}>
            {beneficiaryEmail}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color:modeInfo ? COLORS.gray : COLORS.white}}>Swift Code</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
              color:modeInfo ? COLORS.black : COLORS.white
            }}>
           {swiftCode}
          </Text>
        </View>

        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
        <Text style={{...FONTS.body4, color: COLORS.gray}}>Charges</Text>
        <Text style={{...FONTS.body4, fontWeight: '600', width: wp(200), textAlign: "right"}}>0</Text>
      </View>

      <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
        <Text style={{...FONTS.body4, color: COLORS.gray}}>Recipient will receive</Text>
        <Text style={{...FONTS.body4, fontWeight: '600', width: wp(200), textAlign: "right"}}>${amtToReceive}</Text>
      </View>
      </View>

     <TouchableOpacity onPress={() => props?.navigation.navigate("ZendUsdForm", {
      params: {
        edit: 1
      }
     })}>
     <View style={{justifyContent: 'flex-end',alignItems: 'center', flexDirection: 'row', marginTop: hp(30), marginBottom: hp(10)}}>
        <Feather name="shopping-bag" color={COLORS.primary} size={15} />
          <Text style={{...FONTS.body3, color: COLORS.primary, marginLeft: hp(10)}}>Edit</Text>
      </View>
     </TouchableOpacity>

      <IconTextButton label="Zend USD" isLoading={loader} onPress={() => handleSubmit()} />

    
    </View>
    </ScrollView>
  );
};

export default PaymentDetails;
