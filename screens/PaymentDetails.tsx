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
    <ScrollView showsVerticalScrollIndicator={false} style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : "#1a202c"}]}>
      <View>
      <HeaderComponent onPress={() => props?.navigation.goBack()} />
      <Text style={{...FONTS.h3, fontWeight: '600'}}>
        Confirm Payment Details
      </Text>
      <Text style={{...FONTS.body5, color: COLORS.gray}}>
        Kindly confirm your details
      </Text>

      <View style={{marginTop: hp(10)}}>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>Country</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
            }}>
            {country}
          </Text>
        </View>

        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>
            Amount you want to send
          </Text>
          <Text style={{...FONTS.body4, fontWeight: '600'}}>${amount}</Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>Rate</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
            }}>
            {rate}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>
            Beneficiary Name
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
            }}>
            {beneficiaryName}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>
            Beneficiary Address
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
            }}>
           {beneficiaryAddress}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>Bank Name</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
            }}>
           {bankName}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>
            Account Number
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
            }}>
            {bankAccount}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>Beneficiary Email</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
            }}>
            {beneficiaryEmail}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>Swift Code</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: '600',
              width: wp(200),
              textAlign: 'right',
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
