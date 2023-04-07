/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyle from '../utils/globalStyle';
import {COLORS, FONTS} from '../utils/constants/theme';
import {format, hp, wp} from '../utils/helper';
import {tether} from '../assets/images';

import {TextInput} from '../components/TextInput';
import IconTextButton from '../components/IconTextButton';
import InvoiceUploadModal from '../components/Modals/InvoiceUploadModal';
import SelectDropdowns from '../components/SelectDropdowns';
// import CountryList from '../utils/constants/Countries';
import { useAppDispatch } from '../app/hooks';
import { getRate } from '../slice/ZendSlice';
import { getTradingAccountByCurrency } from '../slice/WalletSlice';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { UsdFormData } from '../utils/types';
import { UsdSchema } from '../utils/schemas';
import { useFormik } from 'formik';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const ZendUsdForm = (props: any) => {

  const [type, setType] = useState<any>(1);
  const [openModal, setOpenModal] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("")
  const dispatch = useAppDispatch()
  const [rate, setRate] = useState<any>("")
  const [usdBal, setUsdBal] = useState<any>("")
  const [amount, setAmount] = useState<any>("")
  const [dataInfo, setDataInfo] = useState<any>()
  const [restCountry, setRestCountry] = useState<any>([])

  useEffect(() => {
    dispatch(getRate()).then(dd => setRate(dd?.payload?.data?.rate))
    dispatch(getTradingAccountByCurrency("USDT")).then(dd => {
      setUsdBal(dd?.payload ? dd?.payload["USDT"]?.availBal : "0" )
    }
    );
    fetch("https://restcountries.com/v3.1/all").then(dd => dd?.json()).then(pp => setRestCountry(pp))
  }, [])

  const initialValues: UsdFormData = {
    beneficiaryName: "",
    beneficiaryAddress: "",
    bankName: "",
    bankAccount: "",
    swiftCode: "",
    beneficiaryEmail: "",
    phoneNumber: ""
  };



  const handleOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)

  }

  // const listofCountries = CountryList?.map((data, i )=> {
  //   return restCountry?.map((info: any) => {
  //     return data === info?.name?.official &&  {
  //       id: i + 1,
  //       name: data,
  //       image: info?.flags?.png
  //     }
  //   })
  // })

  const listofCountries = restCountry?.map((info: any, i: any) => {
    return {
      id: i + 1,
      name: info?.name?.common,
      image: info?.flags?.png
    }
  })

  console.log(listofCountries)

  const handleContinue = () => {
    if(parseFloat(amount) > usdBal) {
      return  Notifier.showNotification({
        title: 'Error',
        description: "Insufficient Balance",
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });
    }
    if(usdBal < 1000) {
      return  Notifier.showNotification({
        title: 'Error',
        description: "Minimum Usd transfer is 1000USD",
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });
    }
    setType(type + 1)
  }

  const handleSubmitData = (data: any) => {
    setDataInfo(data)
    handleOpen()
  }

  const {values, errors, touched, handleChange, handleSubmit, handleBlur} =
  useFormik({
    initialValues,
    validationSchema: UsdSchema,
    onSubmit: (data: UsdFormData) => handleSubmitData(data),
  });

 

  const sectionOne = () => {
    return (
      <View>
        
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(20)}]}>
          <View style={GlobalStyle.rowStart}>
            <Image source={tether} style={styles.icons} />
            <Text
              style={{
                ...FONTS.body4,
                fontWeight: '600',
                color: COLORS.grayBlack,
              }}>
              Tether
            </Text>
          </View>
          <View style={GlobalStyle.rowStart}>
            <Text style={{...FONTS.body4, color: COLORS.gray}}>Balance: </Text>
            <Text style={{...FONTS.body4, fontWeight: '600'}}>{format(parseFloat(usdBal)?.toFixed(3).slice(0,-1))} USDT</Text>
          </View>
        </View>

        <View style={GlobalStyle.rowStart}>
            <Text style={{...FONTS.body4, color: COLORS.gray}}>Rate </Text>
            <Text style={{...FONTS.body4, color: COLORS.primary}}>1.00 USDT = {rate?.rate} USD</Text>
          </View>

        <View style={styles.form}>

          <SelectDropdowns 
            label="Select Country" 
            data={listofCountries}  
            selected={selectedCountry}
            setSelected={(value: any) => setSelectedCountry(value)}
          />
          <TextInput label={'Enter amount you want to send'} value={amount} onChangeText={(value) => setAmount(value)} />
        </View>

        <View style={styles.card}>
          <View style={[GlobalStyle.rowBetween, {paddingVertical: hp(10)}]}>
            <Text style={{...FONTS.body5, color: COLORS.black}}>Charges</Text>
            <Text style={{...FONTS.body5, color: COLORS.black}}>$0</Text>
          </View>
          <View style={styles.hr} />
          <View style={[GlobalStyle.rowBetween, {paddingVertical: hp(10)}]}>
            <Text style={{...FONTS.body5, color: COLORS.black}}>
              Recipents will receive
            </Text>
            <Text style={{...FONTS.body5, color: COLORS.black}}>${ amount ? parseFloat(amount) * parseFloat(rate?.rate) : 0}</Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <Text
            style={{
              ...FONTS.body4,
              textAlign: 'center',
              marginVertical: hp(20),
            }}>
            Transfer may take up to 48hrs
          </Text>
          <IconTextButton
            label="Save and Continue"
            onPress={() => handleContinue()}
          />
        </View>
      </View>
    );
  };
  const routeNext = (data: any) => {
    handleClose()
    setType(1)

   props?.navigation.navigate("PaymentDetails", {
    params: {
      ...dataInfo,
      country: selectedCountry,
      rate: rate?.rate,
      balance: parseFloat(usdBal)?.toFixed(3).slice(0,-1),
      amtToReceive: parseFloat(amount) * parseFloat(rate?.rate),
      amount: amount,
      invoiceInfo: data
    }
   })
  
  }

  const sectionTwo = () => {
    return (
      <View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
        <TextInput label={'Enter Beneficial Name'} value={values?.beneficiaryName}
              onBlur={handleBlur('beneficiaryName')}
              onChangeText={handleChange('beneficiaryName')}
              errorMsg={touched.beneficiaryName ? errors.beneficiaryName : undefined}  />
                   <TextInput label={'Enter Beneficial Email'} value={values?.beneficiaryEmail}
              onBlur={handleBlur('beneficiaryEmail')}
              onChangeText={handleChange('beneficiaryEmail')}
              errorMsg={touched.beneficiaryEmail ? errors.beneficiaryEmail : undefined}  />
        <TextInput label={'Enter Beneficial Address'}  value={values.beneficiaryAddress}
              onBlur={handleBlur('beneficiaryAddress')}
              onChangeText={handleChange('beneficiaryAddress')}
              errorMsg={touched.beneficiaryAddress ? errors.beneficiaryAddress : undefined} />
        <TextInput label={'Enter Bank Name'}  value={values.bankName}
              onBlur={handleBlur('bankName')}
              onChangeText={handleChange('bankName')}
              errorMsg={touched.bankName ? errors.bankName : undefined} />
        <TextInput label={'Enter Bank Account'}  value={values.bankAccount}
              onBlur={handleBlur('bankAccount')}
              onChangeText={handleChange('bankAccount')}
              errorMsg={touched.bankAccount ? errors.bankAccount : undefined} />
                 <TextInput label={'Enter Phone No'}  value={values.phoneNumber}
              onBlur={handleBlur('phoneNumber')}
              onChangeText={handleChange('phoneNumber')}
              errorMsg={touched.phoneNumber ? errors.phoneNumber : undefined} />
        <TextInput label={'Enter Swift Code'}  value={values.swiftCode}
              onBlur={handleBlur('swiftCode')}
              onChangeText={handleChange('swiftCode')}
              errorMsg={touched.swiftCode ? errors.swiftCode : undefined} />
        </View>



        <View style={styles.bottom2}>
          <Text
            style={{
              ...FONTS.body4,
              textAlign: 'center',
              marginVertical: hp(20),
            }}>
            Transfer may take up to 48hrs
          </Text>
          <IconTextButton
            label="Proceed"
            onPress={handleSubmit}
          />
        </View>
        </KeyboardAwareScrollView>
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView>
    <ScrollView>
      <View style={GlobalStyle.container}>
         <View style={[GlobalStyle.rowBetween, {marginBottom: hp(20)}]}>
              <AntDesign
                name="arrowleft"
                size={hp(20)}
                onPress={type === 1 ? () => props?.navigation.goBack() : () => setType(type - 1)}
              />
              <TouchableOpacity onPress={() => props?.navigation.navigate('Instructions')}>
                <View style={styles.swap}>
                  <Text style={{marginRight: hp(5)}}>Instructions</Text>
                  <MaterialIcons name="history" size={20} />
                </View>
              </TouchableOpacity>
            </View>
        <View style={GlobalStyle.rowBetween}>
          <View>
            <Text
              style={{...FONTS.h3, fontWeight: '600', marginBottom: hp(10)}}>
              Zend USD
            </Text>
            <Text style={{...FONTS.body5, color: COLORS.gray}}>
              Kindly provide the necessary details
            </Text>
          </View>

        </View>

        {type === 1 && sectionOne()}

        {type === 2 && sectionTwo()}
      </View>
      <InvoiceUploadModal modalVisible={openModal} setModalVisible={() => handleClose()} routeNext={(data: any) => routeNext(data)} />
    </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default ZendUsdForm;

const styles = StyleSheet.create({
  icons: {
    width: wp(30),
    height: hp(30),
    marginRight: hp(10),
  },
  form: {
    marginTop: hp(30)
  },
  card: {
    backgroundColor: COLORS.primary2,
    borderRadius: 10,
    padding: hp(15),
  },
  hr: {
    width: '100%',
    backgroundColor: COLORS.primary,
    height: hp(1),
  },
  bottom: {
    height: hp(200),
    justifyContent: 'flex-end',
  },
  bottom2: {
    // height: hp(200),
    justifyContent: 'flex-end',
    marginBottom: hp(50)
  },
  swap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    paddingHorizontal: hp(10),
    paddingVertical: hp(5),
  },
});
