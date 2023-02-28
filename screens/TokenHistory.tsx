import { View, Text, StyleSheet, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, {useState} from 'react'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { format, hp, wp } from '../utils/helper'


const TokenHistory = ({navigation}: any) => {
    const [type, setType] = useState('all');

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
      <Text style={{...FONTS.h3}}>Token Transactions</Text>
      <View style={[GlobalStyle.rowStart, {marginTop: hp(30), marginBottom: hp(20)}]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              width: wp(70),
              backgroundColor: type === 'all' ? COLORS.primary : COLORS.white,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: hp(20),
              marginRight: hp(10),
              padding: hp(10),
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('all')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color: type === 'all' ? COLORS.white : COLORS.primary,
                }}>
                All
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              backgroundColor:
                type === 'withdraw' ? COLORS.primary : COLORS.white,
               borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: hp(20),
                marginRight: hp(10),
                padding: hp(10),
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('withdraw')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color:
                    type === 'withdraw' ? COLORS.white : COLORS.primary,
                }}>
                Withdraw
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              backgroundColor:
                type === 'deposit' ? COLORS.primary : COLORS.white,
               borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: hp(20),
                marginRight: hp(10),
                padding: hp(10),
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('deposit')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color:
                    type === 'deposit' ? COLORS.white : COLORS.primary,
                }}>
                Deposit
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              backgroundColor:
                type === 'successful' ? COLORS.primary : COLORS.white,
               borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: hp(20),
                marginRight: hp(10),
                padding: hp(10),
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('successful')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color:
                    type === 'successful' ? COLORS.white : COLORS.primary,
                }}>
                Successful
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              backgroundColor:
                type === 'incoming' ? COLORS.primary : COLORS.white,
               borderColor: COLORS.primary,
              borderWidth: 1,
                marginRight: hp(10),
              borderRadius: hp(20),
              padding: hp(10),
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('incoming')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color:
                    type === 'incoming' ? COLORS.white : COLORS.primary,
                }}>
                Incoming
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              backgroundColor:
                type === 'pending' ? COLORS.primary : COLORS.white,
               borderColor: COLORS.primary,
              borderWidth: 1,
                marginRight: hp(10),
              borderRadius: hp(20),
              padding: hp(10),
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('pending')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color:
                    type === 'pending' ? COLORS.white : COLORS.primary,
                }}>
                Pending
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              backgroundColor:
                type === 'failed' ? COLORS.primary : COLORS.white,
               borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: hp(20),
                marginRight: hp(10),
                padding: hp(10),
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Pressable onPress={() => setType('failed')}>
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: 'center',
                  color: type === 'failed' ? COLORS.white : COLORS.primary,
                }}>
                Failed
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
     <View style={styles.hr}></View>

     <View>
     <TouchableOpacity>
                      <View style={styles.actionCard2}>
                        <View style={GlobalStyle.rowStart}>
                          <View style={styles.icons}>
                            <AntDesign name='arrowup' size={20} color={COLORS.primary} />
                          </View>
                          <View style={{marginLeft: hp(10)}}>
                            <Text style={{...FONTS.body3}}>
                             Deposit
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

export default TokenHistory

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