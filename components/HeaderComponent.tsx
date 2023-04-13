import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../utils/constants/theme';
import { hp } from '../utils/helper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const  HeaderComponent = ({onPress}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.header}>
      <TouchableOpacity onPress={onPress}>
      <AntDesign onPress={onPress} name="arrowleft" style={styles.icon} size={hp(20)} color={COLORS.gray2} />
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
