/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import { hp } from '../utils/helper';
import { stroke } from '../assets/images';
import { FONTS } from '../utils/constants/theme';
import { Switch } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ListCardItem = ({ data, id, handlePress, icon, isSwitchOn, onToggleSwitch }: any) => {

  return (
    <TouchableOpacity onPress={data?.name !== 'Allow Biometrics' ? handlePress : null} key={id} style={styles.container}>
    <Pressable onPress={data?.name !== 'Allow Biometrics' ? handlePress : null}>
        <View style={styles.rowBtw}>
            <View style={styles.row}>
                <View>{icon}</View>
                <Text style={{...FONTS.body3, marginLeft: hp(15), color: data?.route === "DeleteAccount" ? "red" : '#4F4F4F'}}>{data?.name}</Text>
            </View>
            <View>
            {
                data?.name !== 'Allow Biometrics' ? <Image source={stroke} style={styles.img} /> : <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            }
            </View>

        </View>
    </Pressable>

</TouchableOpacity>
  );
};

export default ListCardItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 0.3,
        //  paddingVertical: hp(10),
         paddingVertical: hp(20),
    },
    txt: {
        marginLeft: hp(10),
    },
    rowBtw: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {

    },
});
