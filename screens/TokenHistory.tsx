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
      <ScrollView style={{borderBottomColor: 'rgb(227, 227, 227)', borderBottomWidth: 1}} horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              // width: wp(70),
              borderBottomColor: type === 'all' ? COLORS.primary : COLORS.white,
              borderBottomWidth: type === 'all' ? 2 : 0,
              // borderColor: COLORS.primary,
              // borderRadius: hp(20),
              marginRight: hp(10),
              padding: hp(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('all')}>
              <Text
                style={{
                  ...FONTS.h4,
                  textAlign: 'center',
                  color: type === 'all' ? COLORS.primary : 'rgb(128, 128, 128)',
                }}>
                All
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              // width: wp(100),
              // backgroundColor:
              //   type === 'withdraw' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              borderBottomColor: type === 'withdraw' ? COLORS.primary : COLORS.white,
              borderBottomWidth: type === 'withdraw' ? 2 : 0,
              // borderRadius: hp(20),
                marginRight: hp(10),
                padding: hp(10),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('withdraw')}>
              <Text
                style={{
                  ...FONTS.h4,
                  textAlign: 'center',
                  color:
                    type === 'withdraw' ? COLORS.primary : COLORS.gray1,
                }}>
                Withdraw
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              // width: wp(100),
              // backgroundColor:
              //   type === 'deposit' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              // borderRadius: hp(20),
              borderBottomColor: type === 'deposit' ? COLORS.primary : COLORS.white,
              borderBottomWidth: type === 'deposit' ? 2 : 0,
                marginRight: hp(10),
                padding: hp(10),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('deposit')}>
              <Text
                style={{
                  ...FONTS.h4,
                  textAlign: 'center',
                  color:
                    type === 'deposit' ? COLORS.primary : COLORS.gray,
                }}>
                Deposit
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              // width: wp(100),
              // backgroundColor:
              //   type === 'successful' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              // borderRadius: hp(20),
              borderBottomColor: type === 'successful' ? COLORS.primary : COLORS.white,
              borderBottomWidth: type === 'successful' ? 2 : 0,
                marginRight: hp(10),
                padding: hp(10),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('successful')}>
              <Text
                style={{
                  ...FONTS.h4,
                  textAlign: 'center',
                  color:
                    type === 'successful' ? COLORS.primary : COLORS.gray,
                }}>
                Successful
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              // width: wp(100),
              // backgroundColor:
              //   type === 'incoming' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              //   marginRight: hp(10),
              borderRadius: hp(20),
              borderBottomColor: type === 'incoming' ? COLORS.primary : COLORS.white,
              borderBottomWidth: type === 'incoming' ? 2 : 0,
              marginRight: hp(10),
              padding: hp(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('incoming')}>
              <Text
                style={{
                  ...FONTS.h4,
                  textAlign: 'center',
                  color:
                    type === 'incoming' ? COLORS.primary : COLORS.gray,
                }}>
                Incoming
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              // width: wp(100),
              // backgroundColor:
              //   type === 'pending' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              //   marginRight: hp(10),
              // borderRadius: hp(20),
              borderBottomColor: type === 'pending' ? COLORS.primary : COLORS.white,
              borderBottomWidth: type === 'pending' ? 2 : 0,
              marginRight: hp(10),
              padding: hp(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('pending')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color:
                    type === 'pending' ? COLORS.primary : COLORS.gray,
                }}>
                Pending
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              // width: wp(100),
              // backgroundColor:
              //   type === 'failed' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              // borderRadius: hp(20),
              //   marginRight: hp(10),
                borderBottomColor: type === 'failed' ? COLORS.primary : COLORS.white,
                borderBottomWidth: type === 'failed' ? 2 : 0,
                marginRight: hp(10),
                padding: hp(10),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('failed')}>
              <Text
                style={{
                  ...FONTS.h4,
                  textAlign: 'center',
                  color: type === 'failed' ? COLORS.primary : COLORS.gray,
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