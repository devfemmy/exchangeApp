/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  RefreshControl,
  Platform,
  ImageBackground
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MainLayout from './mainLayout';
import GlobalStyle from '../utils/globalStyle';

import {useAppDispatch, useAppSelector} from '../app/hooks';
import {getProfile, userState} from '../slice/AuthSlice';
import {format, hp, wp} from '../utils/helper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {arrowDown, arrowUp, eye, swaps} from '../assets/images';
import Header from '../components/Header';
import {COLORS, FONTS} from '../utils/constants/theme';
import {tokenBalanceData} from '../utils/constants/tokenList';
import {getMarketPrice, marketInfo, modeStatus} from '../slice/TradeSlice';
import {
  fundingAccount,
  getFundingAccount,
  getTradingAccount,
  tradingAccount,
} from '../slice/WalletSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TransferIcon from '../assets/svg/transferMobile.svg';
import io from "socket.io-client"
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../slice/config';

const Home = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const userStateInfo = useAppSelector(userState);
  const modeInfo = useAppSelector(modeStatus);
  const marketInfos = useAppSelector(marketInfo) as any;
  const [show, setShow] = useState(false);
  const [tradingAccountInfo, setTradingAccountInfo] = useState<any>();
  const [fundingAccountInfo, setFundingAccountInfo] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);
  const getUserInfo = userStateInfo?.userData
    ? userStateInfo?.userData
    : userStateInfo;




    useEffect(() => {
      const loadData = async () => {
        const token =  await AsyncStorage.getItem('token')

        const socketUrl = io(config.websocket_url, {
        auth: {
          accessToken: token,
        },
      });

      if (!socketUrl.connected) {
        socketUrl.on("connect", () => {
          socketUrl.emit("room", getUserInfo.id);
        });

        socketUrl.on("message", (message) => {
     
          dispatch(getTradingAccount()).then(gg => {
            setTradingAccountInfo(gg?.payload)
          }
          );
          dispatch(getFundingAccount()).then(gg =>
            setFundingAccountInfo(gg?.payload),
          );
          dispatch(getMarketPrice())
        });
      }
      socketUrl.on("roomError", (err) => {
        console.log(err);
        console.log(err instanceof Error);
      });

      }
      loadData()
    }, [])





    

  useEffect(() => {
    const loadData = async () => {
      dispatch(getProfile());
    };
    loadData();
  }, []);
  const [currentCount, setCount] = useState(1);

  const getMarketData = async () => {
    await dispatch(getMarketPrice())
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMarketData();
    dispatch(getProfile());
    dispatch(getTradingAccount()).then(gg => {
      setTradingAccountInfo(gg?.payload)
    }
    );
    dispatch(getFundingAccount()).then(gg =>
      setFundingAccountInfo(gg?.payload),
    );
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getMarketData();
    const id = setInterval(timer, 5000);
    return () => clearInterval(id);
  }, [currentCount]);


  useEffect(() => {
    dispatch(getTradingAccount()).then(gg =>
      setTradingAccountInfo(gg?.payload),
    );
    dispatch(getFundingAccount()).then(gg =>
      setFundingAccountInfo(gg?.payload),
    );
  }, []);

  const totalAssetBalanceUsd =
    !tradingAccountInfo && !fundingAccountInfo
      ? 0
      : parseFloat(tradingAccountInfo?.totalUsd) +
        parseFloat(fundingAccountInfo?.totalUsd);
  const totalAssetBalanceBtc =
    !tradingAccountInfo && !fundingAccountInfo
      ? 0
      : parseFloat(tradingAccountInfo?.totalBtc) +
        parseFloat(fundingAccountInfo?.totalBtc);

  const timer = () => setCount(currentCount + 1);

  function greetUser() {
    const currentTime = new Date().getHours();
    return currentTime < 12
      ? `Good morning ${getUserInfo?.username}`
      : currentTime < 17
      ? `Good afternoon ${getUserInfo?.username}!`
      : `Good evening ${getUserInfo?.username}`;
  }

  const actions = [
    {
      id: 1,
      name: 'Set Transaction Pin',
      status: getUserInfo?.hasSetPin ? 'Done' : 'Set Now',
      route: "ChangePin"
    },
    {
      id: 2,
      name: 'Verify your identity',
      status: getUserInfo?.isKycVerified ? 'Done' : 'Set Now',
      route: "KycScreen"
    },
    {
      id: 3,
      name: 'Verify phone number',
      status: getUserInfo?.hasVerifiedPhoneNumber ? 'Done' : 'Set Now',
      route: "VerifyPhone"
    },
  ];



  return (
    <MainLayout>
      <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
        <View style={styles.container}>
          <Header info={getUserInfo} note={greetUser()} modeInfo={modeInfo} />
          
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
              <ImageBackground style={{borderRadius:hp(25), overflow: 'hidden'}} source={{uri: modeInfo ? "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682779416/v8cdwzwmg0lmjbjlq3re.png" : "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682779416/ugmo4kuadw8pi6zm0uv1.png"}} resizeMode="cover">
                  <View style={[styles.card]}>
              <View style={styles.eyeDiv}>
                {show ? (
                   <Pressable onPress={() => setShow(!show)}>
                    <Ionicons
                  name="eye-outline"
                  color={'white'}
                  size={30}
                />
                 </Pressable>
                ) : (
                  <Ionicons
                  name="eye-off-outline"
                  onPress={() => setShow(!show)}
                  color={'white'}
                  size={30}
                />
                )}
              </View>
              <Text style={[styles.txt, {...FONTS.h5, marginTop: hp(10), color: COLORS.white}]}>
                Total Assets Balance
              </Text>
              <Text
                style={[styles.txt, {...FONTS.h2, color: COLORS.white}]}>
                {show ? `$${format(totalAssetBalanceUsd ? totalAssetBalanceUsd.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] : 0)}` : '$-------'}
              </Text>
              <Text style={[styles.txt, {...FONTS.body5, color: COLORS.white}]}>
                {totalAssetBalanceBtc ? totalAssetBalanceBtc?.toFixed(5) : 0} btc
              </Text>
              <View style={styles.rowC}>
                <View style={styles.rowC2}>
                  <TouchableOpacity onPress={() => navigation.navigate("Deposit")}>
                    <View>
                      <View style={styles.sub}>
                        <AntDesign  name="arrowdown" size={30} color={COLORS.white} />
                      </View>
                      <Text style={[styles.txt, {...FONTS.body5, color: COLORS.white}]}>
                        Deposit
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate("Transfer")}>
                    <View>
                      <View style={styles.externalLink}>
                      {/* <EvilIcons  name="external-link" size={40} color={COLORS.white} /> */}
                      <TransferIcon />
                      </View>
                      <Text style={[styles.txt, {...FONTS.body5, color:COLORS.white}]}>
                        Transfer
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate("Withdraw")}>
                    <View>
                      <View style={styles.sub}>
                      <AntDesign  name="arrowup" size={30} color={COLORS.white} />
                      </View>
                      <Text style={[styles.txt, {...FONTS.body5, color:COLORS.white}]}>
                        Withdraw
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
              </ImageBackground>
          
            {(!getUserInfo?.hasSetPin ||
              !getUserInfo?.isKycVerified ||
              !getUserInfo?.hasVerifiedPhoneNumber) &&
            <Text style={[{...FONTS.h4, marginVertical: hp(15),color: modeInfo ? COLORS.darkMode : "white"}]}>
              Pending Action
            </Text>
            }
            {actions
              ?.filter(info => info?.status === 'Set Now')
              .map(data => {
                return (
                 <TouchableOpacity onPress={() => navigation.navigate(data?.route)}>
                   <View style={styles.actionCard}>
                    <Text style={[{...FONTS.body5}]}>{data?.name}</Text>
                    <Text style={[styles.tag, {...FONTS.body5, color: COLORS.white}]}>
                      {data?.status}
                    </Text>
                  </View>
                 </TouchableOpacity>
                );
              })}

              
            <Text style={[{...FONTS.h3, fontWeight: "600", marginTop: hp(25),color: modeInfo ? COLORS.darkMode : "white", marginBottom: hp(5)}]}>
              My Assets
            </Text>

            {marketInfos?.map((data: any) => {
              return tokenBalanceData?.map(info => {
                return (
                  info?.currency === data?.symbol && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AssetInfo', {
                          currency: info?.currency,
                          assetType: 'funding',
                          icon: info?.icon,
                          name: info?.token,
                        })
                      }>
                      <View style={styles.actionCard2}>
                        <View style={GlobalStyle.rowStart}>
                          <Image
                            source={info?.icon}
                            resizeMode="contain"
                            style={styles.icons}
                          />
                          <View style={{marginLeft: hp(10)}}>
                            <Text style={{...FONTS.h3, color: modeInfo ? COLORS.lightBlack : COLORS.white}}>
                              {data?.name}
                            </Text>
                            <Text
                              style={{
                                ...FONTS.h5, color: modeInfo ? COLORS.lightBlack : COLORS.white,
                              }}>
                              {info?.currency?.toUpperCase()}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                          }}>
                          <Text
                            style={{...FONTS.h3, color: modeInfo ? COLORS.lightBlack : "white"}}>{`$${format(
                            data?.current_price.toFixed(2),
                          )}`}</Text>
                          <Text
                            style={{
                              ...FONTS.body5,
                              color:
                                data?.price_change_percentage_24h === 0
                                  ? COLORS.lightGray
                                  : data?.price_change_percentage_24h > 0
                                  ? COLORS.darkGreen
                                  : COLORS.red,
                            }}>{`${
                            data?.price_change_24h.toFixed(2) +
                            ' ' +
                            `(${data?.price_change_percentage_24h.toFixed(3).slice(0, -1)})%`
                          }`}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                );
              });
            })}

      
          </ScrollView>
        </View>
      </View>
    </MainLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  txt: {
    textAlign: 'center',
    color: COLORS.white,
  },
  actionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hp(15),
    borderRadius: 5,
    backgroundColor: COLORS.primary2,
    marginBottom: hp(10),
  },
  actionCard2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: hp(10),
    borderBottomColor: COLORS.lightGray3,
    borderBottomWidth: 0.2,
    paddingVertical: hp(15)
  },
  tag: {
    backgroundColor: COLORS.orange,
    color: COLORS.white,
    borderRadius: 50,
    paddingHorizontal: hp(5),
  },
  icons: {
    width: wp(30),
    height: hp(30),
  },
  container: {
    flex: 1,
  },
  card: {
    // backgroundColor: '#485FE6',
    paddingVertical: hp(20),
    paddingHorizontal: hp(30),
    borderRadius: 13,
    height: Platform.OS === "android" ? hp(280) : hp(260),
    marginTop: hp(10),
  },
  eyeDiv: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
    width: wp(250),
  },
  sub: {
    backgroundColor: '#A5B1F3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(10),
    width: wp(50),
    height: hp(50),
    borderRadius: 10,
  },
  externalLink: {
    backgroundColor: '#A5B1F3',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: hp(10),
    width: wp(50),
    height: hp(50),
    borderRadius: 10,
  }
});
