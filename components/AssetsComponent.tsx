import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

import { COLORS, FONTS } from '../utils/constants/theme';
import { format, hp, wp } from '../utils/helper';
import GlobalStyle from '../utils/globalStyle';
import FastImage from 'react-native-fast-image';

const AssetsComponent = ({info, data, handleClick, tradingAccountInfo}: any) => {
console.log({tradingAccountInfo})




  return (
    <TouchableOpacity onPress={() => handleClick(info, data)}>
    <View style={styles.actionCard2}>
      <View style={GlobalStyle.rowStart}>
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
          <Text style={{...FONTS.h3}}>
            {info?.token}
          </Text>
          {/* <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.gray,
              }}>{`$${format(data?.current_price.toFixed(2))}`}</Text>
            <Text
              style={{
                ...FONTS.body5,
                marginLeft: hp(4),
                color:
                  data?.price_change_percentage_24h === 0
                    ? COLORS.lightGray
                    : data?.price_change_percentage_24h > 0
                    ? COLORS.darkGreen
                    : COLORS.red,
              }}>{`${
              data?.price_change_24h.toFixed(2) +
              ' ' +
              `(${data?.price_change_percentage_24h.toFixed(2)})%`
            }`}</Text>
          </View> */}
        </View>
      </View>
      <View
        style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <Text style={{...FONTS.body5}}>{`${format(
          tradingAccountInfo?.[info?.currency?.toUpperCase()]?.availBal ?   `${parseFloat(tradingAccountInfo?.[info?.currency?.toUpperCase()]?.availBal).toFixed(2)}` : 0     
        )}`}</Text>
        <Text style={{...FONTS.body5, fontWeight: '600'}}>{`$${format(
          tradingAccountInfo?.[info?.currency?.toUpperCase()]?.availBal ?   parseFloat(tradingAccountInfo?.[info?.currency?.toUpperCase()]?.availBal).toFixed(2) : 0     
        )}`}</Text>  

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
