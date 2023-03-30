/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable semi */
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyle from '../utils/globalStyle';
import HeaderComponent from '../components/HeaderComponent';
import {COLORS, FONTS} from '../utils/constants/theme';
import {hp, wp} from '../utils/helper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconTextButton from '../components/IconTextButton';
import {useAppDispatch} from '../app/hooks';
import {getSwapQuote, swapToken} from '../slice/TradeSlice';
import { Notifier, NotifierComponents } from 'react-native-notifier';


const ConfirmSwap = (props: any) => {
  const fromIcon = props?.route.params.info.fromIcon;
  const fromName = props?.route.params.info.fromName;
  const toIcon = props?.route.params.info.toIcon;
  const toName = props?.route.params.info.toName;
  const amount = props?.route.params.info.amount;
  const dispatch = useAppDispatch();
  const [quoteInfo, setQuoteInfo] = useState<any>();
  const [isFetching, setIsFetching] = useState(false);
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    const payload = {
      fromCurrency: fromName,
      toCurrency: toName,
      fromCurrencyAmt: amount,
    };

    setIsFetching(true);
    setInterval(() => {
      dispatch(getSwapQuote(payload)).then((pp: any) => {
        setQuoteInfo(pp?.payload);
        setIsFetching(false);
      });
    }, 10000);
  }, [fromName, toName, amount]);


  const handleSwapToken = async () => {
    const payload = {
        fromCurrency: fromName?.toLowerCase(),
        toCurrency: toName?.toLowerCase(),
        fromCurrencyAmt: amount,
      };
      setLoader(true);
    try {
        var response = await dispatch(swapToken(payload))
        if(swapToken?.fulfilled.match(response)) {
            setLoader(false)
          return props?.navigation.navigate("SuccessScreen")
        }
        else {
            setLoader(false);
            var errMsg = response?.payload as string;
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
    <View style={GlobalStyle.container}>
      <HeaderComponent onPress={() => props?.navigation.goBack()} />
      <Text style={{...FONTS.h2, fontWeight: '700'}}>Confirm Swap</Text>
      <Text style={{...FONTS.body5}}>Kindly confirm this transaction</Text>
      <View style={styles.div}>
        <View style={styles.div2}>
          <Image source={fromIcon} style={styles.icon} />
          <AntDesign name="swap" size={20} />
          <Image source={toIcon} style={styles.icon} />
        </View>
      </View>

      <View style={styles.swapCard}>
        <View style={[GlobalStyle.rowBetween, {paddingVertical: hp(15)}]}>
          <Text>From</Text>
          <Text style={{textTransform: 'uppercase', color: COLORS.primary, fontWeight: '600'}}>
            {amount} {fromName}
          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {paddingVertical: hp(10)}]}>
          <Text>Fee</Text>
          <Text style={{textTransform: 'uppercase',color: COLORS.primary, fontWeight: '600'}}>{quoteInfo?.fee}</Text>
        </View>
        <View style={[GlobalStyle.rowBetween, {paddingVertical: hp(10)}]}>
          <Text>Total value to receive</Text>
          <Text style={{textTransform: 'uppercase',color: COLORS.primary, fontWeight: '600'}}>{quoteInfo?.amtToGet}</Text>
        </View>
      </View>

      <View style={[GlobalStyle.rowBetween, {paddingVertical: hp(10)}]}>
          <Text>Rate</Text>
          <Text style={{color: COLORS.primary, fontWeight: '600'}}>{quoteInfo?.rate}</Text>
        </View>

      <View style={{marginVertical: hp(20)}}>
        {isFetching ? (
          <Text style={{textAlign: 'center'}}>Fetching new rate</Text>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={COLORS.black} />
            <Text> Getting best rate</Text>
          </View>
        )}
      </View>

      <View>
        <IconTextButton label="Swap Token" isLoading={loader} onPress={() => handleSwapToken()} />
      </View>
    
    </View>
  );
};

export default ConfirmSwap;

const styles = StyleSheet.create({
  icon: {
    width: wp(30),
    height: hp(30),
  },
  div: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(30),
  },
  div2: {
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swapCard: {
    borderColor: COLORS.primary,
    borderWidth: 0.4,
    backgroundColor: COLORS.ldPrimary,
    borderRadius: 10,
    padding: hp(10)
  }
});
