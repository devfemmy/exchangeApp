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
import { tether } from '../assets/images';

const SwapCard = (props: any) => {
  const assetName = props.route?.params?.info?.token;
  const currencyIcon = props.route?.params?.info?.icon;
  const currencyName = props.route?.params?.info?.currency;
  const [max, setMax] = useState('');
  const [openSelectTo, setOpenSelectTo] = useState(false);
  const [selectedAssetsTo, setSelectedAssetsTo] = useState('USDT');
  const [selectedIcon, setSelectedIcon] = useState(tether )

  const handleOpenSelectToOpen = () => {
    setOpenSelectTo(true);
  };

  const handleOpenSelectToClose = () => {
    setOpenSelectTo(false);
  };

  const range = [
    {
      id: 1,
      num: '25%',
    },
    {
      id: 2,
      num: '50%',
    },
    {
      id: 3,
      num: '75%',
    },
    {
      id: 4,
      num: '100%',
    },
  ];

  const handleSelectionTo = (value: any) => {
    setSelectedAssetsTo(value?.currency?.toUpperCase());
    setSelectedIcon(value?.icon)
    handleOpenSelectToClose();
  };

  return (
    <View style={GlobalStyle.container}>
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.top]}>
            <View style={[GlobalStyle.rowBetween, {marginBottom: hp(20)}]}>
              <AntDesign
                name="arrowleft"
                size={30}
                onPress={() => props.navigation.goBack()}
              />
              <TouchableOpacity>
                <View style={styles.swaps}>
                  <Text style={{marginRight: hp(5)}}>Swap History</Text>
                  <MaterialIcons name="history" size={20} />
                </View>
              </TouchableOpacity>
            </View>

            <Text style={{...FONTS.h2, textAlign: 'left'}}>Swap</Text>
            <Text style={{...FONTS.body5, textAlign: 'left'}}>
              Which crypto do you want to swap for
            </Text>

            <View style={styles.carddiv}>
              <View style={[GlobalStyle.rowBetween, styles.card]}>
                <View>
                  <View style={GlobalStyle.rowStart}>
                    <Text>0</Text>
                    <View
                      style={{
                        backgroundColor: COLORS.primary,
                        padding: hp(3),
                        marginLeft: hp(10),
                        borderRadius: 10,
                        width: wp(80),
                      }}>
                      <Text
                        style={{
                          ...FONTS.body5,
                          color: COLORS.white,
                          textAlign: 'center',
                        }}>
                        Swap max
                      </Text>
                    </View>
                  </View>
                  <Text style={{...FONTS.body5, marginTop: hp(10)}}>From</Text>
                </View>
                <View>
                  <View style={GlobalStyle.rowStart}>
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
                  <Text style={{...FONTS.body5, marginTop: hp(10)}}>
                    Balance: $100
                  </Text>
                </View>
              </View>

              <View style={styles.swap}>
                <View style={styles.swapIcon}>
                  <AntDesign name="swap" size={20} color={COLORS.primary} />
                </View>
              </View>

              <View style={[GlobalStyle.rowBetween, styles.card]}>
                <View>
                  <View style={GlobalStyle.rowStart}>
                    <Text>0</Text>
                  </View>
                  <Text style={{...FONTS.body5, marginTop: hp(10)}}>
                    Receive
                  </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => handleOpenSelectToOpen()}>
                    <View style={GlobalStyle.rowStart}>
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
                  </TouchableOpacity>

                  <Text style={{...FONTS.body5, marginTop: hp(10)}}>
                    Balance: $100
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: hp(20),
                }}>
                {range?.map(data => {
                  return (
                    <TouchableOpacity onPress={() => setMax(data?.num)}>
                      <View
                        style={{
                          borderRadius: 15,
                          backgroundColor:
                            max === data?.num
                              ? COLORS.primary
                              : COLORS.primary2,
                          marginRight: hp(20),
                        }}>
                        <Text
                          style={{
                            ...FONTS.body3,
                            color:
                              max === data?.num ? COLORS.white : COLORS.black,
                            padding: hp(5),
                            width: wp(60),
                            textAlign: 'center',
                          }}>
                          {data?.num}
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
    paddingHorizontal: hp(30),
    paddingVertical: hp(20),
    borderColor: COLORS.primary,
    backgroundColor: '#FAFBFF',
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
  },
});
