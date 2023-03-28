import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import { COLORS, FONTS } from '../utils/constants/theme';
import { hp } from '../utils/helper';
import IconTextButton from "../components/IconTextButton";
import { success } from '../assets/images';
// import HeaderComponent from '../components/HeaderComponent';

const SuccessScreen = ({navigation}: any) => {
  return (
    <View style={[GlobalStyle.container, {flex: 1}]}>
      {/* <HeaderComponent onPress={() => navigation.goBack()} /> */}
      <View style={styles.div}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={success} style={{width: 100, height: 100, marginVertical: hp(0)}} />
      </View>
        <Text style={{...FONTS.body2, textAlign: 'center', fontWeight: 'bold', color: COLORS.darkGreen, marginVertical: hp(30)}}>Action Successful</Text>
      </View> 
     <View style={styles.div2}>
     <IconTextButton label="Continue" onPress={() => navigation.navigate("MainLayout")} />
     </View>
    </View>
  )
}

export default SuccessScreen

const styles = StyleSheet.create({
    div: {
      justifyContent: 'flex-end',
      flex: 5
    },
    div2: {
      flex: 1
    },
  });
  