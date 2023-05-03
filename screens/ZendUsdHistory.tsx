/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  Modal,
  RefreshControl
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyle from '../utils/globalStyle';
import {COLORS, FONTS} from '../utils/constants/theme';
import {copyToClipboard, hp, wp} from '../utils/helper';
import HeaderComponent from '../components/HeaderComponent';
import {TextInput} from '../components/TextInput';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {getUsdHistory, modeStatus} from '../slice/TradeSlice';
import {userState} from '../slice/AuthSlice';
import EmptyScreen from '../components/EmptyScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import moment  from 'moment';
// import Pagination from '../components/Pagination';

const ZendUsdHistory = ({navigation}: any) => {
  const [type, setType] = useState('all');
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const userStateInfo = useAppSelector(userState);
  const [refreshing, setRefreshing] = useState(false);
  const [usdData, setUsdData] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dataInfo, setDataInfo] = useState<any>();
  const modeInfo = useAppSelector(modeStatus);
  // const [page, setPage] = useState(1)


  const getUserInfo = userStateInfo?.userData
    ? userStateInfo?.userData
    : userStateInfo;

  useEffect(() => {
    const payload = {
      page: 1,
      status: type === 'all' ? '' : type === 'pending' ? 'submitted' : type,
      id: value?.length <= 0 ? '' : value,
      userId: getUserInfo?._id,
    };
    dispatch(getUsdHistory(payload)).then(pp => setUsdData(pp?.payload?.data));
  }, [type, value]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    const payload = {
      page: 1,
      status: type === 'all' ? '' : type === 'pending' ? 'submitted' : type,
      id: value?.length <= 0 ? '' : value,
      userId: getUserInfo?._id,
    };
    dispatch(getUsdHistory(payload)).then(pp => setUsdData(pp?.payload?.data));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleModalOpen = (data: any) => {
    setModalOpen(true);
    setDataInfo(data);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setDataInfo(null);
  };

  const transactionCardBox = (item: any) => {
    return (
      <TouchableOpacity onPress={() => handleModalOpen(item)}>
        <View
          style={[
            GlobalStyle.rowBetween,
            {
              padding: hp(10),
              borderColor: COLORS.lightGray3,
              borderWidth: 0.5,
              marginBottom: hp(15),
              borderRadius: 8,
            },
          ]}>
          <View style={GlobalStyle.rowStart}>
            <View
              style={{
                marginRight: hp(10),
                backgroundColor:
                  item?.status === 'submitted'
                    ? COLORS.lightOrange
                    : item?.status === 'approved'
                    ? COLORS.lightGreen
                    : item?.status === 'rejected'
                    ? 'rgb(241, 241, 241)'
                    : '',
                width: wp(30),
                height: hp(30),
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="dollar"
                color={
                  item?.status === 'submitted'
                    ? COLORS.orange
                    : item?.status === 'approved'
                    ? COLORS.darkGreen
                    : item?.status === 'rejected'
                    ? COLORS.red
                    : ''
                }
              />
            </View>
            <View>
              <Text>ZEND USD</Text>
              <Text>{moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
            </View>
          </View>
          <View>
            <Text style={{textAlign: 'right'}}>${item?.amount}</Text>
            <Text
              style={{
                ...FONTS.body5,
                textTransform: 'capitalize',
                color:
                  item?.status === 'submitted'
                    ? COLORS.orange
                    : item?.status === 'approved'
                    ? COLORS.darkGreen
                    : item?.status === 'rejected'
                    ? COLORS.red
                    : '',
              }}>
              {item?.status === 'submitted' ? 'Pending' : item?.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // const handlePagination = (data: any) => {
  //   if(data === "next") {
  //    setPage(usdData?.nextPage) 
  //   }
  //   else {
  //    setPage(usdData?.page - 1) 
  //   }
  //  }

 

  return (
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
      <View style={styles.margin} />
      <HeaderComponent onPress={() => navigation.goBack()} />
      <Text style={{...FONTS.h3, fontWeight: '600',color:modeInfo ? COLORS.black : COLORS.white}}>Zend Usd History</Text>
      <View
        style={[
          GlobalStyle.rowStart,
          {marginTop: hp(30), marginBottom: hp(20)},
        ]}>
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
              borderColor: type === 'approved' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'approved' ? 1 : 1,
              borderRadius: hp(20),
              marginRight: hp(10),
              padding: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('approved')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color: type === 'approved' ? COLORS.primary : COLORS.gray1,
                }}>
                Approved
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
                  color: type === 'pending' ? COLORS.primary : COLORS.gray,
                }}>
                Pending
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
              borderColor: type === 'rejected' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'rejected' ? 1 : 1,
              marginRight: hp(10),
              padding: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('rejected')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color: type === 'rejected' ? COLORS.primary : COLORS.gray,
                }}>
                Rejected
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
      <View style={styles.hr}></View>
      <View>
        <TextInput
          label={'Search transaction by id'}
          value={value}
          onChangeText={(value: any) => setValue(value)}
          searchInput
          style={{backgroundColor: !modeInfo ? COLORS.darkMode : COLORS.ldPrimary}}
        />
      </View>

      {usdData?.transactions?.length < 1 && <EmptyScreen />}

      <View style={{marginBottom: hp(280)}}>
      {/* <Pagination data={usdData} handlePagination={(data:any) => handlePagination(data)} /> */}

        <FlatList
          keyExtractor={item => item?.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{flexGrow: 1}}
          data={usdData?.transactions}
          renderItem={({item}: any) => {
            return transactionCardBox(item);
          }}
        />
      </View>

      <View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalOpen}
            onDismiss={() => {
              handleModalClose();
            }}
            onRequestClose={() => {
              handleModalClose();
            }}>
            <View style={styles.centeredView}>
              <View style={[styles.modalView, {backgroundColor: modeInfo ? COLORS.white : COLORS.darkMode}]}>
                <TouchableOpacity onPress={() => handleModalClose()}>
                  <View style={styles.end}>
                    <AntDesign name="close" size={30} color={modeInfo ? COLORS.black : COLORS.white}  />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    ...FONTS.body3,
                    textAlign: 'center',
                    fontWeight: '700',
                    marginBottom: hp(20),
                    color:modeInfo ? COLORS.black : COLORS.white
                  }}>
                  Transaction Details
                </Text>

                <View>
                  <View
                    style={[GlobalStyle.rowBetween, {marginVertical: hp(10)}]}>
                    <View style={GlobalStyle.rowStart}>
                      <View
                        style={{
                          width: wp(40),
                          height: hp(40),
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: hp(20),
                          borderRadius: 50,
                          backgroundColor:
                            dataInfo?.status === 'approved'
                              ? COLORS.lightGreen
                              : dataInfo?.status === 'submitted'
                              ? COLORS.lightOrange
                              : dataInfo?.status === 'rejected'
                              ? 'rgb(241, 241, 241)'
                              : '',
                        }}>
                        <FontAwesome
                          name={'dollar'}
                          size={15}
                          color={
                            dataInfo?.status === 'success'
                              ? COLORS.darkGreen
                              : dataInfo?.status === 'submitted'
                              ? COLORS.orange
                              : dataInfo?.status === 'rejected'
                              ? COLORS.red
                              : ''
                          }
                        />
                      </View>
                      <View>
                        <Text
                          style={{textTransform: 'uppercase', ...FONTS.body4, color:modeInfo ? COLORS.black : COLORS.white}}>
                          ZEND USD
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{...FONTS.body5, color:modeInfo ? COLORS.black : COLORS.white}}>Amount</Text>
                      <Text style={{...FONTS.body5, fontWeight: '600',  color:modeInfo ? COLORS.black : COLORS.white}}>
                        ${dataInfo?.amount}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text style={{...FONTS.body5, color:modeInfo ? COLORS.black : COLORS.white}}>Transaction ID</Text>
                    <View style={GlobalStyle.rowBetween}>
                      <Text style={{...FONTS.body3, marginRight: hp(30), width: wp(200), color:modeInfo ? COLORS.black : COLORS.white}}>
                        {dataInfo?._id}
                      </Text>
                      <Feather
                        name="copy"
                        size={20}
                        color={modeInfo ? COLORS.black : COLORS.white}
                        onPress={() => copyToClipboard(dataInfo?._id)}
                      />
                    </View>
                  </View>

                  <View>
                    <View style={styles.mt}>
                      <Text
                        style={{
                          textTransform: 'capitalize',
                          ...FONTS.body4,
                          color:modeInfo ? COLORS.gray : COLORS.white
                        }}>
                        Rate:
                      </Text>
                      <Text
                        style={{...FONTS.body3, textTransform: 'capitalize', color:modeInfo ? COLORS.black : COLORS.white}}>
                        {dataInfo?.rate?.rate}
                      </Text>
                    </View>
                  </View>

                  <View style={{marginTop: hp(10)}}>
                    <Text style={{...FONTS.h4, fontWeight: '600', color:modeInfo ? COLORS.black : COLORS.white}}>
                      Beneficiary Details
                    </Text>
                    <View style={{borderColor: COLORS.lightGray3, borderWidth: 0.5, borderRadius: 8, padding: hp(10), marginTop: hp(5)}}>
                      <View style={[GlobalStyle.rowStart, {paddingVertical: hp(10)}]}>
                        <Text style={{width: wp(100), color:modeInfo ? COLORS.black : COLORS.white}}>Name: </Text>
                        <Text style={{...FONTS.body5, marginRight: hp(20), fontWeight: 'bold', color:modeInfo ? COLORS.black : COLORS.white}}>{dataInfo?.beneficiary?.name}</Text>
                      </View>
                      <View style={[GlobalStyle.rowStart, {paddingVertical: hp(10)}]}>
                        <Text style={{width: wp(100), color:modeInfo ? COLORS.black : COLORS.white}}>Account No: </Text>
                        <Text style={{...FONTS.body5, marginRight: hp(20), fontWeight: 'bold', color:modeInfo ? COLORS.black : COLORS.white}}>{dataInfo?.beneficiary?.bankAccountNumber}</Text>
                      </View>
                      <View style={[GlobalStyle.rowStart, {paddingVertical: hp(10)}]}>
                        <Text style={{width: wp(100), color:modeInfo ? COLORS.black : COLORS.white}}>Country: </Text>
                        <Text style={{...FONTS.body5, marginRight: hp(20), fontWeight: 'bold', color:modeInfo ? COLORS.black : COLORS.white}}>{dataInfo?.beneficiary?.country}</Text>
                      </View>
                      <View style={[GlobalStyle.rowStart, {paddingVertical: hp(10)}]}>
                        <Text style={{width: wp(100), color:modeInfo ? COLORS.black : COLORS.white}}>Bank Name: </Text>
                        <Text style={{...FONTS.body5, marginRight: hp(20), fontWeight: 'bold', color:modeInfo ? COLORS.black : COLORS.white}}>{dataInfo?.beneficiary?.bankName}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={GlobalStyle.rowBetween}>
                    <View style={[styles.mt, {width: wp(150)}]}>
                      <Text
                        style={{
                          textTransform: 'capitalize',
                          ...FONTS.body4,
                          color:modeInfo ? COLORS.gray : COLORS.white
                        }}>
                        Date:
                      </Text>
                      <Text
                        style={{...FONTS.body5, textTransform: 'capitalize', color:modeInfo ? COLORS.black : COLORS.white}}>
                        {moment(dataInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                      </Text>
                    </View>

                    <View style={styles.mt}>
                      <Text
                        style={{
                          textTransform: 'capitalize',
                          ...FONTS.body4,
                          color:modeInfo ? COLORS.gray : COLORS.white
                        }}>
                        Transaction Status:
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body3,
                          textAlign: 'right',
                          color:
                            dataInfo?.status === 'approved'
                              ? COLORS.darkGreen
                              : dataInfo?.status === 'submitted'
                              ? COLORS.orange
                              : dataInfo?.status === 'rejected'
                              ? COLORS.red
                              : '',
                          textTransform: 'capitalize',
                        }}>
                        {dataInfo?.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default ZendUsdHistory;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparentBlack,
  },
  end: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalView: {
    margin: 20,
    // height: hp(600),
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
  margin: {
    // marginVertical: 20,
  },
  mt: {
    marginTop: hp(20),
  },
  icon: {
    marginVertical: 20,
  },
  hr: {
    width: '100%',
    height: hp(2),
    backgroundColor: COLORS.lightGray2,
    marginVertical: hp(15),
  },
  actionCard2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(10),
    paddingBottom: hp(10),
  },
  icons: {
    width: wp(40),
    height: hp(40),
    backgroundColor: COLORS.primary2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
