/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable space-infix-ops */
import React, {memo, ComponentProps} from 'react';
import {StyleProp, StyleSheet,Text, View, ViewStyle} from 'react-native';

import { TextInput as BaseInput} from 'react-native-paper';

import GlobalStyle from '../utils//globalStyle'
import {hp} from '../utils/helper';
import {useSecureTextEntry} from '../utils/helper';
import { COLORS, FONTS } from '../utils/constants/theme';

type InputProps = ComponentProps<typeof BaseInput> & {
  errorMsg?: string;
  label: string;
  isPassword?: boolean;
  searchInput?: boolean;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  iconMarginTop?: number,
  disabled?: boolean
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
    return (
      <View style={[styles.containerStyle, containerStyle]}>
        <BaseInput
          label={label}
          mode="outlined"
          placeholder={placeholder}
          placeholderTextColor={COLORS.white}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={disabled}
          textColor={"black"}
          style={{ height: 60}}
          outlineStyle={{borderWidth: 0.3, borderColor: '#485FE6'}}
          outlineColor={searchInput ? "transparent" : '#485FE6'}
          theme={{
            roundness: 5,
            colors: {
              primary: COLORS.primary,
              background: searchInput ? COLORS.primary2 : COLORS.primary2,
              text: searchInput ? COLORS.white : COLORS.white,
              placeholder: COLORS.gray,
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
