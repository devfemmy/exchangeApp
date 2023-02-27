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
      case 'USDT':
        return  <View style={styles.sub}>
          <Text style={{...FONTS.body5}}>{`${format(
          fundingAccountInfo?.USDT?.availBal ?   `${parseFloat(fundingAccountInfo?.USDT?.availBal).toFixed(4)} ${data}` : 0     
        )}`}</Text>
        <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${format(
          fundingAccountInfo?.USDT?.availBal ?   parseFloat(fundingAccountInfo?.USDT?.availBal).toFixed(2) : 0     
        )}`}</Text>    
      </View>
        break;
        case 'USDC':
          return  <View style={styles.sub}>
            <Text style={{...FONTS.body5}}>{`${format(
            fundingAccountInfo?.USDC?.availBal ?   `${parseFloat(fundingAccountInfo?.USDC?.availBal).toFixed(4)} ${data}` : 0     
          )}`}</Text>
          <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${format(
            fundingAccountInfo?.USDC?.usd ?   parseFloat(fundingAccountInfo?.USDC?.usd).toFixed(2) : 0     
          )}`}</Text>    
        </View>
          break;
          case 'TRX':
            return  <View style={styles.sub}>
              <Text style={{...FONTS.body5}}>{`${
              format(fundingAccountInfo?.TRX?.availBal ?   `${parseFloat(fundingAccountInfo?.TRX?.availBal).toFixed(4)} ${data}` : 0     
            )}`}</Text>
            <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
             format(fundingAccountInfo?.TRX?.usd ?   parseFloat(fundingAccountInfo?.TRX?.usd).toFixed(2) : 0     
            )}`}</Text>    
          </View>
            break;
            case 'BTC':
              return  <View style={styles.sub}>
                <Text style={{...FONTS.body5}}>{`${
                format(fundingAccountInfo?.BTC?.availBal ?   `${parseFloat(fundingAccountInfo?.BTC?.availBal).toFixed(4)} ${data}` : 0     
              )}`}</Text>
              <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                format(fundingAccountInfo?.BTC?.usd ?   parseFloat(fundingAccountInfo?.BTC?.usd).toFixed(2) : 0     
              )}`}</Text>    
            </View>
              break;
              case 'ETH':
                return  <View style={styles.sub}>
                  <Text style={{...FONTS.body5}}>{`${
                  format(fundingAccountInfo?.ETH?.availBal ?   `${parseFloat(fundingAccountInfo?.ETH?.availBal).toFixed(4)} ${data}` : 0     
                )}`}</Text>
                <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                  format(fundingAccountInfo?.ETH?.usd ?   parseFloat(fundingAccountInfo?.ETH?.usd).toFixed(2) : 0     
                )}`}</Text>    
              </View>
                break;
                case 'SOL':
                  return  <View style={styles.sub}>
                    <Text style={{...FONTS.body5}}>{`${
                    format(fundingAccountInfo?.SOL?.availBal ?   `${parseFloat(fundingAccountInfo?.SOL?.availBal).toFixed(4)} ${data}` : 0     
                  )}`}</Text>
                  <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                    format(fundingAccountInfo?.SOL?.usd ?   parseFloat(fundingAccountInfo?.SOL?.usd).toFixed(2) : 0     
                  )}`}</Text>    
                </View>
                  break;
                  case 'ALGO':
                    return  <View style={styles.sub}>
                      <Text style={{...FONTS.body5}}>{`${
                      format(fundingAccountInfo?.ALGO?.availBal ?   `${parseFloat(fundingAccountInfo?.ALGO?.availBal).toFixed(4)} ${data}` : 0     
                    )}`}</Text>
                    <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                      format(fundingAccountInfo?.ALGO?.usd ?   parseFloat(fundingAccountInfo?.ALGO?.usd).toFixed(2) : 0     
                    )}`}</Text>    
                  </View>
                    break;
                    case 'XRP':
                      return  <View style={styles.sub}>
                        <Text style={{...FONTS.body5}}>{`${
                        format(fundingAccountInfo?.XRP?.availBal ?   `${parseFloat(fundingAccountInfo?.XRP?.availBal).toFixed(4)} ${data}` : 0     
                      )}`}</Text>
                      <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                        format(fundingAccountInfo?.XRP?.usd ?   parseFloat(fundingAccountInfo?.XRP?.usd).toFixed(2) : 0     
                      )}`}</Text>    
                    </View>
                      break;
                      case 'BCH':
                        return  <View style={styles.sub}>
                          <Text style={{...FONTS.body5}}>{`${
                          format(fundingAccountInfo?.BCH?.availBal ?   `${parseFloat(fundingAccountInfo?.BCH?.availBal).toFixed(4)} ${data}` : 0     
                        )}`}</Text>
                        <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                          format(fundingAccountInfo?.BCH?.usd ?   parseFloat(fundingAccountInfo?.BCH?.usd).toFixed(2) : 0     
                        )}`}</Text>    
                      </View>
                        break;
                        case 'MATIC':
                          return  <View style={styles.sub}>
                            <Text style={{...FONTS.body5}}>{`${
                            format(fundingAccountInfo?.MATIC?.availBal ?  `${parseFloat(fundingAccountInfo?.MATIC?.availBal).toFixed(4)} ${data}` : 0     
                          )}`}</Text>
                          <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                            format(fundingAccountInfo?.MATIC?.usd ?   parseFloat(fundingAccountInfo?.MATIC?.usd).toFixed(2) : 0     
                          )}`}</Text>    
                        </View>
                          break;
                          case 'AVAX':
                            return  <View style={styles.sub}>
                              <Text style={{...FONTS.body5}}>{`${
                              format(fundingAccountInfo?.AVAX?.availBal ? `${parseFloat(fundingAccountInfo?.AVAX?.availBal).toFixed(4)} ${data}` : 0     
                            )}`}</Text>
                            <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                              format(fundingAccountInfo?.AVAX?.usd ?   parseFloat(fundingAccountInfo?.AVAX?.usd).toFixed(2) : 0     
                            )}`}</Text>    
                          </View>
                            break;
                            case 'XLM':
                              return  <View style={styles.sub}>
                                <Text style={{...FONTS.body5}}>{`${
                                format(fundingAccountInfo?.XLM?.availBal ?  `${parseFloat(fundingAccountInfo?.XLM?.availBal).toFixed(4)} ${data}` : 0     
                              )}`}</Text>
                              <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                                format(fundingAccountInfo?.XLM?.usd ?   parseFloat(fundingAccountInfo?.XLM?.usd).toFixed(2) : 0     
                              )}`}</Text>    
                            </View>
                              break;
                              case 'LTC':
                                return  <View style={styles.sub}>
                                  <Text style={{...FONTS.body5}}>{`${
                                  format(fundingAccountInfo?.LTC?.availBal ?   `${parseFloat(fundingAccountInfo?.LTC?.availBal).toFixed(4)} ${data}` : 0     
                                )}`}</Text>
                                <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                                  format(fundingAccountInfo?.LTC?.usd ?   parseFloat(fundingAccountInfo?.LTC?.usd).toFixed(2) : 0     
                                )}`}</Text>    
                              </View>
                                break;
                                case 'DOGE':
                                  return  <View style={styles.sub}>
                                    <Text style={{...FONTS.body5}}>{`${
                                    format(fundingAccountInfo?.DOGE?.availBal ?   `${parseFloat(fundingAccountInfo?.DOGE?.availBal).toFixed(4)} ${data}` : 0     
                                  )}`}</Text>
                                  <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                                    format(fundingAccountInfo?.DOGE?.usd ?   parseFloat(fundingAccountInfo?.DOGE?.usd).toFixed(2) : 0     
                                  )}`}</Text>    
                                </View>
                                  break;
                                  case 'OKB':
                                    return  <View style={styles.sub}>
                                      <Text style={{...FONTS.body5}}>{`${
                                      format(fundingAccountInfo?.OKB?.availBal ?   `${parseFloat(fundingAccountInfo?.OKB?.availBal).toFixed(4)} ${data}` : 0     
                                    )}`}</Text>
                                    <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                                      format(fundingAccountInfo?.OKB?.usd ?   parseFloat(fundingAccountInfo?.OKB?.usd).toFixed(2) : 0     
                                    )}`}</Text>    
                                  </View>
                                    break;
      default:
        
    }
    
  }

  const tradingAssets = (data: any) => {
   
    switch (data) {
      case 'USDT':
        return  <View style={styles.sub}>
          <Text style={{...FONTS.body5}}>{`${format(
          tradingAccountInfo?.USDT?.availBal ?   `${parseFloat(tradingAccountInfo?.USDT?.availBal).toFixed(4)} ${data}` : 0     
        )}`}</Text>
        <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${format(
          tradingAccountInfo?.USDT?.availBal ?   parseFloat(tradingAccountInfo?.USDT?.availBal).toFixed(2) : 0     
        )}`}</Text>    
      </View>
        break;
        case 'USDC':
          return  <View style={styles.sub}>
            <Text style={{...FONTS.body5}}>{`${format(
            tradingAccountInfo?.USDC?.availBal ?   `${parseFloat(tradingAccountInfo?.USDC?.availBal).toFixed(4)} ${data}` : 0     
          )}`}</Text>
          <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${format(
            tradingAccountInfo?.USDC?.usd ?   parseFloat(tradingAccountInfo?.USDC?.usd).toFixed(2) : 0     
          )}`}</Text>    
        </View>
          break;
          case 'TRX':
            return  <View style={styles.sub}>
              <Text style={{...FONTS.body5}}>{`${
              format(tradingAccountInfo?.TRX?.availBal ?   `${parseFloat(tradingAccountInfo?.TRX?.availBal).toFixed(4)} ${data}` : 0     
            )}`}</Text>
            <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
             format(tradingAccountInfo?.TRX?.usd ?   parseFloat(tradingAccountInfo?.TRX?.usd).toFixed(2) : 0     
            )}`}</Text>    
          </View>
            break;
            case 'BTC':
              return  <View style={styles.sub}>
                <Text style={{...FONTS.body5}}>{`${
                format(tradingAccountInfo?.BTC?.availBal ?   `${parseFloat(tradingAccountInfo?.BTC?.availBal).toFixed(4)} ${data}` : 0     
              )}`}</Text>
              <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                format(tradingAccountInfo?.BTC?.usd ?   parseFloat(tradingAccountInfo?.BTC?.usd).toFixed(2) : 0     
              )}`}</Text>    
            </View>
              break;
              case 'ETH':
                return  <View style={styles.sub}>
                  <Text style={{...FONTS.body5}}>{`${
                  format(tradingAccountInfo?.ETH?.availBal ?   `${parseFloat(tradingAccountInfo?.ETH?.availBal).toFixed(4)} ${data}` : 0     
                )}`}</Text>
                <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                  format(tradingAccountInfo?.ETH?.usd ?   parseFloat(tradingAccountInfo?.ETH?.usd).toFixed(2) : 0     
                )}`}</Text>    
              </View>
                break;
                case 'SOL':
                  return  <View style={styles.sub}>
                    <Text style={{...FONTS.body5}}>{`${
                    format(tradingAccountInfo?.SOL?.availBal ?   `${parseFloat(tradingAccountInfo?.SOL?.availBal).toFixed(4)} ${data}` : 0     
                  )}`}</Text>
                  <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                    format(tradingAccountInfo?.SOL?.usd ?   parseFloat(tradingAccountInfo?.SOL?.usd).toFixed(2) : 0     
                  )}`}</Text>    
                </View>
                  break;
                  case 'ALGO':
                    return  <View style={styles.sub}>
                      <Text style={{...FONTS.body5}}>{`${
                      format(tradingAccountInfo?.ALGO?.availBal ?   `${parseFloat(tradingAccountInfo?.ALGO?.availBal).toFixed(4)} ${data}` : 0     
                    )}`}</Text>
                    <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                      format(tradingAccountInfo?.ALGO?.usd ?   parseFloat(tradingAccountInfo?.ALGO?.usd).toFixed(2) : 0     
                    )}`}</Text>    
                  </View>
                    break;
                    case 'XRP':
                      return  <View style={styles.sub}>
                        <Text style={{...FONTS.body5}}>{`${
                        format(tradingAccountInfo?.XRP?.availBal ?   `${parseFloat(tradingAccountInfo?.XRP?.availBal).toFixed(4)} ${data}` : 0     
                      )}`}</Text>
                      <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                        format(tradingAccountInfo?.XRP?.usd ?   parseFloat(tradingAccountInfo?.XRP?.usd).toFixed(2) : 0     
                      )}`}</Text>    
                    </View>
                      break;
                      case 'BCH':
                        return  <View style={styles.sub}>
                          <Text style={{...FONTS.body5}}>{`${
                          format(tradingAccountInfo?.BCH?.availBal ?   `${parseFloat(tradingAccountInfo?.BCH?.availBal).toFixed(4)} ${data}` : 0     
                        )}`}</Text>
                        <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                          format(tradingAccountInfo?.BCH?.usd ?   parseFloat(tradingAccountInfo?.BCH?.usd).toFixed(2) : 0     
                        )}`}</Text>    
                      </View>
                        break;
                        case 'MATIC':
                          return  <View style={styles.sub}>
                            <Text style={{...FONTS.body5}}>{`${
                            format(tradingAccountInfo?.MATIC?.availBal ?   `${parseFloat(tradingAccountInfo?.MATIC?.availBal).toFixed(4)} ${data}` : 0     
                          )}`}</Text>
                          <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                            format(tradingAccountInfo?.MATIC?.usd ?   parseFloat(tradingAccountInfo?.MATIC?.usd).toFixed(2) : 0     
                          )}`}</Text>    
                        </View>
                          break;
                          case 'AVAX':
                            return  <View style={styles.sub}>
                              <Text style={{...FONTS.body5}}>{`${
                              format(tradingAccountInfo?.AVAX?.availBal ?   `${parseFloat(tradingAccountInfo?.AVAX?.availBal).toFixed(4)} ${data}` : 0     
                            )}`}</Text>
                            <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                              format(tradingAccountInfo?.AVAX?.usd ?   parseFloat(tradingAccountInfo?.AVAX?.usd).toFixed(2) : 0     
                            )}`}</Text>    
                          </View>
                            break;
                            case 'XLM':
                              return  <View style={styles.sub}>
                                <Text style={{...FONTS.body5}}>{`${
                                format(tradingAccountInfo?.XLM?.availBal ?   `${parseFloat(tradingAccountInfo?.XLM?.availBal).toFixed(4)} ${data}` : 0     
                              )}`}</Text>
                              <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                                format(tradingAccountInfo?.XLM?.usd ?   parseFloat(tradingAccountInfo?.XLM?.usd).toFixed(2) : 0     
                              )}`}</Text>    
                            </View>
                              break;
                              case 'LTC':
                                return  <View style={styles.sub}>
                                  <Text style={{...FONTS.body5}}>{`${
                                  format(tradingAccountInfo?.LTC?.availBal ?  `${parseFloat(tradingAccountInfo?.LTC?.availBal).toFixed(4)} ${data}` : 0     
                                )}`}</Text>
                                <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                                  format(tradingAccountInfo?.LTC?.usd ?   parseFloat(tradingAccountInfo?.LTC?.usd).toFixed(2) : 0     
                                )}`}</Text>    
                              </View>
                                break;
                                case 'DOGE':
                                  return  <View style={styles.sub}>
                                    <Text style={{...FONTS.body5}}>{`${
                                    format(tradingAccountInfo?.DOGE?.availBal ?   `${parseFloat(tradingAccountInfo?.DOGE?.availBal).toFixed(4)} ${data}` : 0     
                                  )}`}</Text>
                                  <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                                    format(tradingAccountInfo?.DOGE?.usd ?   parseFloat(tradingAccountInfo?.DOGE?.usd).toFixed(2) : 0     
                                  )}`}</Text>    
                                </View>
                                  break;
                                  case 'OKB':
                                    return  <View style={styles.sub}>
                                      <Text style={{...FONTS.body5}}>{`${
                                      format(tradingAccountInfo?.OKB?.availBal ?   `${parseFloat(tradingAccountInfo?.OKB?.availBal).toFixed(4)} ${data}` : 0     
                                    )}`}</Text>
                                    <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${
                                      format(tradingAccountInfo?.OKB?.usd ?   parseFloat(tradingAccountInfo?.OKB?.usd).toFixed(2) : 0     
                                    )}`}</Text>    
                                  </View>
                                    break;
      default:
        
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
    return marketInfos?.map((data: any) => {
    return searchData?.map(info => {
      return info?.currency === data?.symbol && <MarketComponent info={info} type="funding" marketData={data} navigation={navigation} action={(data: any) => fundingAssets(data)} />
    });
  })
  };


  useEffect(() => {
    dispatch(getTradingAccount()).then(gg =>
      setTradingAccountInfo(gg?.payload),
    );
    dispatch(getFundingAccount()).then(gg =>
      setFundingAccountInfo(gg?.payload),
    );
  }, []);



  const showTradingAssets = () => {
    return marketInfos?.map((data: any) => {
      return searchData?.map(info => {
        return info?.currency === data?.symbol && <MarketComponent info={info} type="trading" navigation={navigation} marketData={data} action={(data: any) => tradingAssets(data)} />
      });
    })
  };

  return (
    <MainLayout>
      <View style={GlobalStyle.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{...FONTS.h2, marginBottom: hp(5)}}>Assets</Text>
          <View style={GlobalStyle.rowBetween}>
            <Text style={{...FONTS.body5}}>
              Buy, Sell and Swap all of the assets offered by our wallet
            </Text>

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
                borderBottomWidth: 1,
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
                  type === 'trading' ? COLORS.primary : COLORS.lightGray3,
                borderBottomWidth: 1,
                paddingBottom: hp(5),
              }}>
              <Pressable onPress={() => setType('trading')}>
                <Text
                  style={{
                    ...FONTS.h3,
                    textAlign: 'center',
                    color:
                      type === 'trading' ? COLORS.primary : COLORS.lightGray3,
                  }}>
                  Trading Balance
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={[GlobalStyle.rowBetween, {marginVertical: hp(25)}]}>
            <Text style={{...FONTS.body4, color: COLORS.lightGray3, width: "30%"}}>
              Tokens
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.lightGray3, textAlign: 'right', width: "30%"}}>
              Assets
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.lightGray3, textAlign: 'right', width: "30%"}}>
            Market Price
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
