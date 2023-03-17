/* eslint-disable no-trailing-spaces */
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SwapTokenModal from '../components/Modals/SwapTokenModal';
import {tether} from '../assets/images';
import {
  getTradingAccount,
  getTradingAccountByCurrency,
  tradingAccount,
} from '../slice/WalletSlice';
import SwapHeader from '../components/SwapHeader';

const SwapCard = (props: any) => {
  const [assetName, setAssetName] = useState(props.route?.params?.info?.token);
  const [currencyIcon, setCurrencyIcon] = useState(props.route?.params?.info?.icon);
  const [currencyName, setCurrencyName] = useState(props.route?.params?.info?.currency);
  const [max, setMax] = useState('');
  const [openSelectTo, setOpenSelectTo] = useState(false);
  const [openSelectFrom, setOpenSelectFrom] = useState(false);
  const [selectedAssetsTo, setSelectedAssetsTo] = useState('Swap to');
  const [selectedIcon, setSelectedIcon] = useState<any>();
  const [selectedBalance, setSelectedBalance] = useState<any>(0);
  const tradingAccountInfo: any = useAppSelector(tradingAccount);
  const [assetData, setAssetData] = useState<any>();
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<any>()

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
     setCurrencyIcon(selectedIcon)
     setCurrencyName(selectedAssetsTo)
     setSelectedAssetsTo(currencyName)
     setSelectedIcon(currencyIcon)
     setAssetData(assetDataTo)
     setAssetDataTo(assetData)
  }

  const handlePerChange = (value: any) => {
    const max = (parseInt(value) / 100) * assetData?.availBal
    setAmount(isNaN(max) ? "0" : max?.toString())
    setMax(value)
   
  }



  return (
    <View style={GlobalStyle.container}>
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
                <View style={{ width: wp(120)}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Image source={currencyIcon} style={styles.icons} />
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
                      ? format(parseFloat(assetData?.availBal)?.toFixed(2))
                      : 0}
                  </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSwapChange()}>
                  <View style={styles.swap}>
                    <View style={styles.swapIcon}>
                      <AntDesign name="swap" size={20} color={COLORS.primary} />
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleOpenSelectToOpen()}>
                  <View style={{ width: wp(120)}}>
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
                        ? format(parseFloat(assetDataTo?.availBal)?.toFixed(2))
                        : 0}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{marginTop: hp(20), flexDirection: 'row'}}>
                <View style={{width: "100%"}}>
                <TextInput  
                    placeholderTextColor={COLORS.black}
                    placeholder='Enter Amount'
                   inputMode="numeric"
                    keyboardType='number-pad'
                    value={amount}
                    onChangeText={value => setAmount(value)}
                    style={{ backgroundColor: COLORS.primary2 }}               />
                </View>
               
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: hp(10),
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}>
                {range?.map(data => {
                  return (
                    <TouchableOpacity onPress={() => handlePerChange(data?.num)}>
                      <View
                        style={{
                          borderRadius: 15,
                          backgroundColor:
                            max === data?.num
                              ? COLORS.primary
                              : COLORS.primary2,
                          marginRight: hp(5),
          
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
            <IconTextButton label="Get a Quote" />
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
  top: {
    flex: 5,
  },
  bottom: {
    flex: 1,
  },
  card: {
    paddingHorizontal: hp(10),
    paddingVertical: hp(10),
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary2,
    borderWidth: 1,
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
    padding: hp(10),
  },
  swaps: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray3,
    borderRadius: 10,
    paddingHorizontal: hp(10),
    paddingVertical: hp(5),
  }
});
