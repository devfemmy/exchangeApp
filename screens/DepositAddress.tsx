import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../utils/constants/theme';
import QRCode from 'react-native-qrcode-svg';
import {copyToClipboard, hp, wp} from '../utils/helper';
import Feather from 'react-native-vector-icons/Feather';
import IconTextButton from '../components/IconTextButton';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DepositAddress = (props: any) => {
  const {chain, address} = props?.route?.params?.data;
  const {token, icon, currency} = props?.route?.params?.otherInfo;

 

  return (
    <View style={GlobalStyle.container}>
      <View style={GlobalStyle.rowBetween}>
        <AntDesign
          name="arrowleft"
          size={30}
          onPress={() => props?.navigation.goBack()}
        />
        <Text style={{...FONTS.h3, fontWeight: '600'}}>Deposit {token}</Text>
        <View></View>
      </View>

      <View style={styles.top}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.barCode}>
               <QRCode
                value={address}
                size={200}
                logo={icon}
      logoSize={50}
      logoBackgroundColor='transparent'
              />
          </View>
          <View>
            <View style={styles.service}>
              <Text style={{...FONTS.body4, color: COLORS.gray}}>
                Wallet Address
              </Text>
              <View style={GlobalStyle.rowStart}>
                <Text style={{...FONTS.h4,fontWeight: '600', marginRight: hp(20)}}>
                  {address.substr(0, 15)}
                </Text>
                <Feather
                  name="copy"
                  size={20}
                  onPress={() => copyToClipboard(address)}
                />
              </View>
            </View>
            <View style={styles.service}>
              <Text style={{...FONTS.body4, color: COLORS.gray}}>
                Network
              </Text>
              <View style={GlobalStyle.rowStart}>
                <Text style={{...FONTS.h4,fontWeight: '600', marginRight: hp(20)}}>{chain}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <Text style={{...FONTS.h4, fontWeight: '600'}}>Important Information</Text>
              <View style={styles.strt}>
                <Text style={{fontSize: hp(20)}}>{'\u2022'}</Text>
                <Text style={{...FONTS.body4, color: COLORS.gray}}>
                  {' '}
                  Send only {currency} to this address
                </Text>
              </View>
              <View style={styles.strt}>
                <Text style={{fontSize: hp(20)}}>{'\u2022'}</Text>
                <Text style={{...FONTS.body4, color: COLORS.gray}}>
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
            <IconTextButton label="Share Address" />
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
    backgroundColor: COLORS.lightGray2,
    padding: hp(15),
    borderRadius: hp(10),
    marginVertical: hp(15),
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
});
