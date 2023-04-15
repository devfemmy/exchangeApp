import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import {COLORS, FONTS} from '../utils/constants/theme';
import {hp, wp} from '../utils/helper';
import { tether } from '../assets/images';
import IconTextButton from '../components/IconTextButton';
import HeaderComponent from '../components/HeaderComponent';
import { useAppSelector } from '../app/hooks';
import { modeStatus } from '../slice/TradeSlice';

const TransferAsset = ({navigation}: any) => {
  const modeInfo = useAppSelector(modeStatus);
  
  return (
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : "#1a202c"}]}>
      <View style={GlobalStyle.rowBetween}>
        {/* <AntDesign name="arrowleft" size={hp(25)} onPress={() => navigation?.goBack()} />
         */}
          <HeaderComponent onPress={() => navigation.goBack()} />
        <Text style={{...FONTS.h3, fontWeight: '600'}}>Transfer Asset</Text>
        <View />
      </View>

      <View style={[GlobalStyle.rowBetween, {marginVertical: hp(15)}]}>
        <View style={{width: wp(250)}}> 
            <Text style={{...FONTS.body4, color: COLORS.gray}}>Move USDT from your Zend prepaid wallet to your main account</Text>
        </View>
        <Image source={tether} style={styles.icons} />
      </View>

      <View style={{width: wp(250)}}> 
            <Text style={{...FONTS.body4, color: COLORS.gray}}>From: Zend prepaid wallet</Text>
            <Text style={{...FONTS.body4}}>To: Main Zend wallet</Text>
        </View>

        <View style={{width: "100%", height: hp(2), backgroundColor: COLORS.lightGray2, marginVertical: hp(30)}} />
    
        <View style={styles.card}>
            <Text style={{...FONTS.largeTitle, fontWeight: '600'}}>$1,000</Text>
            <Text style={{...FONTS.body4, color: COLORS.gray}}>10 USDT</Text>
        </View>

        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(40)}]}>
            <View>
                <Text style={{...FONTS.body5, color: COLORS.gray}}>Available Balance</Text>
                <Text style={{...FONTS.body3, fontWeight: '600'}}>$200</Text>
            </View>

            <View style={styles.box}>
                <Text style={{...FONTS.body5, textAlign: "center"}}>Transfer Max</Text>
            </View>
        </View>

        <IconTextButton label="Transfer Token" />

       
    </View>

  );
};

export default TransferAsset;

const styles = StyleSheet.create({
    icons: {
        width: wp(40),
        height: hp(40)
    },
    card: {
        height: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray2,
        padding: hp(10),
        width: wp(120)
    }
})