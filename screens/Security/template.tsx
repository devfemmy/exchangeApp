import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants/theme';
import MainLayout from '../mainLayout';
import { hp } from '../../utils/helper';
import HeaderComponent from '../../components/HeaderComponent';
import GlobalStyle from '../../utils/globalStyle';

export default function Template({navigation}: any) {
  const styles = StyleSheet.create({
    icon: {
      marginVertical: hp(20),
    },
  })
  return (
    <View style={[GlobalStyle.container]}>
      <MainLayout>
        <ScrollView>
          <HeaderComponent onPress={() => navigation.goBack()} />
          <Text style={{...FONTS.h2}}>Edit Profile</Text>
        </ScrollView>
        <Text>Security</Text>
      </MainLayout>
    </View>
  )
}