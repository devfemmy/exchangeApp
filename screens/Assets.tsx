/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import {View, Text, ScrollView, StyleSheet, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import MainLayout from './mainLayout';
import GlobalStyle from '../utils/globalStyle';
import {COLORS, FONTS} from '../utils/constants/theme';
import {format, hp, wp} from '../utils/helper';
import IconTextButton from '../components/IconTextButton';
import {TextInput} from '../components/TextInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { tokenBalanceData } from '../utils/constants/tokenList'
import { getMarketPrice, marketInfo } from '../slice/TradeSlice'
import { useAppSelector } from '../app/hooks';
import TransferModal from '../components/Modals/TransferModal';


const Assets = ({navigation}: any) => {
  const [type, setType] = useState('funding');
  const marketInfos = useAppSelector(marketInfo) as any
  const [transferModal, setTransferModal] = useState(false)

  const showFundingAssets = () => {
    return tokenBalanceData?.map(info => {
      return  <TouchableOpacity onPress={() => navigation.navigate("AssetInfo", {
        assets: info
       })}>
          <View style={styles.actionCard2}>
        <View style={GlobalStyle.rowStart}>
         <Image source={info?.icon} resizeMode='cover' style={styles.icons} />
           <View style={{marginLeft: hp(10)}}>
             <Text style={{...FONTS.body3, fontWeight: "bold"}}>{info?.token}</Text>
             <Text style={{...FONTS.body5, textTransform: 'uppercase'}}>{info?.currency}</Text>
           </View>
        </View>
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <Text style={{...FONTS.body5, fontWeight: "bold"}}>{`$${format(0)}`}</Text>
             <Text style={{...FONTS.body5}}>0</Text>
        </View>
     </View>
        </TouchableOpacity>
     })
  }

  const handleTransferOpen = () => {
    setTransferModal(true)
}

const handleTransferClose = () => {
  setTransferModal(false)
}

  const showTradingAssets = () => {
    return tokenBalanceData?.map(info => {
      return  <TouchableOpacity onPress={() => navigation.navigate("AssetInfo", {
        assets: info
       })}>
          <View style={styles.actionCard2}>
        <View style={GlobalStyle.rowStart}>
         <Image source={info?.icon} resizeMode='cover' style={styles.icons} />
           <View style={{marginLeft: hp(10)}}>
             <Text style={{...FONTS.body3, fontWeight: "bold"}}>{info?.token}</Text>
             <Text style={{...FONTS.body5, textTransform: 'uppercase'}}>{info?.currency}</Text>
           </View>
        </View>
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <Text style={{...FONTS.body5, fontWeight: "bold"}}>{`$${format(0)}`}</Text>
             <Text style={{...FONTS.body5}}>0</Text>
        </View>
     </View>
        </TouchableOpacity>
     })
}

  return (
    <MainLayout>
      <View style={GlobalStyle.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{...FONTS.h2, marginBottom: hp(5)}}>Assets</Text>
          <View style={GlobalStyle.rowBetween}>
            <Text style={{...FONTS.body5, width: wp(200)}}>
              Buy, Sell and Swap all of the assets offered by our wallet
            </Text>
            <View style={styles.div}>
              <IconTextButton label="Transfer" onPress={() => handleTransferOpen()} />
            </View>
          </View>
          <View style={styles.search}>
            <TextInput label={'Search Assets'} value={''} searchInput />
          </View>
          <View style={GlobalStyle.rowStart}>
            <View
              style={{
                width: '50%',
                borderBottomColor:
                  type === 'funding' ? COLORS.primary : COLORS.gray2,
                borderBottomWidth: 1,
                paddingBottom: hp(5),
              }}>
              <Pressable onPress={() => setType('funding')}>
                <Text
                  style={{
                    ...FONTS.h3,
                    textAlign: 'center',
                    color: type === 'funding' ? COLORS.primary : COLORS.gray2,
                  }}>
                  Funding Balance
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: '50%',
                borderBottomColor:
                  type === 'trading' ? COLORS.primary : COLORS.lightGray3,
                borderBottomWidth: 1,
                paddingBottom: hp(5),
              }}>
              <Pressable onPress={() => setType('trading')}>
                <Text
                  style={{
                    ...FONTS.h3,
                    textAlign: 'center',
                    color: type === 'trading' ? COLORS.primary : COLORS.lightGray3,
                  }}>
                  Trading Balance
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={[GlobalStyle.rowBetween, {marginVertical: hp(15)}]}>
          <Text style={{...FONTS.body4, color: COLORS.lightGray3}}>
             Tokens
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.lightGray3}}>
             Assets
            </Text>
          </View>
          {
            type === "funding" && showFundingAssets()
          }
           {
            type === "trading" && showTradingAssets()
          }

<TransferModal modalVisible={transferModal} setModalVisible={() => handleTransferClose()} />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Assets;

const styles = StyleSheet.create({
  div: {
    width: wp(100),
  },
  search: {
    marginVertical: hp(15),
  },
  actionCard2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(10),
    paddingBottom: hp(10),
    borderBottomColor: COLORS.gray2,
    borderBottomWidth: 1
  },
  icons: {
    width: wp(20),
    height: hp(20)
  },
});
