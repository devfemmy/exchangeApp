import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import { hp } from '../utils/helper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { stroke } from '../assets/images';
import { COLORS, FONTS } from '../utils/constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ListCard = ({ data, id, handlePress, logOut}: any) => {

  return (
    <View key={id} style={styles.container}>
    <Pressable onPress={data?.name === 'Sign Out' ? logOut : handlePress}>
        <View style={styles.rowBtw}>
            <View style={styles.row}>
                {
                    data?.icon === 'addusergroup' || data?.icon === 'user' ? <AntDesign name={data?.icon} style={styles.img} size={20} /> : <MaterialIcons name={data?.icon} color={data?.icon === 'logout' ? '#FF0000' : COLORS.gray} size={20} style={styles.img} />
                }
                <Text style={{...FONTS.body3, marginLeft: hp(5), color: COLORS.gray}}>{data?.name}</Text>
            </View>
             {
                (data?.name !== 'Sign Out' && !data?.type) && <Image source={stroke} style={styles.img} />
            }

        </View>
    </Pressable>

</View>
  );
};

export default ListCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 0.3,
         paddingVertical: hp(10),
        marginBottom: hp(20),
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
