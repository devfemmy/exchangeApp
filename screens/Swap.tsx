/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../utils/constants/theme';
import {format, hp, wp} from '../utils/helper';
import {TextInput} from '../components/TextInput';
import {tokenBalanceData} from '../utils/constants/tokenList';
import GlobalStyle from '../utils/globalStyle';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {getMarketPrice, marketInfo, modeStatus} from '../slice/TradeSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AssetsComponent from '../components/AssetsComponent';
import SwapHeader from '../components/SwapHeader';


const Swap = ({navigation}: any) => {
  const [value, setValue] = useState('');
  const marketInfos = useAppSelector(marketInfo) as any;
  const modeInfo = useAppSelector(modeStatus);
  const searchToken = !value
    ? tokenBalanceData
    : tokenBalanceData?.filter(
        (data: any) =>
          data?.currency?.toLowerCase().includes(value?.toLowerCase()) ||
          data?.token?.toLowerCase().includes(value?.toLowerCase()),
      );

  const assets = () => {
    return marketInfos?.map((data: any) => {
      return searchToken?.map((info: any) => {
        return (
          info?.currency === data?.symbol && (
            <AssetsComponent info={info} data={data} handleClick={(info: any, data: any) => navigation.navigate("SwapCard", {
              info: info,
              data: data
            })} />

          )
        );
      });
    });
  };

  return (
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? COLORS.white : COLORS.darkMode}]}>
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <SwapHeader header="Swap History" handlePress={() => navigation.navigate("SwapHistory")} />

            <Text style={{...FONTS.h2, fontWeight: '600', textAlign: 'left', color:modeInfo ? COLORS.black : COLORS.white}}>Swap</Text>
            <Text
              style={{
                ...FONTS.body4,
                textAlign: 'left',
                color:modeInfo ? COLORS.gray : COLORS.white
              }}>
              Select token you want to swap
            </Text>
            <View style={styles.search}>
              <TextInput
                label={'Search Assets'}
                value={value}
                onChangeText={(value: any) => setValue(value)}
                searchInput
                style={{backgroundColor: !modeInfo ? COLORS.darkMode : COLORS.ldPrimary,color:modeInfo ? COLORS.black : COLORS.white}}
              />
            </View>
            <ScrollView>{assets()}</ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Swap;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 10,
    height: hp(650),
  },
  end: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: hp(20),
  },
  search: {
    marginVertical: hp(15),
  },
  icons: {
    width: wp(20),
    height: hp(20),
  },
  actionCard2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(10),
    paddingBottom: hp(10),
    padding: 10,
    borderRadius: 10,
  },

});
