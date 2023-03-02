/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import { StyleSheet, View } from 'react-native';


import { hp } from '../utils/helper';

import { Text } from "react-native"


//import {getStorePermission} from '../../redux/slices/StoreSlice'

import SelectDropdown from 'react-native-select-dropdown'
import GlobalStyle from '../utils/globalStyle';
import { COLORS, FONTS } from '../utils/constants/theme';
import Entypo from 'react-native-vector-icons/Entypo';





export const SelectInput = (props: any) => {
const { items, setState,value, placeholder, errorMsg } = props;


  return (
    <View style={styles.contain}>

<SelectDropdown
	data={items}
    defaultValue={value}
    search
    defaultButtonText={placeholder}
	onSelect={(selectedItem) => {
        setState(selectedItem)
       
	}}
    searchInputStyle={{
        backgroundColor: COLORS.primary2,
        borderBottomColor: COLORS.black,
        borderBottomWidth: 0.8
    }}
    dropdownStyle={{
        backgroundColor: COLORS.primary2,
       
    }}
    rowTextStyle={{
        textAlign: 'left',
        ...FONTS.body3
    }}
    buttonStyle={{
        backgroundColor: COLORS.primary2,
        width: '100%',
        height: hp(60),
        borderColor: COLORS.primary,
        borderWidth: 0.3,
        borderRadius: 10,
    }}
    renderDropdownIcon={() => {
      return <Entypo name="chevron-thin-down" size={20} color={COLORS.primary} />
    }}
    buttonTextStyle={{
        textAlign: 'left',
        color: COLORS.lightGray,
        ...FONTS.body3
    }}
	buttonTextAfterSelection={(selectedItem) => {
        
		return selectedItem
	}}
	rowTextForSelection={(item) => {
            //property
		return item
	}}
/>

      {errorMsg !== undefined ? (
        <View style={[GlobalStyle.rowStart, styles.errorHold]}>
          <Text
            style={[styles.error, {...FONTS.body5, textAlign: 'left'}]}
          >{errorMsg}</Text>
        </View>
      ) : null}
    </View>

  );
};

const styles = StyleSheet.create({
  contain: {
    width: "100%",
    marginBottom: hp(20)
  },
  input: {
    flexDirection: 'row-reverse',
    backgroundColor: "red",
    borderRadius: hp(7),
    width: '100%',
    borderColor: "blue",
    borderWidth: 0.4,
  },
  inputText: {
    color: 'white',
    textAlign: 'left',
    fontSize: hp(15),
  },
  textStyle: {
    fontSize: hp(15),
  },
  error: {
    paddingTop: hp(25),
    color: 'tomato',
  },
  dropdownStyle: {
    backgroundColor: COLORS.primary2,
    height: hp(200),
    borderBottomLeftRadius: hp(10),
    borderBottomRightRadius: hp(10),
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  rowStyle: {
    padding: 10,
  },
  rowTextStyle: {
    color: 'white',
    textAlign: 'left',
    fontSize: hp(15),
  },
  errorHold: {
    marginTop: hp(-15),
    marginBottom: hp(10)
  },
  containerStyle: {
    marginBottom: hp(20),
    width: '100%',
    alignSelf: 'center',
  },
});
