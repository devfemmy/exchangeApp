import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { hp } from '../utils/helper';

import { stroke } from '../assets/images';
import { COLORS, FONTS } from '../utils/constants/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ListCard = ({ data, id, handlePress, logOut,modeInfo}: any) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            borderBottomColor: '#E0E0E0',
            borderBottomWidth: 0.3,
             paddingVertical: hp(20),
            // paddingBottom: hp(20),
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

  return (
    <TouchableOpacity onPress={data?.route === 'SignOut' ? logOut : handlePress} key={id} style={[styles.container,{backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
    <TouchableOpacity onPress={data?.route === 'SignOut'  ? logOut : handlePress}>
        <View style={styles.rowBtw}>
            <View style={styles.row}>
                {data?.icon}
                <Text style={{...FONTS.body3, color: modeInfo ? COLORS.black : COLORS.white , marginLeft: hp(10)}}>{data?.name}</Text>
            </View>
             {
                (data?.route !== 'SignOut' && !data?.type) && <Image source={stroke} style={styles.img} />
            }

        </View>
    </TouchableOpacity>

</TouchableOpacity>
  );
};

export default ListCard;

