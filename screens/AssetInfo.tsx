/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import GlobalStyle from '../utils/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../utils/constants/theme';
import {format, hp, wp} from '../utils/helper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from '../components/TextInput';

import DepositModal from '../components/Modals/DepositModal';
import WithdrawModal from '../components/Modals/WithdrawModal';
import SwapModal from '../components/Modals/SwapModal';
import {useAppDispatch} from '../app/hooks';
import {
  getAssetTransaction,
  getFundingAccountByCurrency,
  getTradingAccountByCurrency,
} from '../slice/WalletSlice';
import EmptyScreen from '../components/EmptyScreen';
import HistoryCard from '../components/HistoryCard';

const AssetInfo = (props: any) => {
  const [assetData, setAssetData] = useState<any>();
  const assetName = props.route?.params?.name;
  const asset = props.route?.params?.currency;
  const assetType = props.route?.params?.assetType;
  const iconData = props.route?.params?.icon;
  const [type, setType] = useState('all');
  const [value, setValue] = useState('');
  const [depositModal, setDepositModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [swapModal, setSwapModal] = useState(false);
  const dispatch = useAppDispatch();
  const [assetTransactions, setAssetTransaction] = useState<any>();

  useEffect(() => {
    const payload = {
      currency: asset,
    };
    if (assetType === 'funding') {
      dispatch(getFundingAccountByCurrency(asset)).then(dd =>
        setAssetData(dd?.payload),
      );
    } else {
      dispatch(getTradingAccountByCurrency(asset)).then(dd =>
        setAssetData(dd?.payload),
      );
    }
    dispatch(getAssetTransaction(payload)).then(dd => setAssetTransaction(dd?.payload));
  }, [asset]);



  const handleDepositOpen = () => {
    setDepositModal(true);
  };

  const handleDepositClose = () => {
    setDepositModal(false);
  };

  const handleSwapOpen = () => {
    setSwapModal(true);
  };

  const handleSwapClose = () => {
    setSwapModal(false);
  };

  const handleWithdrawalOpen = () => {
    setWithdrawModal(true);
  };

  const handleWithdrawalClose = () => {
    setWithdrawModal(false);
  };

  console.log("kkk==", assetTransactions)

  return (
    <View style={GlobalStyle.container}>
      <View style={GlobalStyle.rowStart}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={{...FONTS.h3, color: COLORS.lightGray3}}>Assets</Text>
        </TouchableOpacity>
        <AntDesign name="right" size={10} style={styles.icon} />
        <Text style={{...FONTS.h3, color: COLORS.primary}}>{assetName}</Text>
      </View>
      <View style={[GlobalStyle.rowStart, {marginTop: hp(25)}]}>
        <Image source={iconData} resizeMode="cover" style={styles.icons} />
        <Text style={{...FONTS.h2, textTransform: 'capitalize'}}>
          {assetName}
        </Text>
        <Text style={{...FONTS.h2}}> ({asset.toUpperCase()})</Text>
      </View>

      <View style={styles.card}>
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.lightGray3,
            ...FONTS.body5,
          }}>
          Total Balance
        </Text>
        <Text style={{textAlign: 'center', ...FONTS.body5}}>
          {assetData &&
            `$${format(
              parseFloat(assetData[asset?.toUpperCase()]?.balance).toFixed(4),
            )}`}
        </Text>
        <View style={GlobalStyle.rowStart}>
          <View style={styles.body}>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.darkGreen,
                ...FONTS.body5,
              }}>
              Available
            </Text>
            <Text style={{textAlign: 'center', ...FONTS.body5}}>
              {assetData &&
                `$${format(
                  parseFloat(assetData[asset?.toUpperCase()]?.availBal).toFixed(
                    4,
                  ),
                )}`}
            </Text>
          </View>
          <View style={styles.body}>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.orange,
                ...FONTS.body5,
              }}>
              Pending
            </Text>
            <Text style={{textAlign: 'center', ...FONTS.body5}}>
              {assetData &&
                `$${format(
                  parseFloat(
                    assetData[asset?.toUpperCase()]?.pendingBal,
                  ).toFixed(4),
                )}`}
            </Text>
          </View>
        </View>
      </View>

      <View style={GlobalStyle.rowBetween}>
        <View style={[styles.btn, {backgroundColor: COLORS.primary}]}>
          <TouchableOpacity onPress={() => handleDepositOpen()}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="arrowdown" color={COLORS.white} />
              <Text
                style={{
                  ...FONTS.body5,
                  color: COLORS.white,
                  marginLeft: hp(5),
                }}>
                Deposit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.btn,
            {
              backgroundColor: COLORS.primary2,
              borderColor: COLORS.primary,
              borderWidth: 1,
            },
          ]}>
          <TouchableOpacity onPress={() => handleSwapOpen()}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="swap" color={COLORS.primary} />
              <Text
                style={{
                  ...FONTS.body5,
                  color: COLORS.primary,
                  marginLeft: hp(5),
                }}>
                Swap
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.btn, {backgroundColor: COLORS.primary}]}>
          <TouchableOpacity onPress={() => handleWithdrawalOpen()}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="arrowup" color={COLORS.white} />
              <Text
                style={{
                  ...FONTS.body5,
                  color: COLORS.white,
                  marginLeft: hp(5),
                }}>
                Withdraw
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[GlobalStyle.rowStart, {marginTop: hp(30)}]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              width: wp(50),
              borderBottomColor: type === 'all' ? COLORS.primary : COLORS.gray2,
              borderBottomWidth: 1,
              paddingBottom: hp(5),
            }}>
            <Pressable onPress={() => setType('all')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color: type === 'all' ? COLORS.primary : COLORS.gray2,
                }}>
                All
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              borderBottomColor:
                type === 'withdraw' ? COLORS.primary : COLORS.lightGray3,
              borderBottomWidth: 1,
              paddingBottom: hp(5),
            }}>
            <Pressable onPress={() => setType('withdraw')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color:
                    type === 'withdraw' ? COLORS.primary : COLORS.lightGray3,
                }}>
                Withdraw
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              borderBottomColor:
                type === 'deposit' ? COLORS.primary : COLORS.lightGray3,
              borderBottomWidth: 1,
              paddingBottom: hp(5),
            }}>
            <Pressable onPress={() => setType('deposit')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color:
                    type === 'deposit' ? COLORS.primary : COLORS.lightGray3,
                }}>
                Deposit
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              borderBottomColor:
                type === 'successful' ? COLORS.primary : COLORS.lightGray3,
              borderBottomWidth: 1,
              paddingBottom: hp(5),
            }}>
            <Pressable onPress={() => setType('successful')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color:
                    type === 'successful' ? COLORS.primary : COLORS.lightGray3,
                }}>
                Successful
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              borderBottomColor:
                type === 'incoming' ? COLORS.primary : COLORS.lightGray3,
              borderBottomWidth: 1,
              paddingBottom: hp(5),
            }}>
            <Pressable onPress={() => setType('incoming')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color:
                    type === 'incoming' ? COLORS.primary : COLORS.lightGray3,
                }}>
                Incoming
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              borderBottomColor:
                type === 'pending' ? COLORS.primary : COLORS.lightGray3,
              borderBottomWidth: 1,
              paddingBottom: hp(5),
            }}>
            <Pressable onPress={() => setType('pending')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color:
                    type === 'pending' ? COLORS.primary : COLORS.lightGray3,
                }}>
                Pending
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              borderBottomColor:
                type === 'failed' ? COLORS.primary : COLORS.lightGray3,
              borderBottomWidth: 1,
              paddingBottom: hp(5),
            }}>
            <Pressable onPress={() => setType('failed')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color: type === 'failed' ? COLORS.primary : COLORS.lightGray3,
                }}>
                Failed
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      <View style={styles.search}>
        <TextInput
          label={'Search Transaction id'}
          value={value}
          onChangeText={value => setValue(value)}
          searchInput
        />
      </View>
      
      {
        assetTransactions?.transactions?.length < 1 && <EmptyScreen />
      }
      
      {
        assetTransactions?.transactions?.length > 1 && 
        <FlatList 
         keyExtractor={(item) => item?.id}
         data={assetTransactions?.transactions}
         renderItem={(item) => {
          return <HistoryCard data={item?.item} />
         }}
        />
      }

      <DepositModal
        modalVisible={depositModal}
        setModalVisible={() => handleDepositClose()}
      />
      <WithdrawModal
        modalVisible={withdrawModal}
        setModalVisible={() => handleWithdrawalClose()}
      />
      <SwapModal
        modalVisible={swapModal}
        setModalVisible={() => handleSwapClose()}
      />
    </View>
  );
};

export default AssetInfo;

const styles = StyleSheet.create({
  row: {},
  icon: {
    marginHorizontal: hp(5),
  },
  icons: {
    width: wp(20),
    height: hp(20),
    marginRight: hp(10),
  },
  card: {
    backgroundColor: COLORS.lightGray2,
    padding: hp(15),
    borderRadius: 10,
    marginVertical: hp(20),
  },

  body: {
    width: '50%',
  },
  btn: {
    width: '30%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(40),
  },
  search: {
    marginVertical: hp(15),
  },
});
