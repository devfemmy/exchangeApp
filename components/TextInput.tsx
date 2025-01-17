/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable space-infix-ops */
import React, {memo, ComponentProps} from 'react';
import {StyleProp, StyleSheet,Text, View, ViewStyle} from 'react-native';

import { TextInput as BaseInput} from 'react-native-paper';

import GlobalStyle from '../utils//globalStyle'
import {hp} from '../utils/helper';
import {useSecureTextEntry} from '../utils/helper';
import { COLORS, FONTS } from '../utils/constants/theme';
import { useAppSelector } from '../app/hooks';
import { modeStatus } from '../slice/TradeSlice';
import { userState } from '../slice/AuthSlice';

type InputProps = ComponentProps<typeof BaseInput> & {
  errorMsg?: string;
  label?: string;
  isPassword?: boolean;
  searchInput?: boolean;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  iconMarginTop?: number,
  disabled?: boolean,
};

export const TextInput = memo(
  ({
    errorMsg,
    isPassword = false,
    searchInput = false,
    containerStyle,
    placeholder,
    label,
    iconMarginTop,
    disabled,
    ...rest
  }: InputProps) => {
    const {secureTextEntry, toggleEntry} = useSecureTextEntry(isPassword);
    const modeInfo = useAppSelector(modeStatus);
    const userStateInfo = useAppSelector(userState);

    
    return (
      <View style={[styles.containerStyle, containerStyle]}>
        <BaseInput
          label={<Text style={{color: modeInfo ? COLORS.black : COLORS.white}}>{label}</Text>}
          mode="outlined"
          placeholder={placeholder}
          placeholderTextColor={COLORS.white}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={disabled}
          contentStyle={{letterSpacing: 0.03}}
          textColor={(userStateInfo && !modeInfo)? COLORS.white : COLORS.black}
          style={{ height: searchInput ? 40 : 60}}
          outlineStyle={{borderWidth: 0.3, borderColor: !modeInfo ? COLORS.white : '#485FE6'}}
          outlineColor={searchInput ? "transparent" : '#485FE6'}
          theme={{
            roundness: searchInput ? 8 : 5,
            colors: {
              primary: (userStateInfo && !modeInfo) ? COLORS.white : COLORS.primary,
              background: (userStateInfo && !modeInfo) ? COLORS.darkMode : COLORS.primary2,
              text: (userStateInfo && !modeInfo) ? COLORS.white : COLORS.white,
              placeholder: (userStateInfo && !modeInfo) ? COLORS.white : COLORS.gray,
            },
          }}
          right={
            isPassword ? (
              <BaseInput.Icon
                color={COLORS.white}
                onPress={toggleEntry}
                icon={secureTextEntry ? 'eye-off' : 'eye'}
              />
            ) : null
          }
          left={
            searchInput ? (
              <BaseInput.Icon
                color={COLORS.white}
                onPress={toggleEntry}
                icon={'magnify'}
                size={hp(25)}
                style={{marginTop: hp(15)}}
              />
            ) : null
          }
          {...rest}
        />
        {errorMsg !== undefined ? (
          <View style={[GlobalStyle.rowStart, styles.errorHold]}>
            <Text
              style={{...FONTS.body5,textAlign:"left",color: COLORS.red }} 
              >
                {errorMsg}
              </Text>
        
          </View>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    borderRadius: hp(15),
  },
  textStyle: {
    fontSize: hp(15),
  },
  error: {
    paddingTop: hp(-8),
    color: 'tomato',
  },
  containerStyle: {
    marginBottom: hp(20),
    width: '100%',
    alignSelf: 'center',
  },
  errorHold: {
    marginTop: hp(10),
  },
});
