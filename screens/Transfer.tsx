/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../utils/constants/theme';
import {capitalizeWord, format, hp, wp} from '../utils/helper';
import {stroke} from '../assets/images';
import icons from '../utils/constants/icons';
import IconTextButton from '../components/IconTextButton';
import {ScrollView} from 'react-native-gesture-handler';
import GlobalStyle from '../utils/globalStyle';
import HeaderComponent from '../components/HeaderComponent';
import SwapTokenModal from '../components/Modals/SwapTokenModal';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {
  getFundingAccountByCurrency,
  getTradingAccountByCurrency,
} from '../slice/WalletSlice';
import { modeStatus, transferToken } from '../slice/TradeSlice';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AnimatedText from '../components/AnimatedText';



const Transfer = ({navigation}: any) => {
  const [from, setFrom] = useState('funding');
  const [to, setTo] = useState('trading');
  const [selectedAssets, setSelectedAssets] = useState('Select Token');
  const [number, setNumber] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  const dispatch = useAppDispatch();
  const [assetDataFund, setAssetDataFund] = useState<any>();
  const [assetDataTrad, setAssetDataTrad] = useState<any>();
  const [loader, setLoader] = useState(false);
  const modeInfo = useAppSelector(modeStatus);

  useEffect(() => {
    if (selectedAssets !== 'Select Token') {
      dispatch(getFundingAccountByCurrency(selectedAssets.toLowerCase())).then(
        dd =>{
          var head = dd?.payload[selectedAssets];
          setAssetDataFund(head);
        }
      );
      dispatch(getTradingAccountByCurrency(selectedAssets.toLowerCase())).then(
        dd => {
          var head = dd?.payload[selectedAssets];
          setAssetDataTrad(head);
        }
      );
    }

  }, [selectedAssets]);

  const handleOpenSelectOpen = () => {
    setOpenSelect(true);
  };

  const handleOpenSelectClose = () => {
    setOpenSelect(false);
  };

  const changeDirection = () => {
    if (from === 'trading') {
      setFrom('funding');
      setTo('trading');
    } else {
      setFrom('trading');
      setTo('funding');
    }
  };

  const handleSelection = (value: any) => {
    setSelectedAssets(value?.currency?.toUpperCase());
    handleOpenSelectClose();
  };

  const handleMax = () => {
    var choose = from === 'funding' ? parseFloat(assetDataFund?.availBal)?.toFixed(5).slice(0, -1) : parseFloat(assetDataTrad?.availBal)?.toFixed(5).slice(0, -1);
    var td = choose === "Na" || choose === undefined || !choose ? "0" : choose
    setNumber(td);
  };


  const handleTokenTransfer = async () => {
    const payload = {
      fromAcct : from,
    toAcct : to,
    currency : selectedAssets?.toLowerCase(),
    amount : number
    }
    if(parseInt(number) > assetDataFund?.availBal && from === "funding") {
      return  Notifier.showNotification({
        title: 'Error',
        description: 'Insufficient fund',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });
    }
    if(parseInt(number) > assetDataTrad?.availBal && from === "trading") {
      return  Notifier.showNotification({
        title: 'Error',
        description: 'Insufficient fund',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });
    }
    setLoader(true);
    try {
      var response = await dispatch(transferToken(payload))
      if(transferToken.fulfilled.match(response)){
        setLoader(false)
        dispatch(getFundingAccountByCurrency(selectedAssets.toLowerCase())).then(
          dd =>{
            var head = dd?.payload[selectedAssets];
            setAssetDataFund(head);
          }
        );
        dispatch(getTradingAccountByCurrency(selectedAssets.toLowerCase())).then(
          dd => {
            var head = dd?.payload[selectedAssets];
            setAssetDataTrad(head);
          }
        );
        return navigation.navigate("SuccessScreen",{
          params: {
            header: "Transfer Successful",
            text: `You have successfully transfer ${number} ${selectedAssets} from your ${from} to ${to} account`
          }
        })
      }
      else {
        setLoader(false);
        var errMsg = response?.payload as string;
        Notifier.showNotification({
          title: 'Error',
          description: errMsg,
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
          },
        });
      }
    }
    catch (e){
      setLoader(false);
    }
  };

  return (
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? COLORS.white : COLORS.darkMode}]}>
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <ScrollView>
            <View style={styles.modalView}>
              <HeaderComponent onPress={() => navigation.goBack()} />
              <Text
                style={{...FONTS.h2, fontWeight: '600', textAlign: 'left',color: modeInfo ? COLORS.black : COLORS.white}}>
                Transfer Assets
              </Text>
              <Text
                style={{
                  ...FONTS.body4,
                  textAlign: 'left',
                  color: COLORS.gray,
                }}>
                Select assets you want to transfer
              </Text>

              <View style={[styles.card, { backgroundColor: !modeInfo ? COLORS.lightDark : COLORS.primary2,}]}>
                <View style={styles.row}>
                  <View style={styles.rowDiv}>
                    <Text style={{...FONTS.body4, color: !modeInfo ? COLORS.white : COLORS.gray}}>
                      From:
                    </Text>
                  </View>
                  <View style={styles.cardDiv}>
                    <AnimatedText style={{...FONTS.body4, color: !modeInfo ? COLORS.white : COLORS.gray, fontWeight: '600', textTransform: 'capitalize'}} text={capitalizeWord(from)} />
                    <Image source={stroke} />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.nd} />
                  <View style={[styles.nd1, {borderBottomColor: !modeInfo ? COLORS.white : "rgb(51, 51, 51)"}]} />
                  <TouchableOpacity onPress={() => changeDirection()}>
                    <View style={styles.icon}>
                      <Image
                        source={icons?.trade}
                        resizeMode="contain"
                        style={{
                          width: 20,
                          height: 20,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <View style={styles.rowDiv}>
                    <Text style={{...FONTS.body4, color: !modeInfo ? COLORS.white : COLORS.gray}}>To:</Text>
                  </View>
                  <View style={styles.cardDiv}>
                    <AnimatedText style={{...FONTS.body4, color: !modeInfo ? COLORS.white : COLORS.gray, fontWeight: '600', textTransform: 'capitalize'}} text={capitalizeWord(to)} />
                    <Image source={stroke} />
                  </View>
                </View>
              </View>

              <TouchableOpacity onPress={() => handleOpenSelectOpen()}>
                <View style={[styles.card2, {height: selectedAssets === "Select Token" ? hp(70) : "",backgroundColor: !modeInfo ? COLORS.lightDark : COLORS.primary2}]}>
                  <View>
                    {
                      selectedAssets === "Select Token" ? <Text style={{display: 'none'}}></Text> : <Text style={{...FONTS.body5, color: !modeInfo ? COLORS.white : COLORS.gray}}>
                      Select Token
                    </Text>
                    }
                    
                    <Text style={{...FONTS.body3,color: !modeInfo ? COLORS.white : COLORS.gray}}>{selectedAssets}</Text>
                  </View>
                  <AntDesign name="down" size={10} color={!modeInfo ? COLORS.white : COLORS.gray} />
                </View>
              </TouchableOpacity>

              <View style={[styles.card2, {backgroundColor: !modeInfo ? COLORS.lightDark : COLORS.primary2}]}>
                <View style={{width: '78%'}}>
                  <Text style={{...FONTS.body5, color: !modeInfo ? COLORS.white : COLORS.gray}}>
                    Enter Amount
                  </Text>
                  <TextInput
                    style={[styles.input, {color: !modeInfo ? COLORS.white : COLORS.gray}]}
                    onChangeText={value => setNumber(value)}
                    value={number}
                    placeholder={`0 ${selectedAssets}`}
                    keyboardType="default"
                    
                  />
                </View>
               <TouchableOpacity onPress={() => handleMax()}>
               <View
                  style={{
                    backgroundColor: COLORS.primary,
                    paddingHorizontal: hp(15),
                    paddingVertical: hp(3),
                    borderRadius: 5,
                  }}>
                  <Text style={{...FONTS.body4, color: COLORS.white}}>Max</Text>
                </View>
               </TouchableOpacity>
              </View>
              
              <Text
                style={{
                  ...FONTS.body4,
                  marginVertical: hp(5),
                  color: COLORS.gray,
                }}>{`Avail: ${from === 'funding' ?
                `${format(
                  parseFloat(
                    assetDataFund?.availBal || 0
                  ).toFixed(4),
                )}` : from === 'trading' ?  `${format(
                  parseFloat(
                    assetDataTrad?.availBal || 0
                  ).toFixed(4),
                )}` : 0} ${selectedAssets === "Select Token" ? "" : selectedAssets}`}</Text>

              <View style={{marginTop: hp(10)}}>
                <IconTextButton disabled={number?.length <= 0} label="Transfer Token" isLoading={loader} onPress={handleTokenTransfer} />
              </View>
            </View>
          </ScrollView>
          </KeyboardAwareScrollView>

          <SwapTokenModal
            modalVisible={openSelect}
            setSelectedToken={(value: any) => handleSelection(value)}
            setModalVisible={() => handleOpenSelectClose()}
            selectedToken={null}
            transferType={from}
          />
        
        </View>
      </View>
    </View>
  );
};

export default Transfer;

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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  card: {
    marginVertical: hp(20),
    padding: hp(25),
    borderRadius: 10,
  },
  card2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(15),
    // backgroundColor: COLORS.primary2,
    paddingHorizontal: hp(25),
    paddingVertical: hp(10),
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowDiv: {
    width: '20%',
  },
  cardDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },
  icon: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: hp(10),
    width: wp(35),
    height: hp(35),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: hp(20),
  },
  nd1: {
    width: '60%',
    height: hp(1),
    borderBottomWidth: 0.2,
    // backgroundColor: COLORS.gray,
  },
  nd: {
    width: '20%',
  },
  input: {
    height: 40,
  },
});
