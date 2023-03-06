import { View, StyleSheet, Image,Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {  scanner } from '../assets/images'
import { hp, wp } from '../utils/helper'
import { COLORS, FONTS } from '../utils/constants/theme'
import { useNavigation } from '@react-navigation/native'

const Header = ({info, note}: any) => {
    const navigation = useNavigation() as any
    return (
        <View style={styles.row}>
           <TouchableOpacity onPress={() => navigation?.navigate("Profile")}>
           <View>
                <Image source={{uri: info?.image}} resizeMode="cover" style={styles.image} />
            </View>
           </TouchableOpacity>
            <View style={styles.div}>
                <View style={styles.rowDiv}>
                    <Text style={{...FONTS.body3, fontWeight: "bold", textTransform: 'capitalize'}} >{info?.firstName + " " + info?.lastName}</Text>
                    <Text style={[styles.txt, {...FONTS.body5}]}>{info?.status}</Text>
                </View>
                <Text style={{...FONTS.body5}}>{note}</Text>
            </View>
            <View>
                <Image source={scanner} />
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    txt: {
        color:COLORS.darkGreen, 
        backgroundColor: 
        COLORS.lightGreen, 
        marginLeft: hp(5), 
        paddingHorizontal: hp(10),
        textTransform: 'capitalize'
    },
    row: {
        flexDirection: 'row',
        paddingVertical: hp(10),
        alignItems: 'center'
    },
    rowDiv: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    div: {
        width: '65%',
        marginHorizontal: hp(20)
    },
    img: {

    },
    txt1: {

    },
    txt2: {
        backgroundColor: '#DEF8E9',
        paddingHorizontal: hp(5),
        marginLeft: hp(5)
    },
    txt3: {

    },
    image: {
        width: wp(50),
        height: hp(50),
        borderRadius: 50
    }
})