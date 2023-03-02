import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import HeaderComponent from '../components/HeaderComponent';
import {COLORS, FONTS} from '../utils/constants/theme';
import {hp, wp} from '../utils/helper';
import IconTextButton from '../components/IconTextButton';
import Feather from 'react-native-vector-icons/Feather';

const PaymentDetails = ({navigation}: any) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={GlobalStyle.container}>
      <View>
      <HeaderComponent onPress={() => navigation.goBack()} />
      <Text style={{...FONTS.h3, fontWeight: 'bold'}}>
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
              fontWeight: 'bold',
              width: wp(200),
              textAlign: 'right',
            }}>
            China
          </Text>
        </View>

        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>
            Amount you want to send
          </Text>
          <Text style={{...FONTS.body4, fontWeight: 'bold'}}>$1000</Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>Rate</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: 'bold',
              width: wp(200),
              textAlign: 'right',
            }}>
            $45
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>
            Beneficiary Name
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: 'bold',
              width: wp(200),
              textAlign: 'right',
            }}>
            Zenghzuep Tech Co. limited
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>
            Beneficiary Address
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: 'bold',
              width: wp(200),
              textAlign: 'right',
            }}>
            37, katangura street off ajegunle china
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>Bank Name</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: 'bold',
              width: wp(200),
              textAlign: 'right',
            }}>
            Zenghzuep Tech Co. limited
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>
            Account Number
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: 'bold',
              width: wp(200),
              textAlign: 'right',
            }}>
            01239384443
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>Bank Address</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: 'bold',
              width: wp(200),
              textAlign: 'right',
            }}>
            37, katangura street off ajegunle china{' '}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
          <Text style={{...FONTS.body4, color: COLORS.gray}}>Swift Code</Text>
          <Text
            style={{
              ...FONTS.body4,
              fontWeight: 'bold',
              width: wp(200),
              textAlign: 'right',
            }}>
            BSDFSR342{' '}
          </Text>
        </View>

        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
        <Text style={{...FONTS.body4, color: COLORS.gray}}>Charges</Text>
        <Text style={{...FONTS.body4, fontWeight: 'bold', width: wp(200), textAlign: "right"}}>2373778276</Text>
      </View>

      <View style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
        <Text style={{...FONTS.body4, color: COLORS.gray}}>Recipient will receive</Text>
        <Text style={{...FONTS.body4, fontWeight: 'bold', width: wp(200), textAlign: "right"}}>$8,900</Text>
      </View>
      </View>

      <View style={{justifyContent: 'flex-end',alignItems: 'center', flexDirection: 'row', marginTop: hp(30), marginBottom: hp(10)}}>
        <Feather name="shopping-bag" color={COLORS.primary} size={15} />
          <Text style={{...FONTS.body3, color: COLORS.primary, marginLeft: hp(10)}}>Edit</Text>
      </View>

      <IconTextButton label="Zend USD" />
    </View>
    </ScrollView>
  );
};

export default PaymentDetails;
