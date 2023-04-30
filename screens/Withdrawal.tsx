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
import {getMarketPrice, marketInfo, modeStatus} from '../slice/TradeSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AssetsComponent from '../components/AssetsComponent';
import HeaderComponent from '../components/HeaderComponent';
import { fundingAccount, tradingAccount } from '../slice/WalletSlice';
import { algorand, avalanche, bitcoin, bitcoinCash, dogeCoin, ethereum, litecoin, okb, polygon, ripple, solana, steller, tether, tron, usd } from '../assets/images';

const Swap = ({navigation}: any) => {
  const [value, setValue] = useState('');
  const marketInfos = useAppSelector(marketInfo) as any;
  const tradingAccountInfo: any = useAppSelector(fundingAccount)
  const modeInfo = useAppSelector(modeStatus);

  const newTradingAccount = tradingAccountInfo
  ? Object?.values(tradingAccountInfo)
  : [];
const newTradingAccount2 = tradingAccountInfo
  ? Object?.keys(tradingAccountInfo)
  : [];
const newTradingList = newTradingAccount?.map((data: any, i) => {
  return (
    typeof data === 'object' && {
      currency: newTradingAccount2[i]?.toLowerCase(),
      availBalance: data?.availBal,
      balUsd: data?.usd,
      token:
        newTradingAccount2[i]?.toLowerCase() === 'btc'
          ? 'Bitcoin'
          : newTradingAccount2[i]?.toLowerCase() === 'eth'
          ? 'Ethereum'
          : newTradingAccount2[i]?.toLowerCase() === 'usdt'
          ? 'Tether'
          : newTradingAccount2[i]?.toLowerCase() === 'usdc'
          ? 'USD Coin'
          : newTradingAccount2[i]?.toLowerCase() === 'trx'
          ? 'Tron'
          : newTradingAccount2[i]?.toLowerCase() === 'sol'
          ? 'Solana'
          : newTradingAccount2[i]?.toLowerCase() === 'algo'
          ? 'Algorand'
          : newTradingAccount2[i]?.toLowerCase() === 'xrp'
          ? 'Ripple'
          : newTradingAccount2[i]?.toLowerCase() === 'bch'
          ? 'Bitcoin Cash'
          : newTradingAccount2[i]?.toLowerCase() === 'matic'
          ? 'Polygon'
          : newTradingAccount2[i]?.toLowerCase() === 'avax'
          ? 'Avalanche'
          : newTradingAccount2[i]?.toLowerCase() === 'xlm'
          ? 'Stellar'
          : newTradingAccount2[i]?.toLowerCase() === 'ltc'
          ? 'LiteCoin'
          : newTradingAccount2[i]?.toLowerCase() === 'doge'
          ? 'DogeCoin'
          : newTradingAccount2[i]?.toLowerCase() === 'okb'
          ? 'OKX'
          : null,
      icon:
        newTradingAccount2[i]?.toLowerCase() === 'btc'
          ? bitcoin
          : newTradingAccount2[i]?.toLowerCase() === 'eth'
          ? ethereum
          : newTradingAccount2[i]?.toLowerCase() === 'usdt'
          ? tether
          : newTradingAccount2[i]?.toLowerCase() === 'usdc'
          ? usd
          : newTradingAccount2[i]?.toLowerCase() === 'trx'
          ? tron
          : newTradingAccount2[i]?.toLowerCase() === 'sol'
          ? solana
          : newTradingAccount2[i]?.toLowerCase() === 'algo'
          ? algorand
          : newTradingAccount2[i]?.toLowerCase() === 'xrp'
          ? ripple
          : newTradingAccount2[i]?.toLowerCase() === 'bch'
          ? bitcoinCash
          : newTradingAccount2[i]?.toLowerCase() === 'matic'
          ? polygon
          : newTradingAccount2[i]?.toLowerCase() === 'avax'
          ? avalanche
          : newTradingAccount2[i]?.toLowerCase() === 'xlm'
          ? steller
          : newTradingAccount2[i]?.toLowerCase() === 'ltc'
          ? litecoin
          : newTradingAccount2[i]?.toLowerCase() === 'doge'
          ? dogeCoin
          : newTradingAccount2[i]?.toLowerCase() === 'okb'
          ? okb
          : null,
    }
  );
});
const afterTradFilt = newTradingList?.filter(data => data !== false);
const afterTradSort = afterTradFilt?.sort(
  (a: any, b: any) => parseFloat(b?.balUsd) - parseFloat(a?.balUsd),
);
const tokenBal: any = tokenBalanceData;
const combineTradData = afterTradSort?.concat(tokenBal);

const uniqueTradData = combineTradData.filter(
  (tag: any, index: any, array: any) =>
    array.findIndex((t: any) => t?.currency == tag?.currency) == index,
);
const searchTradData = !value
  ? uniqueTradData
  : uniqueTradData.filter(
      (data: any) =>
        data?.currency?.toLowerCase().includes(value?.toLowerCase()) ||
        data?.token?.toLowerCase().includes(value?.toLowerCase()),
    );



  const assets = () => {
    return searchTradData?.map((info: any) => {
      return marketInfos?.map((data: any) => {
        return (
          info?.currency === data?.symbol && (
            <AssetsComponent info={info} data={data} tradingAccountInfo={tradingAccountInfo} handleClick={(info: any, data: any) => navigation.navigate("WithdrawalCard", {
              info: info,
              data: data
            })} />
          )
        );
      });
    });

  };

  return (
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <HeaderComponent onPress={() => navigation.goBack()} />
            <Text style={{...FONTS.h2,fontWeight: '600', textAlign: 'left',color:modeInfo ? COLORS.black : COLORS.white}}>Withdraw</Text>
            <Text
              style={{
                ...FONTS.body4,
                textAlign: 'left',
                color: COLORS.gray,
              }}>
              Select token you want to withdraw
            </Text>
            <View style={styles.search}>
              <TextInput
                label={'Search Assets'}
                value={value}
                onChangeText={(value: any) => setValue(value)}
                searchInput
                style={{backgroundColor: COLORS.ldPrimary}}
              />
            </View>
            <View style={[GlobalStyle.rowBetween, {marginVertical: hp(5)}]}>
              <Text style={{...FONTS.h3, color:modeInfo ? COLORS.black : COLORS.white}}>Token</Text>
              <Text style={{...FONTS.h3,color:modeInfo ? COLORS.black : COLORS.white}}>Balance</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>{assets()}</ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Swap;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 10,
    marginBottom: hp(300)
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
  swap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray3,
    borderRadius: 4,
    paddingHorizontal: hp(10),
    paddingVertical: hp(5),
  },
});
