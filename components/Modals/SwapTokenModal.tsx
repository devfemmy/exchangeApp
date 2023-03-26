/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../../utils/constants/theme';
import {format, hp, wp} from '../../utils/helper';
import {TextInput} from '../TextInput';
import {tokenBalanceData} from '../../utils/constants/tokenList';
import GlobalStyle from '../../utils/globalStyle';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppSelector} from '../../app/hooks';
import {fundingAccount, tradingAccount} from '../../slice/WalletSlice';
import {
  algorand,
  avalanche,
  bitcoin,
  bitcoinCash,
  dogeCoin,
  ethereum,
  litecoin,
  okb,
  polygon,
  ripple,
  solana,
  steller,
  tether,
  tron,
  usd,
} from '../../assets/images';

const SwapTokenModal = ({
  modalVisible,
  setModalVisible,
  selectedToken,
  setSelectedToken,
  transferType,
}: any) => {
  const [value, setValue] = useState('');

  const tradingAccountInfo: any = useAppSelector(tradingAccount);
  const fundingAccountInfo: any = useAppSelector(fundingAccount);



  const selectType = (data: any) => {
    setSelectedToken(data);
  };

  const newTradingAccount = tradingAccountInfo
    ? Object?.values(tradingAccountInfo)
    : [];

  const newFundingAccount = fundingAccountInfo
    ? Object?.values(fundingAccountInfo)
    : [];

  const newTradingAccount2 = tradingAccountInfo
    ? Object?.keys(tradingAccountInfo)
    : [];

  const newFundingAccount2 = fundingAccountInfo
    ? Object?.keys(fundingAccountInfo)
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

  const newFundingList = newFundingAccount?.map((data: any, i) => {
    return (
      typeof data === 'object' && {
        currency: newFundingAccount2[i]?.toLowerCase(),
        availBalance: data?.availBal,
        balUsd: data?.usd,
        token:
          newFundingAccount2[i]?.toLowerCase() === 'btc'
            ? 'Bitcoin'
            : newFundingAccount2[i]?.toLowerCase() === 'eth'
            ? 'Ethereum'
            : newFundingAccount2[i]?.toLowerCase() === 'usdt'
            ? 'Tether'
            : newFundingAccount2[i]?.toLowerCase() === 'usdc'
            ? 'USD Coin'
            : newFundingAccount2[i]?.toLowerCase() === 'trx'
            ? 'Tron'
            : newFundingAccount2[i]?.toLowerCase() === 'sol'
            ? 'Solana'
            : newFundingAccount2[i]?.toLowerCase() === 'algo'
            ? 'Algorand'
            : newFundingAccount2[i]?.toLowerCase() === 'xrp'
            ? 'Ripple'
            : newFundingAccount2[i]?.toLowerCase() === 'bch'
            ? 'Bitcoin Cash'
            : newFundingAccount2[i]?.toLowerCase() === 'matic'
            ? 'Polygon'
            : newFundingAccount2[i]?.toLowerCase() === 'avax'
            ? 'Avalanche'
            : newFundingAccount2[i]?.toLowerCase() === 'xlm'
            ? 'Stellar'
            : newFundingAccount2[i]?.toLowerCase() === 'ltc'
            ? 'LiteCoin'
            : newFundingAccount2[i]?.toLowerCase() === 'doge'
            ? 'DogeCoin'
            : newFundingAccount2[i]?.toLowerCase() === 'okb'
            ? 'OKX'
            : null,
        icon:
          newFundingAccount2[i]?.toLowerCase() === 'btc'
            ? bitcoin
            : newFundingAccount2[i]?.toLowerCase() === 'eth'
            ? ethereum
            : newFundingAccount2[i]?.toLowerCase() === 'usdt'
            ? tether
            : newFundingAccount2[i]?.toLowerCase() === 'usdc'
            ? usd
            : newFundingAccount2[i]?.toLowerCase() === 'trx'
            ? tron
            : newFundingAccount2[i]?.toLowerCase() === 'sol'
            ? solana
            : newFundingAccount2[i]?.toLowerCase() === 'algo'
            ? algorand
            : newFundingAccount2[i]?.toLowerCase() === 'xrp'
            ? ripple
            : newFundingAccount2[i]?.toLowerCase() === 'bch'
            ? bitcoinCash
            : newFundingAccount2[i]?.toLowerCase() === 'matic'
            ? polygon
            : newFundingAccount2[i]?.toLowerCase() === 'avax'
            ? avalanche
            : newFundingAccount2[i]?.toLowerCase() === 'xlm'
            ? steller
            : newFundingAccount2[i]?.toLowerCase() === 'ltc'
            ? litecoin
            : newFundingAccount2[i]?.toLowerCase() === 'doge'
            ? dogeCoin
            : newFundingAccount2[i]?.toLowerCase() === 'okb'
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

  const afterFundFilt = newFundingList?.filter(data => data !== false);
  const afterFundSort = afterFundFilt?.sort(
    (a: any, b: any) => parseFloat(b?.balUsd) - parseFloat(a?.balUsd),
  );
  const fundBal: any = tokenBalanceData;
  const combineFundData = afterFundSort?.concat(fundBal);

  const uniqueFundData = combineFundData.filter(
    (tag: any, index: any, array: any) =>
      array.findIndex((t: any) => t?.currency == tag?.currency) == index,
  );
  const searchFundData = !value
    ? uniqueFundData
    : uniqueFundData.filter(
        (data: any) =>
          data?.currency?.toLowerCase().includes(value?.toLowerCase()) ||
          data?.token?.toLowerCase().includes(value?.toLowerCase()),
      );

  const assets = () => {
    if (transferType === 'funding') {
      return searchFundData?.map((info: any) => {
        return (
          <TouchableOpacity
            onPress={
              selectedToken?.toLowerCase() === info?.currency?.toLowerCase()
                ? () => {}
                : () => selectType(info)
            }>
            <View
              style={[
                styles.actionCard2,
                {
                  backgroundColor:
                    selectedToken?.toLowerCase() ===
                    info?.currency?.toLowerCase()
                      ? COLORS.lightGray2
                      : COLORS.white,
                },
              ]}>
              <View style={GlobalStyle.rowStart}>
                <Image
                  source={info?.icon}
                  resizeMode="cover"
                  style={styles.icons}
                />
                <View style={{marginLeft: hp(10)}}>
                  <Text style={{...FONTS.body3, fontWeight: '600'}}>
                    {info?.token}
                  </Text>
                  <Text style={{...FONTS.body5, textTransform: 'uppercase'}}>
                    {info?.currency}
                  </Text>
                </View>
              </View>
              <View
                style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Text
                  style={{...FONTS.h5, color: COLORS.lightBlack}}>{`${format(
                  info?.availBalance
                    ? parseFloat(info?.availBalance)?.toFixed(4)
                    : 0,
                )}`}</Text>
                <Text
                  style={{
                    ...FONTS.h5,
                    color: COLORS.lightBlack,
                    fontWeight: '600',
                  }}>{`$${format(
                  info?.balUsd ? parseFloat(info?.balUsd)?.toFixed(2) : 0,
                )}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    } else {
      return searchTradData?.map((info: any) => {
        return (
          <TouchableOpacity
            onPress={
              selectedToken?.toLowerCase() === info?.currency?.toLowerCase()
                ? () => {}
                : () => selectType(info)
            }>
            <View
              style={[
                styles.actionCard2,
                {
                  backgroundColor:
                    selectedToken?.toLowerCase() ===
                    info?.currency?.toLowerCase()
                      ? COLORS.lightGray2
                      : COLORS.white,
                },
              ]}>
              <View style={GlobalStyle.rowStart}>
                <Image
                  source={info?.icon}
                  resizeMode="cover"
                  style={styles.icons}
                />
                <View style={{marginLeft: hp(10)}}>
                  <Text style={{...FONTS.body3, fontWeight: '600'}}>
                    {info?.token}
                  </Text>
                  <Text style={{...FONTS.body5, textTransform: 'uppercase'}}>
                    {info?.currency}
                  </Text>
                </View>
              </View>
              <View
                style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Text
                  style={{...FONTS.h5, color: COLORS.lightBlack}}>{`${format(
                  info?.availBalance
                    ? parseFloat(info?.availBalance)?.toFixed(4)
                    : 0,
                )}`}</Text>
                <Text
                  style={{
                    ...FONTS.h5,
                    color: COLORS.lightBlack,
                    fontWeight: '600',
                  }}>{`$${format(
                  info?.balUsd ? parseFloat(info?.balUsd)?.toFixed(2) : 0,
                )}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    }
  };

  return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setModalVisible()}>
                <View style={styles.end}>
                  <AntDesign name="close" size={30} />
                </View>
              </TouchableOpacity>

              <Text style={{...FONTS.h3, textAlign: 'center'}}>
                Select Token
              </Text>
              <View style={styles.search}>
                <TextInput
                  label={'Search Assets'}
                  value={value}
                  onChangeText={value => setValue(value)}
                  searchInput
                />
              </View>
              <ScrollView>{assets()}</ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default SwapTokenModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparentBlack,
  },
  modalView: {
    margin: 20,
    height: hp(600),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  end: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
  sub: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '30%',
  },
});
