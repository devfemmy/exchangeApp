import { View, Text, StyleSheet,ImageBackground } from 'react-native';
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
    <ImageBackground source={{uri: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682781235/kvsqqywb3k0n8qakmcao.svg"}}>
       <TouchableOpacity onPress={() => navigation.navigate(navigationScreen)}>
      <View style={[styles.card, { backgroundColor: modeInfo ? color : index % 2 === 0 ? COLORS.lightDark : COLORS.darkMode }]}>
        <View style={{ flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center' }}>
          
          <View>
            <Text
              style={{
                ...FONTS.h2,
                fontSize: hp(20),
                color: (modeInfo && color === COLORS.primary) ? COLORS.white : (modeInfo && color !== COLORS.primary) ? COLORS.black : COLORS.white,
              }}>
              {header}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
              style={{
                ...FONTS.h4,
                fontWeight: 'normal',
                color: (modeInfo && color === COLORS.primary) ? COLORS.white : (modeInfo && color !== COLORS.primary) ? COLORS.gray : COLORS.white,
                width: '70%'
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
    </ImageBackground>
   
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
    width: '30%',
    marginBottom: hp(20)
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
