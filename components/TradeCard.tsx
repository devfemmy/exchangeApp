import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { stroke } from '../assets/images';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import GlobalStyle from '../utils/globalStyle';
import { COLORS, FONTS } from '../utils/constants/theme';
import { hp } from '../utils/helper';
import { useNavigation } from '@react-navigation/native';

const TradeCard = ( {data}: any) => {
    const navigation = useNavigation() as any;
    const {icon, header, title, navigationScreen, comingSoon} = data;

  return (
   <View style={styles.row}>
    <TouchableOpacity onPress={comingSoon ? () => {} : () => navigation?.navigate(navigationScreen)}>
     <View style={[GlobalStyle.rowBetween, styles.view]}>
        <View style={{width: '15%'}}>
        <View style={styles.img}>
            {icon === 'dollar' ?
        <Fontisto size={22} name={icon} color={COLORS.primary} />  :
        <AntDesign size={22} name={icon} color={COLORS.primary} />
        }
        </View>
        </View>
        <View style={{width: '70%'}}>
        <Text style={{...FONTS.body3, color: COLORS.black, fontWeight: '500'}}>{header}</Text>
        <Text style={{...FONTS.body4, color: COLORS.gray}}>{title}</Text>
        </View>
        <View style={{width: '5%'}}>
        <Image source={stroke} />
        </View>
    </View>
   </TouchableOpacity>
   </View>
  );
};

export default TradeCard;

const styles = StyleSheet.create({
    row: {
        // paddingVertical: hp(10)
        width: '100%',
    },
    view: {
        width: '100%',
        // flexDirection: 'row',
        // alignItems: 'center',
        paddingVertical: hp(15),
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(128, 128, 128, 0.15)',
    },
    img: {
        backgroundColor: COLORS.primary2,
        borderRadius: 25,
        width: hp(50),
        height: hp(50),
        marginRight: hp(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
