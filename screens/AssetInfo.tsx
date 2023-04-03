/* eslint-disable react-native/no-inline-styles */
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

import TransactionDetailModal from '../components/Modals/TransactionDetail';

import { TextInput } from '../components/TextInput';
import Pagination from '../components/Pagination';

const AssetInfo = (props: any) => {
  const [assetData, setAssetData] = useState<any>();
  const assetName = props.route?.params?.name;
  const asset = props.route?.params?.currency;
  const assetType = props.route?.params?.assetType;
  const iconData = props.route?.params?.icon;
  const [type, setType] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState<any>();
  const [value, setValue] = useState("")
  const [page, setPage] = useState(1)

  const handleModalClose = () => {
    setModalVisible(false);
    setDetails(null);
  };

  const handleModalOpen = (data: any) => {
    setModalVisible(true);
    setDetails(data);
  };


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
      page: page,
      currency: asset,
      type: type,
    };

    dispatch(getAssetTransaction(payload)).then(dd =>
      setAssetTransaction(dd?.payload),
    );
  }, [asset, type, page]);


  const filterTransaction = assetTransactions?.transactions?.filter((data: any) => data?._id?.toLowerCase().includes(value?.toLowerCase()))

  const handlePagination = (data: any) => {
    if(data === "next") {
     setPage(assetTransactions?.nextPage) 
    }
    else {
     setPage(assetTransactions?.page - 1) 
    }
   }

  return (
    <View style={GlobalStyle.container}>
      <View style={GlobalStyle.rowBetween}>
        <AntDesign
          name="arrowleft"
          size={hp(25)}
          onPress={() => props.navigation.goBack()}
        />
        <Text style={{...FONTS.h2, fontWeight: '600'}}>{assetName}</Text>
        <Image source={iconData} style={styles.icon} />
      </View>
      <View style={styles.walletCard}>
        <View>
        <Text
            style={{
              textAlign: 'center',
              ...FONTS.body3,
              color: COLORS.gray2,
            }}>
            Total Balance
          </Text>
          <Text style={{textAlign: 'center', fontWeight: '600', ...FONTS.h1, color: COLORS.black, marginVertical: hp(5)}}>
          {`${assetData === undefined ? 0 :
              `${format(
                parseFloat(assetData[asset?.toUpperCase()]?.balance || 0).toFixed(4),
              )}`}`}

          </Text>
        </View>
        <View style={[GlobalStyle.rowBetween, styles.innerContainer]}>
        <View>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.successGreen,
                textAlign: 'center',
              }}>
              Available
            </Text>
            <Text style={{...FONTS.body3, color: COLORS.black, textAlign: 'center'}}>
              {assetData &&
                `${format(
                  parseFloat(assetData[asset?.toUpperCase()]?.availBal || 0).toFixed(
                    4,
                  ),
                )} ${asset?.toUpperCase()} `}
            </Text>
          </View>
        <View>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.warning,
                textAlign: 'center',
              }}>
              Pending
            </Text>
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.body3,
                color: COLORS.black,
              }}>
              {assetData &&
                `${format(
                  parseFloat(
                    assetData[asset?.toUpperCase()]?.pendingBal || 0
                  ).toFixed(4),
                )}`}
            </Text>
          </View>
        </View>
      </View>
      <View style={GlobalStyle.rowBetween}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Deposit')}>
        <View>
          <View style={styles.darkBtn}>
            <AntDesign  name="arrowdown" size={20} color={COLORS.white} />
            <Text style={[styles.txt, {...FONTS.body5, color: COLORS.white, marginLeft: hp(2)}]}>
            Deposit
          </Text>
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('SwapCard')}>
        <View>
          <View style={styles.lightBtn}>
          <AntDesign  name="swap" size={20} color={COLORS.primary} />
            <Text style={[styles.txt, {...FONTS.body5, color: COLORS.primary, marginLeft: hp(2)}]}>
            Swap
          </Text>
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Withdraw')}>
        <View>
          <View style={styles.darkBtn}>
          <AntDesign  name="arrowup" size={20} color={COLORS.white} />
            <Text style={[styles.txt, {...FONTS.body5, color: COLORS.white, marginLeft: hp(2)}]}>
            Withdraw
          </Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>


      <View style={[GlobalStyle.rowStart, {marginTop: hp(30), marginBottom: hp(20)}]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
               width: wp(70),
              borderColor: type === 'all' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'all' ? 1 : 1,
              //  borderColor: COLORS.primary,
               borderRadius: hp(20),
              marginRight: hp(10),
              padding: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('all')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color: type === 'all' ? COLORS.primary : 'rgb(128, 128, 128)',
                }}>
                All
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              // backgroundColor:
              //   type === 'withdraw' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              borderColor: type === 'withdraw' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'withdraw' ? 1 : 1,
               borderRadius: hp(20),
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('withdraw')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'withdraw' ? COLORS.primary : COLORS.gray1,
                }}>
                Withdraw
              </Text>
            </Pressable>
          </View>
          <View
            style={{
               width: wp(100),
              // backgroundColor:
              //   type === 'deposit' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
               borderRadius: hp(20),
              borderColor: type === 'deposit' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'deposit' ? 1 : 1,
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('deposit')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'deposit' ? COLORS.primary : COLORS.gray,
                }}>
                Deposit
              </Text>
            </Pressable>
          </View>
          <View
            style={{
               width: wp(100),
              // backgroundColor:
              //   type === 'successful' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
               borderRadius: hp(20),
              borderColor: type === 'successful' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'successful' ? 1 : 1,
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('successful')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'successful' ? COLORS.primary : COLORS.gray,
                }}>
                Successful
              </Text>
            </Pressable>
          </View>
          <View
            style={{
               width: wp(100),
              // backgroundColor:
              //   type === 'incoming' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
                 marginRight: hp(10),
              borderRadius: hp(20),
              borderColor: type === 'incoming' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'incoming' ? 1 : 1,
              padding: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('incoming')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'incoming' ? COLORS.primary : COLORS.gray,
                }}>
                Incoming
              </Text>
            </Pressable>
          </View>
          <View
            style={{
               width: wp(100),
              // backgroundColor:
              //   type === 'pending' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              //   marginRight: hp(10),
               borderRadius: hp(20),
              borderColor: type === 'pending' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'pending' ? 1 : 1,
              marginRight: hp(10),
              padding: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('pending')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'pending' ? COLORS.primary : COLORS.gray,
                }}>
                Pending
              </Text>
            </Pressable>
          </View>
          <View
            style={{
               width: wp(100),
              // backgroundColor:
              //   type === 'failed' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              borderRadius: hp(20),
              //   marginRight: hp(10),
                borderColor: type === 'failed' ? COLORS.primary : COLORS.gray,
                borderWidth: type === 'failed' ? 1 : 1,
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('failed')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color: type === 'failed' ? COLORS.primary : COLORS.gray,
                }}>
                Failed
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
      <View style={styles.search}>
              <TextInput
                label={'Search transaction by id'}
                value={value}
                onChangeText={(value: any) => setValue(value)}
                searchInput
                style={{backgroundColor: COLORS.white}}
              />
            </View>


      {
        assetTransactions?.transactions?.length < 1 && <EmptyScreen />
      }

<View style={{marginBottom: hp(550)}}>
      {
        assetTransactions?.transactions?.length > 0 &&
        <FlatList
         keyExtractor={(item) => item?.id}
         showsVerticalScrollIndicator={false}
         data={filterTransaction}
         renderItem={(item) => {
          return <HistoryCard data={item?.item} handleClick={(data: any) => handleModalOpen(data)} />;
         }}
        />
      }
           <Pagination data={assetTransactions} handlePagination={(data:any) => handlePagination(data)} />
</View>

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
    alignItems: 'flex-end',
  },
  innerContainer: {
    marginHorizontal: hp(25),
    marginTop: hp(20),
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
  walletCard: {
    minHeight: hp(150),
    backgroundColor: '#f1f1f1',
    borderRadius: 15,
    marginVertical: hp(20),
    padding: hp(25),
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
  darkBtn: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: hp(10),
    width: wp(100),
    height: hp(45),
    borderRadius: 5,
  },
  lightBtn: {
    backgroundColor: 'rgb(226, 230, 253)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: hp(10),
    width: wp(100),
    height: hp(45),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  search: {
    marginVertical: hp(5),
  },

});
