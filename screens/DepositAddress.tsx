import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../utils/constants/theme';
import BarcodeCreatorViewManager, {
  BarcodeFormat,
} from 'react-native-barcode-creator';
import {copyToClipboard, hp, wp} from '../utils/helper';
import Feather from 'react-native-vector-icons/Feather';
import IconTextButton from '../components/IconTextButton';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DepositAddress = (props: any) => {
  const {chain, address} = props?.route?.params?.data;
  const {token, currency} = props?.route?.params?.otherInfo;

  return (
    <View style={GlobalStyle.container}>
      <View style={GlobalStyle.rowBetween}>
        <AntDesign
          name="arrowleft"
          size={30}
          onPress={() => props?.navigation.goBack()}
        />
        <Text style={{...FONTS.h3}}>Deposit {token}</Text>
        <View></View>
      </View>

      <View style={styles.top}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.barCode}>
            <BarcodeCreatorViewManager
              value={address}
              background={'#000000'}
              foregroundColor={'#FFFFFF'}
              format={BarcodeFormat.QR}
              style={styles.box}
            />
          </View>
          <View>
            <View style={styles.service}>
              <Text style={{...FONTS.body4, color: COLORS.lightGray3}}>
                Wallet Address
              </Text>
              <View style={GlobalStyle.rowStart}>
                <Text style={{...FONTS.h4, marginRight: hp(20)}}>
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
              <Text style={{...FONTS.body4, color: COLORS.lightGray3}}>
                Network
              </Text>
              <View style={GlobalStyle.rowStart}>
                <Text style={{...FONTS.h4, marginRight: hp(20)}}>{chain}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <Text style={{...FONTS.h4}}>Important Information</Text>
              <View style={styles.strt}>
                <Text style={{fontSize: hp(20)}}>{'\u2022'}</Text>
                <Text style={{...FONTS.body4, color: COLORS.lightGray3}}>
                  {' '}
                  Send only {currency} to this address
                </Text>
              </View>
              <View style={styles.strt}>
                <Text style={{fontSize: hp(20)}}>{'\u2022'}</Text>
                <Text style={{...FONTS.body4, color: COLORS.lightGray3}}>
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
    width: wp(300),
    height: hp(300),
  },
  barCode: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(30),
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
