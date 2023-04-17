import {View, StyleSheet, Text, TouchableOpacity, Switch} from 'react-native';
import React, {useState} from 'react';
import {hp, wp} from '../utils/helper';
import {COLORS, FONTS} from '../utils/constants/theme';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import GlobalStyle from '../utils/globalStyle';
import { useAppDispatch } from '../app/hooks';
import { getModeStatus } from '../slice/TradeSlice';


const Header = ({info, note, modeInfo}: any) => {
  const navigation = useNavigation() as any;
  const dispatch = useAppDispatch()

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState)
    dispatch(getModeStatus(isEnabled))
};

  return (
    <View style={GlobalStyle.rowBetween}>
        <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation?.navigate('EditProfile')}>
        <View>
          <FastImage
            style={styles.image}
            defaultSource={require('../assets/images/placeholder.png')}
            source={{
              uri: info?.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.div}>
        <View style={styles.rowDiv}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '600',
              textTransform: 'capitalize',
              color: modeInfo ? COLORS.darkMode : "white"
            }}>
            {info?.username}
          </Text>
          <Text style={[styles.txt, {...FONTS.body5, color: COLORS.darkGreen}]}>
            {info?.status}
          </Text>
        </View>
        <Text style={{...FONTS.body5,color: modeInfo ? COLORS.darkMode : "white"}}>{note}</Text>
      </View>
        </View>


      {/* <View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  txt: {
    color: COLORS.darkGreen,
    backgroundColor: COLORS.lightGreen,
    marginLeft: hp(5),
    paddingHorizontal: hp(10),
    textTransform: 'capitalize',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: hp(10),
    alignItems: 'center',
  },
  rowDiv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  div: {
    width: '60%',
    marginHorizontal: hp(20),
  },
  img: {},
  txt1: {},
  txt2: {
    backgroundColor: '#DEF8E9',
    paddingHorizontal: hp(5),
    marginLeft: hp(5),
  },
  txt3: {},
  image: {
    width: wp(50),
    height: hp(50),
    borderRadius: 50,
  },
});
