/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../utils/constants/theme';
import {format, hp, wp} from '../utils/helper';
import {TextInput} from '../components/TextInput';
import {tokenBalanceData} from '../utils/constants/tokenList';
import GlobalStyle from '../utils/globalStyle';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {getMarketPrice, marketInfo} from '../slice/TradeSlice';
import IconTextButton from '../components/IconTextButton';

const WithdrawalCard = (props: any) => {
  const assetName = props.route?.params?.info?.token;
  const currencyIcon = props.route?.params?.info?.icon;
  const currencyName = props.route?.params?.info?.currency;

  return (
    <View style={GlobalStyle.container}>
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.top]}>
            <TouchableOpacity onPress={() => props?.navigation.goBack()}>
              <View style={styles.end}>
                <AntDesign name="arrowleft" size={30} />
              </View>
            </TouchableOpacity>

            <Text style={{...FONTS.h2, textAlign: 'left'}}>Withdraw</Text>
            <Text style={{...FONTS.body5, textAlign: 'left'}}>=</Text>

            <View style={[GlobalStyle.rowBetween, {marginTop: hp(20)}]}>
              <View style={GlobalStyle.rowStart}>
                <Image source={currencyIcon} style={styles.icon} />
                <Text style={{textTransform: 'capitalize', ...FONTS.body3}}>
                  {assetName}
                </Text>
              </View>

              <View>
                <Text style={{textTransform: 'capitalize', ...FONTS.body3}}>
                  Balance: 100 {currencyName}
                </Text>
              </View>
            </View>

            <View style={styles.form}>
                <TextInput value="" label="Enter Amount" />
                <TextInput value="" label="Select wallet" />
                <TextInput value="" label="Select Network" />
            </View>
          </View>
          <View style={styles.bottom}>
            <IconTextButton label="Withdraw" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WithdrawalCard;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 10,
    height: hp(650),
  },
  end: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: hp(20),
  },
  search: {
    marginVertical: hp(15),
  },
  icons: {
    width: wp(20),
    height: hp(20),
  },
  actionCard2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(10),
    paddingBottom: hp(10),
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    width: wp(30),
    height: hp(30),
    marginRight: hp(10),
  },
  form: {
    marginVertical: hp(20)
  },
  top: {
    flex: 4,
  },
  bottom: {
    flex: 1
  }
});
