/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, { useState } from 'react';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {COLORS, FONTS} from '../../utils/constants/theme';
  import {format, hp, wp} from '../../utils/helper';
  import {TextInput} from '../TextInput';
  import {tokenBalanceData} from '../../utils/constants/tokenList';
  import GlobalStyle from '../../utils/globalStyle';
  import {ScrollView} from 'react-native-gesture-handler';
import {useAppSelector } from '../../app/hooks';
import { tradingAccount } from '../../slice/WalletSlice';
  
  const SwapTokenModal = ({modalVisible, setModalVisible, selectedToken, setSelectedToken}: any) => {
    const [value, setValue] = useState("")

   const tradingAccountInfo: any = useAppSelector(tradingAccount)
    const searchToken = tokenBalanceData?.filter(data => data?.currency?.toLowerCase().includes(value?.toLowerCase()) || data?.token?.toLowerCase().includes(value?.toLowerCase()))
  


    const selectType = (data: any) => {
        setSelectedToken(data)
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


    const assets = () => {
      return searchToken?.map(info => {
        return (
          <TouchableOpacity onPress={ selectedToken?.toLowerCase() === info?.currency?.toLowerCase() ? () => {} : () => selectType(info)}>
            <View style={[styles.actionCard2, {backgroundColor: selectedToken?.toLowerCase() === info?.currency?.toLowerCase() ? COLORS.lightGray2 : COLORS.white}]}>
              <View style={GlobalStyle.rowStart}>
                <Image
                  source={info?.icon}
                  resizeMode="cover"
                  style={styles.icons}
                />
                <View style={{marginLeft: hp(10)}}>
                  <Text style={{...FONTS.body3, fontWeight: 'bold'}}>
                    {info?.token}
                  </Text>
                  <Text style={{...FONTS.body5, textTransform: 'uppercase'}}>
                    {info?.currency}
                  </Text>
                </View>
              </View>
              {tradingAssets(info?.currency?.toUpperCase())}
              
            </View>
          </TouchableOpacity>
        );
      });
    };
  
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setModalVisible()}>
                <View style={styles.end}>
                  <AntDesign name="close" size={30} />
                </View>
              </TouchableOpacity>
  
              <Text style={{...FONTS.h3, textAlign: 'center'}}>Select Token</Text>
              <View style={styles.search}>
                <TextInput label={'Search Assets'} value={value} onChangeText={(value) => setValue(value)} searchInput />
              </View>
              <ScrollView>{assets()}</ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default SwapTokenModal;
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
      backgroundColor: "transparent"
    },
    modalView: {
      margin: 20,
      height: hp(600),
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
    end: {
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
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
    sub: {
      justifyContent: 'flex-end', 
      alignItems: 'flex-end',
      width: "30%"
    }
  });