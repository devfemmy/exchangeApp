import React from 'react';
import {StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../utils/constants/theme';
import { hp } from '../utils/helper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppSelector } from '../app/hooks';
import { modeStatus } from '../slice/TradeSlice';

const  HeaderComponent = ({onPress}: any) => {
  const modeInfo = useAppSelector(modeStatus);


  return (
    <TouchableOpacity onPress={onPress} style={styles.header}>
      <TouchableOpacity onPress={onPress}>
      <AntDesign onPress={onPress} name="arrowleft" style={styles.icon} size={hp(20)} color={modeInfo ? COLORS.gray2 : COLORS.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    // flex: 1
  },
  icon: {
    marginVertical: hp(20),
  },
});

export default HeaderComponent;
