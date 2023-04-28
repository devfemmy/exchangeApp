import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, FONTS } from '../utils/constants/theme';
import { hp, wp } from '../utils/helper';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../app/hooks';
import { modeStatus } from '../slice/TradeSlice';

const TransactionCard = ({ data, index }: any) => {
  const { header, icon, navigationScreen, color, title } = data;
  const modeInfo = useAppSelector(modeStatus);
  const navigation = useNavigation() as any;
  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigationScreen)}>
      <View style={[styles.card, { backgroundColor: modeInfo ? color : index % 2 === 0 ? COLORS.lightDark : COLORS.darkMode }]}>
        <View style={{ flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center' }}>
          
          <View>
            <Text
              style={{
                ...FONTS.h3,
                fontWeight: '600',
                color: modeInfo ? COLORS.black : COLORS.white,
              }}>
              {header}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
              style={{
                ...FONTS.h4,
                fontWeight: 'normal',
                color: modeInfo ? COLORS.gray : COLORS.white,
                width: '80%'
              }}>
              {title}
            </Text> 
           <View style={styles.imgDiv}>
           <View style={styles.img}>
            {icon}
          </View>
           </View>
            </View>
           
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(navigationScreen)}>
              <Text style={{color: COLORS.primary}}>See Details</Text>
            </TouchableOpacity>
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
    marginRight: hp(15),
  },
  imgDiv: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '20%'
  },
  btn: {
    backgroundColor: COLORS.white,
    width: hp(100),
    padding: hp(10),
    alignItems: 'center',
    borderRadius: 10,
    marginTop: hp(0)
  },
});
