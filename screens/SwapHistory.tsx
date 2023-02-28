import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { format, hp, wp } from '../utils/helper'


const SwapHistory = ({navigation}: any) => {
  return (
    <View style={GlobalStyle.container}>
              <View style={styles.margin} />
              <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          style={styles.icon}
          size={hp(20)}
          color={COLORS.gray2}
        />
      <Text style={{...FONTS.h2}}>Swap</Text>
     
     <View style={styles.hr}></View>

     <View>
     <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AssetInfo', {
                         
                        })
                      }>
                      <View style={styles.actionCard2}>
                        <View style={GlobalStyle.rowStart}>
                          <View style={styles.icons}>
                            <AntDesign name='swap' size={20} color={COLORS.primary} />
                          </View>
                          <View style={{marginLeft: hp(10)}}>
                            <Text style={{...FONTS.body3}}>
                             Swap
                            </Text>
                            <Text
                              style={{
                                ...FONTS.body5,
                                color: COLORS.lightGray3
                              }}>
                                From msjjsbb
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                          }}>
                          <Text
                            style={{
                              ...FONTS.body5,
                              fontWeight: 'bold',
                            }}>{`${format(
                            10000,
                          )} ETH`}</Text>
                          <Text
                            style={{
                              ...FONTS.body5,
                              color: COLORS.darkGreen
                            }}>Successful</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
     </View>
    </View>
  )
}

export default SwapHistory

const styles = StyleSheet.create({
    margin: {
        // marginVertical: 20,
      },
      icon: {
        marginVertical: 20,
      },
      hr: {
        width: "100%",
        height: hp(2),
        backgroundColor: COLORS.gray2,
        marginVertical: hp(15)
      },
      actionCard2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(10),
        paddingBottom: hp(10),
        borderBottomColor: COLORS.gray2,
        borderBottomWidth: 1,
      },
      icons: {
        width: wp(40),
        height: hp(40),
        backgroundColor: COLORS.primary2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
      },
})