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
import { SelectInput } from '../components/SelectInput';
import { getTradingAccount, getWalletNetwork } from '../slice/WalletSlice';
import SelectDropdowns from '../components/SelectDropdowns';

const WithdrawalCard = (props: any) => {
  const assetName = props.route?.params?.info?.token;
  const currencyIcon = props.route?.params?.info?.icon;
  const currencyName = props.route?.params?.info?.currency;
  
  const [walletType, setWalletType] = useState("")
  const [walletNetwork, setWalletNetwork] = useState("")
  const [assetData, setAssetData] = useState<any>();
  const dispatch = useAppDispatch()
  const [networks, setNetworks] = useState<any>()

useEffect(() => {
  const loadData = async () => {
     await dispatch(getTradingAccount()).then(gg => {
       setAssetData(gg?.payload?.[currencyName?.toUpperCase()])
     })

     await dispatch(getWalletNetwork(currencyName)).then((pp: any) => setNetworks(pp?.payload?.[currencyName?.toUpperCase()]))
  } 
  loadData()
 }, [currencyName])


 const networksList = networks?.map((data: any) => {
  return {
    id: data?.address,
    name: data?.chain
  }
 })

  return (
    <View style={GlobalStyle.container}>
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.top]}>
            <TouchableOpacity onPress={() => props?.navigation.goBack()}>
              <View style={styles.end}>
                <AntDesign name="arrowleft" size={30} />
              </View>
            </TouchableOpacity>

            <Text style={{...FONTS.h2, textAlign: 'left'}}>Withdraw</Text>


            <View style={[GlobalStyle.rowBetween, {marginTop: hp(20)}]}>
              <View style={GlobalStyle.rowStart}>
                <Image source={currencyIcon} style={styles.icon} />
                <Text style={{textTransform: 'capitalize', ...FONTS.body3}}>
                  {assetName}
                </Text>
              </View>

              <View>
                <Text style={{ ...FONTS.body3}}>
                  Balance: {assetData?.availBal ? format(parseFloat(assetData?.availBal)?.toFixed(2)) : 0} {currencyName?.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.form}>
              <ScrollView>
              <TextInput value="" label="Enter Amount" />
              <TextInput value="" label="Enter Usd Amount" />
              <SelectDropdowns 
                label="Select Wallet"
                data={[
                  {
                    id: 1,
                    name: "Zend Pay"
                  },
                  {
                    id: 2,
                    name: "External Wallet"
                  }
                ]}
                selected={walletType}
                setSelected={(value: any) => setWalletType(value)}
              />

                  {
                    walletType ===  "Zend Pay" &&   <TextInput value="" label="Zend Username" />
                  }
                  {
                    walletType ===  "Zend Pay" &&   <TextInput value="" label="Transaction Fee" />
                  }
                  {
                    walletType ===  "External Wallet"  &&       <SelectDropdowns 
                    label="Select Network"
                    data={networksList}
                    selected={walletNetwork}
                    setSelected={(value: any) => setWalletNetwork(value)}
                  />
                  }
                  {
                    walletType ===  "External Wallet" && <TextInput value="" label="Wallet Address" />
                  }
              {
                    walletType ===  "External Wallet" && <View style={styles.card}>
                        <View style={GlobalStyle.rowBetween}>
                          <Text>Fees:</Text>
                          <Text>0 {currencyName?.toUpperCase()}</Text>
                        </View>
                        <View style={styles.hr} />
                        <View style={GlobalStyle.rowBetween}>
                          <Text>Recipient will receive:</Text>
                          <Text>0.000 {currencyName?.toUpperCase()}</Text>
                        </View>
                    </View>
                  }
              </ScrollView>
              
            </View>
          </View>
          <View style={styles.bottom}>
            <IconTextButton label="Withdraw" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WithdrawalCard;

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
    marginBottom: hp(10)
  },
  top: {
    flex: 5,
    marginBottom: hp(10)
  },
  bottom: {
    flex: 0.8,
    paddingTop: hp(20)
  },
  card: {
    backgroundColor: COLORS.primary2,
    padding: hp(15),
    borderRadius: hp(10),
    borderColor: COLORS.primary,
    borderWidth: 0.2,
    marginBottom: hp(10)
  },
  hr: {
    backgroundColor: COLORS.primary,
    height: 2,
    marginVertical: hp(10)
  }
});
