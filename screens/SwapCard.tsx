/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../utils/constants/theme';
import {format, hp, wp} from '../utils/helper';

import {tokenBalanceData} from '../utils/constants/tokenList';
import GlobalStyle from '../utils/globalStyle';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {getMarketPrice, marketInfo, modeStatus} from '../slice/TradeSlice';
import IconTextButton from '../components/IconTextButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SwapTokenModal from '../components/Modals/SwapTokenModal';
import {
  getTradingAccount,
  getTradingAccountByCurrency,
  tradingAccount,
} from '../slice/WalletSlice';
import SwapHeader from '../components/SwapHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { bitcoin, tether } from '../assets/images';



const SwapCard = (props: any) => {
  const [assetName, setAssetName] = useState<any>();
  const [currencyIcon, setCurrencyIcon] = useState<any>(tether);
  const [currencyName, setCurrencyName] = useState('USDT');
  const [max, setMax] = useState('');
  const [openSelectTo, setOpenSelectTo] = useState(false);
  const [openSelectFrom, setOpenSelectFrom] = useState(false);
  const [selectedAssetsTo, setSelectedAssetsTo] = useState('BTC');
  const [selectedIcon, setSelectedIcon] = useState<any>(bitcoin);
  const [selectedBalance, setSelectedBalance] = useState<any>(0);
  const tradingAccountInfo: any = useAppSelector(tradingAccount);
  const [assetData, setAssetData] = useState<any>();
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<any>();
  const modeInfo = useAppSelector(modeStatus);
  const [assetDataTo, setAssetDataTo] = useState<any>();



  const handleOpenSelectToOpen = () => {
    setOpenSelectTo(true);
  };

  const handleOpenSelectToClose = () => {
    setOpenSelectTo(false);
  };

  const handleOpenSelectFromOpen = () => {
    setOpenSelectFrom(true);
  };

  const handleOpenSelectFromClose = () => {
    setOpenSelectFrom(false);
  };

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getTradingAccount()).then(gg => {
        setAssetData(gg?.payload?.[currencyName?.toUpperCase()]);
      });
    };
    loadData();
  }, [currencyName]);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getTradingAccount()).then(gg => {
        setAssetDataTo(gg?.payload?.[selectedAssetsTo]);
      });
    };
    loadData();
  }, [selectedAssetsTo]);

  const range = [
    {
      id: 1,
      num: '25',
    },
    {
      id: 2,
      num: '50',
    },
    {
      id: 3,
      num: '75',
    },
    {
      id: 4,
      num: '100',
    },
  ];

  const handleSelectionTo = (value: any) => {
    const selectedBalance =
      tradingAccountInfo?.[value?.currency?.toUpperCase()]?.availBal;
    setSelectedAssetsTo(value?.currency?.toUpperCase());
    setSelectedIcon(value?.icon);
    setSelectedBalance(selectedBalance ? selectedBalance : 0);
    handleOpenSelectToClose();
  };

  const handleSelectionFrom = (value: any) => {
    setCurrencyName(value?.currency?.toUpperCase());
    setCurrencyIcon(value?.icon);

    handleOpenSelectFromClose();
  };

  const handleSwapChange = () => {
    setCurrencyIcon(selectedIcon);
    setCurrencyName(selectedAssetsTo);
    setSelectedAssetsTo(currencyName);
    setSelectedIcon(currencyIcon);
    setAssetData(assetDataTo);
    setAssetDataTo(assetData);
  };

  const handlePerChange = (value: any) => {
    const max = (parseInt(value) / 100) * assetData?.availBal;
    const dd = isNaN(max) ? '0' : max?.toString();
    setAmount(parseFloat(dd)?.toFixed(4));
    setMax(value);
  };

  const confirmSwapDetail = () => {
    if (selectedAssetsTo === 'Swap from' || currencyName === 'Swap to') {
      return;
    }

    return props?.navigation.navigate('ConfirmSwap', {
      info: {
        fromIcon: currencyIcon,
        fromName: currencyName,
        toIcon: selectedIcon,
        toName: selectedAssetsTo,
        amount: amount,
      },
    });
  };

  return (
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : "#1a202c"}]}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.top]}>
            <SwapHeader
              header="Swap History"
              handlePress={() => props?.navigation.navigate('SwapHistory')}
            />

            <Text style={{...FONTS.h2, textAlign: 'left'}}>Swap</Text>
            <Text style={{...FONTS.body5, textAlign: 'left'}}>
              Which crypto do you want to swap for
            </Text>

            <View style={styles.carddiv}>
              <View style={[GlobalStyle.rowBetween, styles.card]}>
                <TouchableOpacity onPress={() => handleOpenSelectFromOpen()}>
                  <View style={{width: wp(120)}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      {currencyIcon && (
                        <Image source={currencyIcon} style={styles.icons} />
                      )}

                      <Text
                        style={{
                          marginHorizontal: hp(5),
                          textTransform: 'uppercase',
                        }}>
                        {currencyName}
                      </Text>
                      <AntDesign name="down" />
                    </View>
                    <Text
                      style={{
                        ...FONTS.body5,
                        textAlign: 'left',
                        marginTop: hp(10),
                      }}>
                      Bal:{' '}
                      {assetData?.availBal
                        ? format(
                            parseFloat(assetData?.availBal)
                              ?.toFixed(4)
                              .slice(0, -1),
                          )
                        : 0}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSwapChange}>
                  <View style={styles.swap}>
                    <View style={styles.swapIcon}>
                      <AntDesign name="swap" size={20} color={COLORS.primary} />
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleOpenSelectToOpen()}>
                  <View style={{width: wp(120)}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Image source={selectedIcon} style={styles.icons} />
                      <Text
                        style={{
                          marginHorizontal: hp(5),
                          textTransform: 'uppercase',
                        }}>
                        {selectedAssetsTo}
                      </Text>
                      <AntDesign name="down" />
                    </View>
                    <Text
                      style={{
                        ...FONTS.body5,
                        textAlign: 'right',
                        marginTop: hp(10),
                      }}>
                      Bal:{' '}
                      {assetDataTo?.availBal
                        ? format(
                            parseFloat(assetDataTo?.availBal)
                              ?.toFixed(4)
                              .slice(0, -1),
                          )
                        : 0}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
      
              <View style={styles.card2}>
                <View style={{width: '78%'}}>
                  <TextInput
                    style={styles.input}
                    onChangeText={value => setAmount(value)}
                    value={amount}
                    placeholder={`Enter Amount`}
                    keyboardType="default"
                  />
                </View>
               <TouchableOpacity>
               <View style={GlobalStyle.rowStart}>
                 <Image source={currencyIcon} style={styles.icons} />
                  <Text style={{...FONTS.body4, fontWeight: "700", marginLeft: hp(5)}}>{currencyName}</Text>
                </View>
               </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: hp(10),
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                {range?.map(data => {
                  return (
                    <TouchableOpacity
                      onPress={() => handlePerChange(data?.num)}>
                      <View
                        style={{
                          borderRadius: 15,
                          backgroundColor:
                            max === data?.num
                              ? COLORS.primary
                              : COLORS.ldPrimary,
                          marginRight: hp(5),
                          borderColor: max === data?.num ? "" : COLORS.primary,
                          borderWidth: 0.4
                        }}>
                        <Text
                          style={{
                            ...FONTS.body5,
                            color:
                              max === data?.num ? COLORS.white : COLORS.black,
                            padding: hp(5),
                            width: wp(60),
                            textAlign: 'center',
                          }}>
                          {data?.num}%
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
          <IconTextButton
              label="Get a Quote"
              onPress={() => confirmSwapDetail()}
            />
            <View style={{justifyContent: 'center',flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name='infocirlce' color={COLORS.primary} />
              <Text style={{textAlign: 'center', marginLeft: hp(5), color: COLORS.primary, marginVertical: hp(10)}}>Only trading balance can be swapped</Text>
            </View>
             
          </View>

          <SwapTokenModal
            modalVisible={openSelectTo}
            setSelectedToken={(value: any) => handleSelectionTo(value)}
            setModalVisible={() => handleOpenSelectToClose()}
            selectedToken={currencyName}
          />
          <SwapTokenModal
            modalVisible={openSelectFrom}
            setSelectedToken={(value: any) => handleSelectionFrom(value)}
            setModalVisible={() => handleOpenSelectFromClose()}
            selectedToken={currencyName}
          />
        </View>
      </View>
      </KeyboardAwareScrollView>

    </View>
  );
};

export default SwapCard;

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
    marginVertical: hp(20),
  },
  card2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(15),
    backgroundColor: COLORS.ldPrimary,
    paddingHorizontal: hp(25),
    paddingVertical: hp(10),
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 0.4
  },

  input: {
    height: 40,
  },
  top: {
    flex: 5,
  },
  bottom: {
    flex: 1,
    marginTop: hp(-50)
  },
  card: {
    paddingHorizontal: hp(10),
    paddingVertical: hp(10),
    borderColor: COLORS.primary,
    backgroundColor: COLORS.ldPrimary,
    borderWidth: 0.4,
    borderRadius: 15,
  },
  carddiv: {
    marginVertical: hp(20),
  },
  swap: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(80),
  },
  swapIcon: {
    backgroundColor: COLORS.primary2,
    borderRadius: 50,
    padding: hp(5),
    borderColor: COLORS.primary,
    borderWidth: 1
  },
  swaps: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray3,
    borderRadius: 10,
    paddingHorizontal: hp(10),
    paddingVertical: hp(5),
  },
});
