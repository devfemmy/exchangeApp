import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import HeaderComponent from '../components/HeaderComponent';
import {FONTS} from '../utils/constants/theme';
import {hp} from '../utils/helper';

const Instructions = ({navigation}: any) => {
  return (
    <View style={GlobalStyle.container}>
      <HeaderComponent onPress={() => navigation.goBack()} />
      <Text style={{...FONTS.h3, fontWeight: '600'}}>Instructions</Text>

      <View style={{marginTop: hp(20)}}>
        <View style={styles.div}>
          <Text style={{fontSize: hp(20), marginRight: hp(5)}}>{'\u2022'}</Text>
          <Text style={{...FONTS.body3}}>
            {' '}
            Make sure you upload a valid invoice. Fake invoice will be rejected
            and transaction will be canceled
          </Text>
        </View>
        <View style={styles.div}>
          <Text style={{fontSize: hp(20), marginRight: hp(5)}}>{'\u2022'}</Text>
          <Text style={{...FONTS.body3}}>
            {' '}
            Confirm receiver's details before initiating USD Payment
          </Text>
        </View>
        <View style={styles.div}>
          <Text style={{fontSize: hp(20), marginRight: hp(5)}}>{'\u2022'}</Text>
          <Text style={{...FONTS.body3}}>
            {' '}
            Zend Wallet only offer payments to company or business accounts
          </Text>
        </View>
        <View style={styles.div}>
          <Text style={{fontSize: hp(20), marginRight: hp(5)}}>{'\u2022'}</Text>
          <Text style={{...FONTS.body3}}>
            {' '}
            Receiver gets USD Payments within 24 - 48 hours ( Business working days )
          </Text>
        </View>
        <View style={styles.div}>
          <Text style={{fontSize: hp(20), marginRight: hp(5)}}>{'\u2022'}</Text>
          <Text style={{...FONTS.body3}}>
            {' '}
            Zend Wallet will only process valid and legitimate USD Payments
          </Text>
        </View>
        <View style={styles.div}>
          <Text style={{fontSize: hp(20), marginRight: hp(5)}}>{'\u2022'}</Text>
          <Text style={{...FONTS.body3}}>
            {' '}
            Zend wallet will provide sender receipt within 24 - 28 hours (Business working days) after making USD Payment
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  div: {
    flexDirection: 'row',
    marginVertical: hp(10)
  },
});
