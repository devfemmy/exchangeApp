import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import { COLORS, FONTS } from '../utils/constants/theme';
import { hp } from '../utils/helper';
import IconTextButton from "../components/IconTextButton";

import SuccessIcon from '../assets/svg/success.svg';
// import HeaderComponent from '../components/HeaderComponent';

const SuccessScreen = (props: any) => {
  const header = props?.route?.params?.params?.header
  const text = props?.route?.params?.params?.text


  return (
    <View style={[GlobalStyle.container, {flex: 1}]}>
      {/* <HeaderComponent onPress={() => navigation.goBack()} /> */}
      <View style={styles.div}>
      <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: hp(-70)}}>
      <SuccessIcon />
      </View>
        <Text style={{...FONTS.h2, textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', color: COLORS.successGreen, marginVertical: hp(30)}}>{header}</Text>
        <Text style={{...FONTS.body4, textAlign: 'center', marginTop: hp(-20)}}>{text}</Text>
      </View> 
     <View style={styles.div2}>
     <IconTextButton label="Continue" onPress={() => props?.navigation.navigate("MainLayout")} />
     </View>
    </View>
  )
}

export default SuccessScreen

const styles = StyleSheet.create({
    div: {
      justifyContent: 'center',
      flex: 5
    },
    div2: {
      flex: 1
    },
  });
  