import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../utils/constants/theme';
import { hp } from '../utils/helper';

const  HeaderComponent = ({onPress}: any) => {
  return (
    <Pressable onPress={onPress} style={styles.header}>
      <Pressable onPress={onPress}>
      <AntDesign onPress={onPress} name="arrowleft" style={styles.icon} size={hp(20)} color={COLORS.gray2} />
      </Pressable>
    </Pressable>
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
