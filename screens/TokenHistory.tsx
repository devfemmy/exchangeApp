import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, {useState} from 'react'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'
import { hp, wp } from '../utils/helper'
import HeaderComponent from '../components/HeaderComponent'
import TranHistoryCard from '../components/TranHistoryCard'


const TokenHistory = ({navigation}: any) => {
    const [type, setType] = useState('all');

  return (
    <View style={GlobalStyle.container}>
              <View style={styles.margin} />
              <HeaderComponent onPress={() => navigation.goBack()} /> 
      <Text style={{...FONTS.h3, fontWeight: '600'}}>Token Transactions</Text>
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
                  ...FONTS.h5,
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
                  ...FONTS.h5,
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
                  ...FONTS.h5,
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
                  ...FONTS.h5,
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
                  ...FONTS.h5,
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
                  ...FONTS.h5,
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
                  ...FONTS.h5,
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
     <TranHistoryCard header="Deposit" />
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
        backgroundColor: COLORS.lightGray2,
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