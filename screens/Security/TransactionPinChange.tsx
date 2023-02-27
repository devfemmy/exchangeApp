/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants/theme';
import MainLayout from '../mainLayout';
import { hp } from '../../utils/helper';
import HeaderComponent from '../../components/HeaderComponent';
import GlobalStyle from '../../utils/globalStyle';
import OTPTextView from 'react-native-otp-textinput';

export default function ChangeTransactionPin({navigation}: any) {
  const styles = StyleSheet.create({
    textStyle: {
      marginVertical: hp(15),
      color: '#4F4F4F',
      lineHeight: 20,
    },
    textInputContainer: {
      backgroundColor: COLORS.primary2,
      borderRadius: 5,
      color: COLORS.primary,
      borderWidth: 0,
    },
  });
  return (
    <View style={[GlobalStyle.container]}>
      <MainLayout>
        <ScrollView>
          <HeaderComponent onPress={() => navigation.goBack()} />
          <Text style={{...FONTS.h2}}>Enter your Transaction Pin</Text>
          <Text style={styles.textStyle}>Protect all delecate informations on this application to prevents intruder</Text>
          <View style={{marginVertical: 8, padding: 30}}>
            <OTPTextView
              tintColor={COLORS.primary}
              textInputStyle={styles.textInputContainer}
              handleTextChange={(text: string) => console.log(text)}
              inputCount={4}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
        </ScrollView>
      </MainLayout>
    </View>
  );
}
