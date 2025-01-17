/* eslint-disable quotes */
/* eslint-disable comma-dangle */
import {View, Text, StyleSheet, ScrollView, Image, Platform} from 'react-native';
import React, {useRef} from 'react';
import GlobalStyle from '../utils/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../utils/constants/theme';
import QRCode from 'react-native-qrcode-svg';
import {copyToClipboard, hp, wp} from '../utils/helper';
import Feather from 'react-native-vector-icons/Feather';
import IconTextButton from '../components/IconTextButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Share from 'react-native-share';
import { captureRef, captureScreen } from 'react-native-view-shot';
import { useAppSelector } from '../app/hooks';
import { modeStatus } from '../slice/TradeSlice';
import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid } from 'react-native';

const DepositAddress = (props: any) => {
  const {chain, address, memo} = props?.route?.params?.data;
  const {token, icon, currency} = props?.route?.params?.otherInfo;
  const ref =  useRef();
  const modeInfo = useAppSelector(modeStatus);
  const viewRef = useRef()



  const onShare = async () => {
    
   if (Platform.OS === "ios") {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.7
      })

      await Share.open({url: uri})
    }
    catch(e) {
      console.log(e)
    }
  }
  else {
    viewRef?.current.toDataURL(async (data: any) => {
      var imageConvert = 'data:image/png;base64,'+data
      var isReadGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      )
      if (isReadGranted === PermissionsAndroid.RESULTS.GRANTED) {
        const dirs = RNFetchBlob.fs.dirs
        var qrcode_data = imageConvert.split('data:image/png;base64,');
        const filePath = dirs.DownloadDir+"/"+'QRCode'+new Date().getSeconds()+'.png'
        RNFetchBlob.fs.writeFile(filePath, qrcode_data[1], 'base64')
        .then(async () =>  {
          const options={
            title: 'Share is your QRcode',
            url: imageConvert,
          }
          await Share.open(options);
        })
        .catch((errorMessage) =>console.log(errorMessage))      
        }

    })
  }
    
  }


  return (

    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
      <View style={GlobalStyle.rowBetween}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <AntDesign
          name="arrowleft"
          size={30}
          color={modeInfo ? COLORS.black : COLORS.white}
          onPress={() => props?.navigation.goBack()}
        />
        </TouchableOpacity>
        <Text style={{...FONTS.h3, fontWeight: '600',color: modeInfo ? COLORS.black : COLORS.white}}>Deposit {token}</Text>
        <View></View>
      </View>
      {
        Platform.OS === "android" &&  <View style={styles.bb}>
     <Image source={icon} style={{width: 50, height: 50}} />
     </View>
      }
   
      <View style={styles.top} ref={viewRef}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.barCode}>
            <View style={{backgroundColor: modeInfo ? "transparent" : COLORS.white, padding: 10}}>
              <QRCode
                value={address}
                size={200}
                logo={Platform.OS === "ios" && icon}
                logoSize={50}
                logoBackgroundColor='transparent'
              />
            </View>
               
          </View>
          <View>
            <View style={styles.service}>
              <Text style={{...FONTS.body4, color: modeInfo ? COLORS.gray : COLORS.white}}>
                Wallet Address
              </Text>
              <View style={GlobalStyle.rowStart}>
                <Text style={{...FONTS.h4,fontWeight: '600', marginRight: hp(20), width:wp(250),color: modeInfo ? COLORS.black : COLORS.white}}>
                  {address}
                </Text>
                <Feather
                  name="copy"
                  size={20}
                  color={modeInfo ? COLORS.black : COLORS.white}
                  onPress={() => copyToClipboard(address)}
                />
              </View>
            </View>
            {
              memo &&   <View style={styles.service}>
              <Text style={{...FONTS.body4, color: modeInfo ? COLORS.gray : COLORS.white}}>
                Memo
              </Text>
              <View style={GlobalStyle.rowStart}>
                <Text style={{...FONTS.h4,fontWeight: '600', marginRight: hp(20),color: modeInfo ? COLORS.black : COLORS.white}}>
                  {memo}
                </Text>
                <Feather
                  name="copy"
                  size={20}
                  color={modeInfo ? COLORS.black : COLORS.white}
                  onPress={() => copyToClipboard(memo)}
                />
              </View>
            </View>
            }
            <View style={styles.service}>
              <Text style={{...FONTS.body4, color: modeInfo ? COLORS.gray : COLORS.white}}>
                Network
              </Text>
              <View style={GlobalStyle.rowStart}>
                <Text style={{...FONTS.h4,fontWeight: '600',color: modeInfo ? COLORS.black : COLORS.white, marginRight: hp(20)}}>{chain}</Text>
              </View>
            </View>
            <View style={[styles.card]}>
              <Text style={{...FONTS.h4, fontWeight: '600',  color: modeInfo ? COLORS.gray : COLORS.white}}>Important Information</Text>
              <View style={styles.strt}>
                <Text style={{fontSize: hp(20),color: modeInfo ? COLORS.black : COLORS.white}}>{'\u2022'}</Text>
                <Text style={{...FONTS.body4, color: modeInfo ? COLORS.gray : COLORS.white}}>
                  {' '}
                  Send only {currency} to this address
                </Text>
              </View>
              <View style={styles.strt}>
                <Text style={{fontSize: hp(20),color: modeInfo ? COLORS.black : COLORS.white}}>{'\u2022'}</Text>
                <Text style={{...FONTS.body4, color: modeInfo ? COLORS.gray : COLORS.white}}>
                  {' '}
                  Sending coin or token other than {currency} ({chain}) to this
                  address will result to lose of your crypto asset
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottom}>
        <View style={GlobalStyle.rowBetween}>
          <View style={styles.btn}>
            <TouchableOpacity onPress={() => copyToClipboard(address)}>
              <View style={styles.save}>
                <Text style={{color: COLORS.primary}}>Save Address</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <IconTextButton label="Share Address" onPress={onShare} />
          </View>
        </View>
      </View>
    </View>
 
  );
};

export default DepositAddress;

const styles = StyleSheet.create({
  box: {
    width: wp(250),
    height: hp(250),
  },
  barCode: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(40),
    marginBottom: hp(50),
  },
  service: {
    marginTop: hp(10),
  },
  card: {
    borderRadius: hp(10),
    marginVertical: hp(15)
  },
  strt: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: hp(5),
  },
  top: {
    flex: 7,
  },
  bottom: {
    flex: 2,
  },
  btn: {
    width: '48%',
    marginVertical: hp(20),
  },
  save: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(65),
  },
  bb: {
    position: 'absolute',
    top: "22%",
    left: "48%",
    zIndex: 11111
  }
});
