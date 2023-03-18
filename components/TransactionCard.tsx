import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../utils/constants/theme';
import {hp, wp} from '../utils/helper';
import {useNavigation} from '@react-navigation/native';

const TransactionCard = ({data}: any) => {
  const {header, icon, navigationScreen, color, title} = data;
  const navigation = useNavigation() as any;
  return (
   <TouchableOpacity onPress={() => navigation.navigate(navigationScreen)}>
     <View style={[styles.card, {backgroundColor: color}]}>
      <View style={{flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center'}}>
        <View style={styles.img}>
          {/* <AntDesign name={icon} size={20} color={COLORS.primary} /> */}
          {icon}
        </View>
        <View>
        <Text
        style={{
          ...FONTS.h3,
          fontWeight: '600',
          color: COLORS.black,
        }}>
        {header}
      </Text>
      <Text
        style={{
          ...FONTS.h4,
          fontWeight: 'normal',
          color: COLORS.gray,
        }}>
        {title}
      </Text>
        </View>
      </View>
    </View>
   </TouchableOpacity>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginBottom: hp(30),
    padding: hp(15),
  },
  img: {
    backgroundColor: COLORS.white,
    padding: hp(10),
    width: wp(50),
    height: hp(50),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: hp(15),
  },
  btn: {
    backgroundColor: COLORS.white,
    width: hp(100),
    padding: hp(10),
    alignItems: 'center',
    borderRadius: 10,
  },
});
