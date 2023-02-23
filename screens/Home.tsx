/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import { View, Text,ScrollView, StyleSheet, Image, Pressable, TouchableOpacity, RefreshControl } from 'react-native'
import React, {useState, useEffect} from 'react'

import MainLayout from './mainLayout'
import GlobalStyle from '../utils/globalStyle'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getProfile, userState } from '../slice/AuthSlice'
import { format, hp, wp } from '../utils/helper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { arrowDown, arrowUp, eye, swaps } from '../assets/images'
import Header from '../components/Header'
import { COLORS, FONTS } from '../utils/constants/theme'
import { tokenBalanceData } from '../utils/constants/tokenList'
import { getMarketPrice, marketInfo } from '../slice/TradeSlice'
import { getTradingAccount, tradingAccount } from '../slice/WalletSlice'
import DepositModal from '../components/Modals/DepositModal'
import WithdrawModal from '../components/Modals/WithdrawModal'
import TransferModal from '../components/Modals/TransferModal'

const Home = ({navigation}: any) => {
 const dispatch = useAppDispatch()
 const userStateInfo = useAppSelector(userState)
 const marketInfos = useAppSelector(marketInfo) as any
 const [show, setShow] = useState(false)
 const tradingAccountInfo = useAppSelector(tradingAccount)
 const [refreshing, setRefreshing] = useState(false);
  const getUserInfo = userStateInfo?.userData ? userStateInfo?.userData : userStateInfo
const [depositModal, setDepositModal] = useState(false)
const [transferModal, setTransferModal] = useState(false)
const [withdrawModal, setWithdrawModal] = useState(false)

const handleDepositOpen = () => {
  setDepositModal(true)
}

const handleDepositClose = () => {
  setDepositModal(false)
}

const handleWithdrawalOpen = () => {
  setWithdrawModal(true)
}

const handleWithdrawalClose = () => {
 setWithdrawModal(false)
}

const handleTransferOpen = () => {
    setTransferModal(true)
}

const handleTransferClose = () => {
  setTransferModal(false)
}



  useEffect(() => {
    const loadData = async () => {
      dispatch(getProfile())
    }
    loadData()
  }, [])
  const [currentCount, setCount] = useState(1);

  const getMarketData = async () => {
    await dispatch(getMarketPrice())
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMarketData()
    dispatch(getProfile())
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getMarketData()
    const id = setInterval(timer, 5000);
 return () => clearInterval(id);
  }, [currentCount])

  // useEffect(() => {
  //   dispatch(getTradingAccount()).then(gg => console.log("hhh==", {gg}))
  // }, [])

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
      name: "Set Transaction Pin",
      status: getUserInfo?.hasSetPin ? "Done" : "Pending",
    },
    {
      id: 2,
      name: "Verify your identity",
      status: getUserInfo?.isKycVerified ? "Done" : "Pending"
    },
    {
      id: 3,
      name: "Verify phone number",
      status: getUserInfo?.hasVerifiedPhoneNumber ? "Done" : "Pending"
    }
  ]


  
  return (
   <MainLayout>
     <View style={GlobalStyle.container}>
       <View style={styles.container}>
      <Header info={getUserInfo} note={greetUser()} />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
        <View style={styles.card}>
          <View style={styles.eyeDiv}>
            {
              show ? <Ionicons name='eye-off-outline' onPress={() => setShow(!show)} color={'white'} size={22} /> :
                <Pressable onPress={() => setShow(!show)}>
                  <Image source={eye}  />
                </Pressable>
            }
          </View>
          <Text style={[styles.txt, {...FONTS.body5}]}>Total Assets Balance</Text>
          <Text style={[styles.txt, {...FONTS.largeTitle, fontWeight: 'bold'}]}>{show ? '$0.00312' : '$-------'}</Text>
          <Text style={[styles.txt, {...FONTS.body5}]}>00312 btc</Text>
          <View style={styles.rowC}>
          <View style={styles.rowC2}>
           <TouchableOpacity onPress={handleDepositOpen}>
           <View>
              <View style={styles.sub}>
                <Image source={arrowDown} />
              </View>
              <Text style={[styles.txt, {...FONTS.body5}]}>Deposit</Text>
            </View>
           </TouchableOpacity>
           <TouchableOpacity onPress={handleTransferOpen}>
            <View>
              <View style={styles.sub}>
                <Image source={swaps} />
              </View>
              <Text style={[styles.txt, {...FONTS.body5}]}>Transfer</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleWithdrawalOpen}>
            <View>
              <View style={styles.sub}>
                <Image source={arrowUp} />
              </View>
              <Text style={[styles.txt, {...FONTS.body5}]}>Withdraw</Text>
            </View>
            </TouchableOpacity>

          </View>
          </View>
        </View>
        <Text style={[{...FONTS.h4, marginVertical: hp(15)}]}>Pending Action</Text>
        {
          actions?.filter(info => info?.status === "Pending").map(data => {
            return <View style={styles.actionCard}>
              <Text style={[{...FONTS.body5}]}>{data?.name}</Text>
              <Text style={[styles.tag, {...FONTS.body5}]}>{data?.status}</Text>
            </View>
          })
        }
           <Text style={[{...FONTS.h4, marginVertical: hp(15)}]}>My Assets</Text>

           {
            marketInfos?.map((data: any) => {
             return tokenBalanceData?.map(info => {
               return info?.currency === data?.symbol &&
                 <TouchableOpacity onPress={() => navigation.navigate("AssetInfo", {
                  assets: info
                 })}>
                   <View style={styles.actionCard2}>
                 <View style={GlobalStyle.rowStart}>
                  <Image source={info?.icon} resizeMode='cover' style={styles.icons} />
                    <View style={{marginLeft: hp(10)}}>
                      <Text style={{...FONTS.body3, fontWeight: "bold"}}>{data?.name}</Text>
                      <Text style={{...FONTS.body5, textTransform: 'uppercase'}}>{info?.currency}</Text>
                    </View>
                 </View>
                 <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                 <Text style={{...FONTS.body5, fontWeight: "bold"}}>{`$${format(data?.current_price.toFixed(2))}`}</Text>
                      <Text style={{...FONTS.body5, color: data?.price_change_percentage_24h === 0 ? COLORS.lightGray : data?.price_change_percentage_24h > 0 ? COLORS.darkGreen : COLORS.red}}>{`${data?.price_change_24h.toFixed(2) + " " + `(${data?.price_change_percentage_24h.toFixed(2)})%`}`}</Text>
                 </View>
              </View>
                 </TouchableOpacity>
              })
            
            })
           }

<DepositModal modalVisible={depositModal} setModalVisible={() => handleDepositClose()} />
<WithdrawModal modalVisible={withdrawModal} setModalVisible={() => handleWithdrawalClose()} />
<TransferModal modalVisible={transferModal} setModalVisible={() => handleTransferClose()} />
      </ScrollView>

    </View>
    
    </View> 

   </MainLayout>
  )
}

export default Home

const styles = StyleSheet.create({
  txt: {
    textAlign: 'center',
    color: COLORS.white
  },
  actionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hp(15),
    borderRadius: 5,
    backgroundColor: COLORS.primary2,
    marginBottom: hp(10)
  },
  actionCard2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(10),
    paddingBottom: hp(10),
    borderBottomColor: COLORS.gray2,
    borderBottomWidth: 1
  },
  tag: {
    backgroundColor: COLORS.orange,
    color: COLORS.white,
    borderRadius: 50,
    paddingHorizontal: hp(5)
  },
  icons: {
    width: wp(20),
    height: hp(20)
  },
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "#485FE6",
    paddingVertical: hp(20),
    paddingHorizontal: hp(30),
    borderRadius: 33,
    height: hp(250),
    marginTop: hp(10)
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
    width: wp(200)
  },
  sub: {
    backgroundColor: "#A5B1F3",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: hp(10)
  }
})