/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainLayout from './mainLayout';
import GlobalStyle from '../utils/globalStyle';
import {COLORS, FONTS} from '../utils/constants/theme';
import {format, hp, wp} from '../utils/helper';
import IconTextButton from '../components/IconTextButton';
import {TextInput} from '../components/TextInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {tokenBalanceData} from '../utils/constants/tokenList';
import {getMarketPrice, marketInfo} from '../slice/TradeSlice';
import {useAppDispatch, useAppSelector} from '../app/hooks';

import {getFundingAccount, getTradingAccount} from '../slice/WalletSlice';
import MarketComponent from '../components/MarketComponent';
import { algorand, avalanche, bitcoin, bitcoinCash, dogeCoin, ethereum, litecoin, okb, polygon, ripple, solana, steller, tether, tron, usd } from '../assets/images';

const Assets = ({navigation}: any) => {
  const [type, setType] = useState('funding');
  const marketInfos = useAppSelector(marketInfo) as any;
  const [transferModal, setTransferModal] = useState(false);
  const [tradingAccountInfo, setTradingAccountInfo] = useState<any>();
  const [fundingAccountInfo, setFundingAccountInfo] = useState<any>();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<any>()
  const [refreshing, setRefreshing] = useState(false);

  const newFundingAccount = fundingAccountInfo ? Object?.values(fundingAccountInfo) : [];
  const newFundingAccount2 = fundingAccountInfo ? Object?.keys(fundingAccountInfo) : [];
  const newList = newFundingAccount?.map((data: any, i) => {
    return typeof(data) === "object" && {
      currency: newFundingAccount2[i]?.toLowerCase(),
      availBalance: data?.availBal,
      balUsd: data?.usd,
      token: newFundingAccount2[i]?.toLowerCase() === "btc" ? "Bitcoin" : newFundingAccount2[i]?.toLowerCase() === "eth" ? "Ethereum" : newFundingAccount2[i]?.toLowerCase() === "usdt" ? "Tether" : newFundingAccount2[i]?.toLowerCase() === "usdc" ? "USD Coin" : newFundingAccount2[i]?.toLowerCase() === "trx" ? "Tron" :  newFundingAccount2[i]?.toLowerCase() === "sol" ? "Solana" :  newFundingAccount2[i]?.toLowerCase() === "algo" ? "Algorand" :  newFundingAccount2[i]?.toLowerCase() === "xrp" ? "Ripple" :  newFundingAccount2[i]?.toLowerCase() === "bch" ? "Bitcoin Cash" :  newFundingAccount2[i]?.toLowerCase() === "matic" ? "Polygon" :  newFundingAccount2[i]?.toLowerCase() === "avax" ? "Avalanche" :  newFundingAccount2[i]?.toLowerCase() === "xlm" ? "Stellar" :  newFundingAccount2[i]?.toLowerCase() === "ltc" ? "LiteCoin" :  newFundingAccount2[i]?.toLowerCase() === "doge" ? "DogeCoin" :  newFundingAccount2[i]?.toLowerCase() === "okb" ? "OKX" : null,
      icon: newFundingAccount2[i]?.toLowerCase() === "btc" ? bitcoin : newFundingAccount2[i]?.toLowerCase() === "eth" ? ethereum : newFundingAccount2[i]?.toLowerCase() === "usdt" ? tether : newFundingAccount2[i]?.toLowerCase() === "usdc" ? usd : newFundingAccount2[i]?.toLowerCase() === "trx" ? tron : newFundingAccount2[i]?.toLowerCase() === "sol" ? solana :  newFundingAccount2[i]?.toLowerCase() === "algo" ? algorand :  newFundingAccount2[i]?.toLowerCase() === "xrp" ? ripple :  newFundingAccount2[i]?.toLowerCase() === "bch" ? bitcoinCash :  newFundingAccount2[i]?.toLowerCase() === "matic" ? polygon :  newFundingAccount2[i]?.toLowerCase() === "avax" ? avalanche :  newFundingAccount2[i]?.toLowerCase() === "xlm" ? steller :  newFundingAccount2[i]?.toLowerCase() === "ltc" ? litecoin :  newFundingAccount2[i]?.toLowerCase() === "doge" ? dogeCoin :  newFundingAccount2[i]?.toLowerCase() === "okb" ? okb : null,
    }
  })
  const afterFilt = newList?.filter(data => data !== false)
  const afterSort = afterFilt?.sort((a: any,b: any) => parseFloat(b?.balUsd) - parseFloat(a?.balUsd))


  const newTradingAccount = tradingAccountInfo ? Object?.values(tradingAccountInfo) : [];
  const newTradingAccount2 = tradingAccountInfo ? Object?.keys(tradingAccountInfo) : [];
  const newTradingList = newTradingAccount?.map((data: any, i) => {
    return typeof(data) === "object" && {
      currency: newTradingAccount2[i]?.toLowerCase(),
      availBalance: data?.availBal,
      balUsd: data?.usd,
      token: newTradingAccount2[i]?.toLowerCase() === "btc" ? "Bitcoin" : newTradingAccount2[i]?.toLowerCase() === "eth" ? "Ethereum" : newTradingAccount2[i]?.toLowerCase() === "usdt" ? "Tether" : newTradingAccount2[i]?.toLowerCase() === "usdc" ? "USD Coin" : newTradingAccount2[i]?.toLowerCase() === "trx" ? "Tron" :  newTradingAccount2[i]?.toLowerCase() === "sol" ? "Solana" :  newTradingAccount2[i]?.toLowerCase() === "algo" ? "Algorand" :  newTradingAccount2[i]?.toLowerCase() === "xrp" ? "Ripple" :  newTradingAccount2[i]?.toLowerCase() === "bch" ? "Bitcoin Cash" :  newTradingAccount2[i]?.toLowerCase() === "matic" ? "Polygon" :  newTradingAccount2[i]?.toLowerCase() === "avax" ? "Avalanche" :  newTradingAccount2[i]?.toLowerCase() === "xlm" ? "Stellar" :  newTradingAccount2[i]?.toLowerCase() === "ltc" ? "LiteCoin" :  newTradingAccount2[i]?.toLowerCase() === "doge" ? "DogeCoin" :  newTradingAccount2[i]?.toLowerCase() === "okb" ? "OKX" : null,
      icon: newTradingAccount2[i]?.toLowerCase() === "btc" ? bitcoin : newTradingAccount2[i]?.toLowerCase() === "eth" ? ethereum : newTradingAccount2[i]?.toLowerCase() === "usdt" ? tether : newTradingAccount2[i]?.toLowerCase() === "usdc" ? usd : newTradingAccount2[i]?.toLowerCase() === "trx" ? tron : newTradingAccount2[i]?.toLowerCase() === "sol" ? solana :  newTradingAccount2[i]?.toLowerCase() === "algo" ? algorand :  newTradingAccount2[i]?.toLowerCase() === "xrp" ? ripple :  newTradingAccount2[i]?.toLowerCase() === "bch" ? bitcoinCash :  newTradingAccount2[i]?.toLowerCase() === "matic" ? polygon :  newTradingAccount2[i]?.toLowerCase() === "avax" ? avalanche :  newTradingAccount2[i]?.toLowerCase() === "xlm" ? steller :  newTradingAccount2[i]?.toLowerCase() === "ltc" ? litecoin :  newTradingAccount2[i]?.toLowerCase() === "doge" ? dogeCoin :  newTradingAccount2[i]?.toLowerCase() === "okb" ? okb : null,
    }
  })
  const afterTradFilt = newTradingList?.filter(data => data !== false)
  const afterTradSort = afterTradFilt?.sort((a: any,b: any) => parseFloat(b?.balUsd) - parseFloat(a?.balUsd))

 

  const fundingAssets = (data: any) => {
   
    // switch (data) {
    //   case data?.toUpperCase():
    //     return  <View style={styles.sub}>
    //       <Text style={{...FONTS.body4}}>{`${format(
    //       fundingAccountInfo?.[data?.toUpperCase()]?.availBal ? `${parseFloat(fundingAccountInfo?.[data?.toUpperCase()]?.availBal).toFixed(2)}` : 0     
    //     )}`}</Text>
    //     <Text style={{...FONTS.body4, fontWeight: '600'}}>{`$${format(
    //       fundingAccountInfo?.[data?.toUpperCase()]?.availBal ?   parseFloat(fundingAccountInfo?.[data?.toUpperCase()]?.availBal).toFixed(2) : 0     
    //     )}`}</Text>    
    //   </View>
    //     break;
    //     default: 
    //       break;
    //     }
    
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getTradingAccount())
    dispatch(getFundingAccount())
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  

  const tradingAssets = (data: any) => {

    switch (data) {
      case data?.toUpperCase():
        return  <View style={styles.sub}>
          <Text style={{...FONTS.body4}}>{`${format(
          tradingAccountInfo?.[data?.toUpperCase()]?.availBal ?   `${parseFloat(tradingAccountInfo?.[data?.toUpperCase()]?.availBal).toFixed(2)}` : 0     
        )}`}</Text>
        <Text style={{...FONTS.body4, fontWeight: '600'}}>{`$${format(
          tradingAccountInfo?.[data?.toUpperCase()]?.availBal ?   parseFloat(tradingAccountInfo?.[data?.toUpperCase()]?.availBal).toFixed(2) : 0     
        )}`}</Text>    
      </View>
        break;
        default: 
          break;
        }
    
  }

  const [currentCount, setCount] = useState(1);
  const timer = () => setCount(currentCount + 1);

  const getMarketData = async () => {
    await dispatch(getMarketPrice())
  }

  useEffect(() => {
    getMarketData()
    const id = setInterval(timer, 5000);
 return () => clearInterval(id);
  }, [currentCount])

 const tokenBal: any = tokenBalanceData
  const combineData = afterSort?.concat(tokenBal)

  const uniqueData = combineData.filter((tag: any, index: any, array: any) => array.findIndex((t: any) => t?.currency == tag?.currency) == index);
  const searchData = !value ? uniqueData : uniqueData.filter((data: any) => data?.currency?.toLowerCase().includes(value?.toLowerCase()) ||  data?.token?.toLowerCase().includes(value?.toLowerCase()))
  
  const combineTradData = afterTradSort?.concat(tokenBal)

  const uniqueTradData = combineTradData.filter((tag: any, index: any, array: any) => array.findIndex((t: any) => t?.currency == tag?.currency) == index);
  const searchTradData = !value ? uniqueTradData : uniqueTradData.filter((data: any) => data?.currency?.toLowerCase().includes(value?.toLowerCase()) ||  data?.token?.toLowerCase().includes(value?.toLowerCase()))



  const showFundingAssets = () => {
    return searchData?.map((info: any) => {
    return marketInfos?.map((data: any) => {
      return info?.currency === data?.symbol && <MarketComponent info={info} type="funding" marketData={data} navigation={navigation} action={(data: any) => fundingAssets(data)} />
    });
  })
  };


  useEffect(() => {
    dispatch(getTradingAccount()).then((gg: any) => {
      setTradingAccountInfo(gg?.payload)
    }
    );
    dispatch(getFundingAccount()).then((gg: any)  => {
      setFundingAccountInfo(gg?.payload)
    }
    );
  }, []);



  const showTradingAssets = () => {
    return searchTradData?.map((info: any) => {
      return marketInfos?.map((data: any) => {
        return info?.currency === data?.symbol && <MarketComponent info={info} type="trading" navigation={navigation} marketData={data} action={(data: any) => tradingAssets(data)} />
      });
    })
  };

  return (
    <MainLayout>
      <View style={GlobalStyle.container}>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
          <Text style={{...FONTS.h2, marginBottom: hp(5), fontWeight: '600'}}>Assets</Text>
          <View style={GlobalStyle.rowBetween}>
            <View style={{width: '60%'}}>
              <Text style={{...FONTS.body4, opacity: 0.7}}>
                Buy, Sell and Swap all of the assets offered by our wallet
              </Text>
            </View>
            <View style={{backgroundColor: COLORS.primary,borderRadius: hp(10), width: '30%', paddingVertical: hp(10), paddingHorizontal: hp(20), justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate("Transfer")}>
                <Text style={{...FONTS.body4, color: COLORS.white}}>Transfer</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.search}>
            <TextInput label={'Search Assets'} value={value} onChangeText={(value) => setValue(value)} searchInput />
          </View>
          <View style={GlobalStyle.rowStart}>
            <View
              style={{
                width: '50%',
                borderBottomColor:
                  type === 'funding' ? COLORS.primary : COLORS.gray2,
                borderBottomWidth: type === 'funding' ? 3 : 1,
                paddingBottom: hp(5),
              }}>
              <Pressable onPress={() => setType('funding')}>
                <Text
                  style={{
                    ...FONTS.h3,
                    // textAlign: 'center',
                    color: type === 'funding' ? COLORS.primary : COLORS.gray2,
                  }}>
                  Funding Balance
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: '50%',
                borderBottomColor:
                  type === 'trading' ? COLORS.primary : COLORS.gray2,
                borderBottomWidth: type === 'trading' ? 3 : 1,
                paddingBottom: hp(5),
              }}>
              <Pressable onPress={() => setType('trading')}>
                <Text
                  style={{
                    ...FONTS.h3,
                    textAlign: 'center',
                    color:
                      type === 'trading' ? COLORS.primary : COLORS.gray2,
                  }}>
                  Trading Balance
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={[GlobalStyle.rowBetween, {marginVertical: hp(25)}]}>
            <Text style={{...FONTS.body3, color: COLORS.gray, width: "30%"}}>
              Tokens
            </Text>
            <Text style={{...FONTS.body3, color: COLORS.gray, textAlign: 'right', width: "30%"}}>
              Assets
            </Text>
          </View>
          {type === 'funding' && showFundingAssets()}
          {type === 'trading' && showTradingAssets()}

                  
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Assets;

const styles = StyleSheet.create({
  div: {
    width: wp(100),
  },
  search: {
    marginVertical: hp(15),
  },
  actionCard2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(10),
    paddingBottom: hp(10),
    borderBottomColor: COLORS.gray2,
    borderBottomWidth: 1,
  },
  icons: {
    width: wp(20),
    height: hp(20),
  },
  sub: {
    justifyContent: 'flex-end', 
    alignItems: 'flex-end',
    width: "30%"
  }
});
