import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

import { COLORS, FONTS } from '../utils/constants/theme';
import { format, hp, wp } from '../utils/helper';
import GlobalStyle from '../utils/globalStyle';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppSelector } from '../app/hooks';
import { modeStatus } from '../slice/TradeSlice';

const AssetsComponent = ({info, data, handleClick}: any) => {
  const modeInfo = useAppSelector(modeStatus);




  return (
    <TouchableOpacity onPress={() => handleClick(info, data)}>
    <View style={[styles.actionCard2, {backgroundColor: !modeInfo ? COLORS.lightDark : "#f1f3fe"}]}>
      <View style={GlobalStyle.rowStart}>
      {/* <FastImage
        style={styles.icons}
        defaultSource={info?.icon}
        source={{
            uri: '',
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
    /> */}
            <Image
          source={{uri: info?.icon}}
          resizeMode='contain'
          style={styles.icons}
        />
    {/* <Image style={styles.icons} defaultSource={require('../assets/images/placeholder.png')} source={{uri: info?.icon}} /> */}
        <View style={{marginLeft: hp(10)}}>
          <Text style={{...FONTS.body3, color:!modeInfo ? COLORS.white : COLORS.black }}>
            {info?.token} ({info?.currency?.toUpperCase()})
          </Text>
        </View>
      </View>
      <View
        style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <Text style={{...FONTS.h5,color:!modeInfo ? COLORS.white : COLORS.lightBlack}}>{`${format(info?.availBalance ? parseFloat(info?.availBalance)?.toFixed(4) : 0)}`}</Text>
                 <Text style={{...FONTS.h5,color:!modeInfo ? COLORS.white : COLORS.lightBlack}}>{`$${format(info?.balUsd ? parseFloat(info?.balUsd)?.toFixed(2) : 0)}`}</Text>

      </View>
    </View>
  </TouchableOpacity>
  );
};

export default AssetsComponent;


const styles = StyleSheet.create({
    icons: {
        width: wp(30),
        height: hp(30),
      },
      actionCard2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(15),
        paddingBottom: hp(10),
        padding: 10,
        borderRadius: 10,
        borderColor: COLORS.lightPrimary,
        backgroundColor: '#f1f3fe',
        borderWidth: 1,
        paddingVertical: hp(15)
      },
});
