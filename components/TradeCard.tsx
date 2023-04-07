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
import EvilIcons from 'react-native-vector-icons/EvilIcons';

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
        <Fontisto size={20} name={icon} color={COLORS.black} />  :
        icon === "external-link" ?  <EvilIcons  name={icon} size={30} color={COLORS.black} /> :
        header === "Transfer" ? icon : <AntDesign size={20} name={icon} color={COLORS.black} />
        }
        </View>
        </View>
        <View style={{width: '70%'}}>
        <Text style={{...FONTS.body3, color: COLORS.black, fontWeight: '500'}}>{header}</Text>
        <Text style={{...FONTS.body5, color: COLORS.gray}}>{title}</Text>
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
        paddingVertical: hp(12),
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(128, 128, 128, 0.15)',
    },
    img: {
        backgroundColor: "rgb(226, 230, 253)",
        borderRadius: 25,
        width: hp(40),
        height: hp(40),
        marginRight: hp(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
