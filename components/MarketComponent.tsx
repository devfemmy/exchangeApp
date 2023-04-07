import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import FastImage from 'react-native-fast-image';
import { format, hp, wp } from '../utils/helper';
import { COLORS, FONTS } from '../utils/constants/theme';

const MarketComponent = ({info, navigation,type}: any) => {

  return (
    <TouchableOpacity
    onPress={type === 'funding' ? () =>
      navigation.navigate('AssetInfo', {
        currency: info?.currency,
        assetType: type,
        icon: info?.icon,
        name: info?.token,
      })
      : () => {}
    }>
    <View style={styles.actionCard2}>
      <View style={[GlobalStyle.rowStart, {width: '30%'}]}>
        <FastImage
        style={styles.icons}
        defaultSource={info?.icon}
        source={{
            uri: '',
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
    />
        <View style={{marginLeft: hp(10)}}>
          <Text style={{...FONTS.body3, color: COLORS.lightBlack, fontWeight: '600'}}>
            {info?.token}
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.lightBlack, textTransform: 'uppercase'}}>
            {info?.currency}
          </Text>
        </View>

      </View>
   
     <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', width: "30%"}}>
                 <Text style={{...FONTS.h3,color: COLORS.lightBlack}}>{info?.availBalance % 1 === 0 ? `${format(info?.availBalance ? parseFloat(info?.availBalance) : 0)}`   : `${format(info?.availBalance ? parseFloat(info?.availBalance)?.toFixed(5).slice(0, -1) : 0)}`}</Text>
                 <Text style={{...FONTS.h3,color: COLORS.lightBlack}}>{info?.balUsd % 1 === 0 ? `$${format(info?.balUsd ? parseFloat(info?.balUsd) : 0)}` : `$${format(info?.balUsd ? parseFloat(info?.balUsd)?.toFixed(3).slice(0, -1) : 0)}`}</Text>
                 </View>
    </View>
  </TouchableOpacity>
  );
};

export default MarketComponent;


const styles = StyleSheet.create({
    actionCard2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(15),
        borderColor: COLORS.primary2,
        borderWidth: 1,
        paddingHorizontal: hp(10),
        paddingVertical: hp(15),
        borderRadius: 5,
      },
      icons: {
        width: wp(35),
        height: hp(35),
      },
});
