import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import SwapHeader from '../components/SwapHeader';
import {COLORS, FONTS} from '../utils/constants/theme';
import {hp} from '../utils/helper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import PrepaidCard from '../components/PrepaidCard';
import { useAppSelector } from '../app/hooks';
import { modeStatus } from '../slice/TradeSlice';

const ZendPrepaid = ({navigation}: any) => {
  const modeInfo = useAppSelector(modeStatus);

  
  return (
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : "#1a202c"}]}>
      <SwapHeader
        header="History"
        handlePress={() => navigation?.navigate('ZendPrepaidHistory')}
      />
      <Text style={{...FONTS.h3, fontWeight: '600'}}>Zend Prepaid</Text>

      <View style={styles.cardDiv}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.card}>
            <Text style={{...FONTS.h5, color: COLORS.white}}>
              Available Balance in USDT
            </Text>
            <Text
              style={{...FONTS.h1, fontWeight: '600', color: COLORS.white}}>
              $2,000
            </Text>
          </View>
          {/* <View style={styles.card}>
          <Text style={{...FONTS.h5, color: COLORS.white}}>
            Available Balance in USDT
          </Text>
          <Text style={{...FONTS.h1, fontWeight: '600', color: COLORS.white}}>
            $2,000
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={{...FONTS.h5, color: COLORS.white}}>
            Available Balance in USDT
          </Text>
          <Text style={{...FONTS.h1, fontWeight: '600', color: COLORS.white}}>
            $2,000
          </Text>
        </View> */}
        </ScrollView>
      </View>

      <View style={GlobalStyle.rowBetween}> 
      <View style={styles.div}>
        <TouchableOpacity onPress={() => navigation?.navigate("TransferAsset")}>
            <View style={GlobalStyle.rowStart}>
            <Entypo name="direction" size={20} style={{marginRight: hp(5)}} />
              <Text style={{...FONTS.body5, color: COLORS.lightBlack, textAlign: 'center'}}>Transfer Assets</Text>
            </View>
        </TouchableOpacity> 
        </View>
        <View style={styles.div}>
        <TouchableOpacity onPress={() => navigation?.navigate("GiftCard")}>
          <View style={GlobalStyle.rowStart}>
            <Entypo name="direction" size={20} style={{marginRight: hp(5)}} />
            <Text style={{...FONTS.body5, color: COLORS.lightBlack, textAlign: 'center'}}>Convert GiftCard</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop: hp(30)}}>
        <PrepaidCard />
        <PrepaidCard />
        <PrepaidCard />
        <PrepaidCard />
      </View>
    </View>
  );
};

export default ZendPrepaid;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    height: hp(120),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginRight: hp(10),
  },
  cardDiv: {
    marginVertical: hp(20),
  },
  div: {
    backgroundColor: COLORS.primary2,
    borderRadius: hp(10),
    padding: hp(10),
    width: "48%",
    justifyContent: 'center',
    alignItems:'center'
  },

});
