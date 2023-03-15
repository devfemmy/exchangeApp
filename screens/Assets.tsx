/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
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

const Assets = ({navigation}: any) => {
  const [type, setType] = useState('funding');
  const marketInfos = useAppSelector(marketInfo) as any;
  const [transferModal, setTransferModal] = useState(false);
  const [tradingAccountInfo, setTradingAccountInfo] = useState<any>();
  const [fundingAccountInfo, setFundingAccountInfo] = useState<any>();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<any>()


  const fundingAssets = (data: any) => {
   
    switch (data) {
      case data?.toUpperCase():
        return  <View style={styles.sub}>
          <Text style={{...FONTS.body4}}>{`${format(
          fundingAccountInfo?.[data?.toUpperCase()]?.availBal ? `${parseFloat(fundingAccountInfo?.[data?.toUpperCase()]?.availBal).toFixed(2)}` : 0     
        )}`}</Text>
        <Text style={{...FONTS.body4, fontWeight: '600'}}>{`$${format(
          fundingAccountInfo?.[data?.toUpperCase()]?.availBal ?   parseFloat(fundingAccountInfo?.[data?.toUpperCase()]?.availBal).toFixed(2) : 0     
        )}`}</Text>    
      </View>
        break;
        default: 
          break;
        }
    
  }


  

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

  const searchData = !value ? tokenBalanceData : tokenBalanceData?.filter(data => data?.currency?.toLowerCase().includes(value?.toLowerCase()) ||  data?.token?.toLowerCase().includes(value?.toLowerCase()))

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
    return searchData?.map((info: any) => {
      return marketInfos?.map((data: any) => {
        return info?.currency === data?.symbol && <MarketComponent info={info} type="trading" navigation={navigation} marketData={data} action={(data: any) => tradingAssets(data)} />
      });
    })
  };

  return (
    <MainLayout>
      <View style={GlobalStyle.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
