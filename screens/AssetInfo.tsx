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

import {useAppDispatch} from '../app/hooks';
import {
  getAssetTransaction,
  getFundingAccountByCurrency,
  getTradingAccountByCurrency,
} from '../slice/WalletSlice';
import EmptyScreen from '../components/EmptyScreen';
import HistoryCard from '../components/HistoryCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { arrowDown, arrowUp, eye, swaps } from '../assets/images';
import TransactionDetailModal from '../components/Modals/TransactionDetail';

const AssetInfo = (props: any) => {
  const [assetData, setAssetData] = useState<any>();
  const assetName = props.route?.params?.name;
  const asset = props.route?.params?.currency;
  const assetType = props.route?.params?.assetType;
  const iconData = props.route?.params?.icon;
  const [show, setShow] = useState(false)
  const [type, setType] = useState('all');
  const [modalVisible, setModalVisible] = useState(false)
  const [details, setDetails] = useState<any>()
  
  const handleModalClose = () => {
    setModalVisible(false)
    setDetails(null)
  }

  const handleModalOpen = (data: any) => {
    setModalVisible(true)
    setDetails(data)
  }


  const dispatch = useAppDispatch();
  const [assetTransactions, setAssetTransaction] = useState<any>();

  useEffect(() => {
    if (assetType === 'funding') {
      dispatch(getFundingAccountByCurrency(asset)).then(dd =>
        setAssetData(dd?.payload),
      );
    } else {
      dispatch(getTradingAccountByCurrency(asset)).then(dd =>
        setAssetData(dd?.payload),
      );
    }
  
  }, [asset]);

 
  useEffect(() => {
    const payload = {
      currency: asset,
      type: type
    };

    dispatch(getAssetTransaction(payload)).then(dd =>
      setAssetTransaction(dd?.payload),
    )
  }, [asset, type])



  return (
    <View style={GlobalStyle.container}>
      <View style={GlobalStyle.rowBetween}>
        <AntDesign
          name="arrowleft"
          size={hp(25)}
          onPress={() => props.navigation.goBack()}
        />
        <Text style={{...FONTS.h2, fontWeight: 'bold'}}>{assetName}</Text>
        <Image source={iconData} style={styles.icon} />
      </View>

      <View style={styles.cards}>
        <View style={GlobalStyle.rowAround}>
          <View>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.white,
              }}>
              Available
            </Text>
            <Text style={{...FONTS.body5, color: COLORS.white}}>
              {assetData &&
                `${format(
                  parseFloat(assetData[asset?.toUpperCase()]?.availBal).toFixed(
                    4,
                  ),
                )} ${asset?.toUpperCase()} `}
            </Text>
          </View>
          <View>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.white,
              }}>
              Pending
            </Text>
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.body5,
                color: COLORS.white,
              }}>
              {assetData &&
                `${format(
                  parseFloat(
                    assetData[asset?.toUpperCase()]?.pendingBal,
                  ).toFixed(4),
                )}`}
            </Text>
          </View>
        </View>
        <View style={[GlobalStyle.rowBetween, {marginTop: hp(10)}]}>
              <View></View>
              <View>
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.body5,
              color: COLORS.white,
            }}>
            Total Balance
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold', ...FONTS.h1, color: COLORS.white,}}>
          {show ? `${assetData &&
              `$${format(
                parseFloat(assetData[asset?.toUpperCase()]?.balance).toFixed(4),
              )}`}` : '$-------'}
           
          </Text>
        </View>
        <View style={styles.eyeDiv}>
            {
              !show ? <Ionicons name='eye-off-outline' onPress={() => setShow(!show)} color={'white'} size={22} /> :
                <Pressable onPress={() => setShow(!show)}>
                  <Image source={eye}  />
                </Pressable>
            }
          </View>
        </View>
        <View style={styles.rowC}>
                <View style={styles.rowC2}>
                  <TouchableOpacity onPress={() => props.navigation.navigate("Deposit")}>
                    <View>
                      <View style={styles.sub}>
                        <Image source={arrowDown} />
                      </View>
                      <Text style={[styles.txt, {...FONTS.body5, color: COLORS.white}]}>
                        Deposit
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => props.navigation.navigate("Swap")}>
                    <View>
                      <View style={styles.sub}>
                        <Image source={swaps} />
                      </View>
                      <Text style={[styles.txt, {...FONTS.body5,  color: COLORS.white}]}>
                        Swap
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => props.navigation.navigate("Withdraw")}>
                    <View>
                      <View style={styles.sub}>
                        <Image source={arrowUp} />
                      </View>
                      <Text style={[styles.txt, {...FONTS.body5, color: COLORS.white,}]}>
                        Withdraw
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
      </View>

      <View style={[GlobalStyle.rowStart, {marginTop: hp(30), marginBottom: hp(20)}]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              width: wp(70),
              backgroundColor: type === 'all' ? COLORS.primary : COLORS.white,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: hp(20),
              marginRight: hp(10),
              padding: hp(10),
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('all')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color: type === 'all' ? COLORS.white : COLORS.primary,
                }}>
                All
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              backgroundColor:
                type === 'withdraw' ? COLORS.primary : COLORS.white,
               borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: hp(20),
                marginRight: hp(10),
                padding: hp(10),
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('withdraw')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'withdraw' ? COLORS.white : COLORS.primary,
                }}>
                Withdraw
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              backgroundColor:
                type === 'deposit' ? COLORS.primary : COLORS.white,
               borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: hp(20),
                marginRight: hp(10),
                padding: hp(10),
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('deposit')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'deposit' ? COLORS.white : COLORS.primary,
                }}>
                Deposit
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              backgroundColor:
                type === 'successful' ? COLORS.primary : COLORS.white,
               borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: hp(20),
                marginRight: hp(10),
                padding: hp(10),
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('successful')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'successful' ? COLORS.white : COLORS.primary,
                }}>
                Successful
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              backgroundColor:
                type === 'incoming' ? COLORS.primary : COLORS.white,
               borderColor: COLORS.primary,
              borderWidth: 1,
                marginRight: hp(10),
              borderRadius: hp(20),
              padding: hp(10),
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('incoming')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'incoming' ? COLORS.white : COLORS.primary,
                }}>
                Incoming
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              backgroundColor:
                type === 'pending' ? COLORS.primary : COLORS.white,
               borderColor: COLORS.primary,
              borderWidth: 1,
                marginRight: hp(10),
              borderRadius: hp(20),
              padding: hp(10),
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('pending')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'pending' ? COLORS.white : COLORS.primary,
                }}>
                Pending
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              backgroundColor:
                type === 'failed' ? COLORS.primary : COLORS.white,
               borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: hp(20),
                marginRight: hp(10),
                padding: hp(10),
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('failed')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color: type === 'failed' ? COLORS.white : COLORS.primary,
                }}>
                Failed
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      {
        assetTransactions?.transactions?.length < 1 && <EmptyScreen />
      }
      
      {
        assetTransactions?.transactions?.length > 1 && 
        <FlatList 
         keyExtractor={(item) => item?.id}
         showsVerticalScrollIndicator={false}
         data={assetTransactions?.transactions}
         renderItem={(item) => {
          return <HistoryCard data={item?.item} handleClick={(data: any) => handleModalOpen(data)} />
         }}
        />
      }


<TransactionDetailModal modalVisible={modalVisible} setModalVisible={() => handleModalClose()} data={details} />
    </View>
  );
};

export default AssetInfo;

const styles = StyleSheet.create({
  icon: {
    width: wp(30),
    height: hp(30),
    marginRight: hp(10),
  },
  cards: {
    backgroundColor: COLORS.primary,
    padding: hp(25),
    borderRadius: 30,
    marginVertical: hp(20),
  },
  eyeDiv: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  rowC: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(20),
  },
  rowC2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: wp(200),
  },
  sub: {
    backgroundColor: '#A5B1F3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(10),
    width: wp(50),
    height: hp(50),
    borderRadius: 50,
  },
  txt: {
    textAlign: 'center',
    color: COLORS.white,
  },
});
