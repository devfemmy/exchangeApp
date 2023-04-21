import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native'
import React, {useState} from 'react'
import GlobalStyle from '../utils/globalStyle'
import { COLORS, FONTS } from '../utils/constants/theme'

import { hp, wp } from '../utils/helper'
import HeaderComponent from '../components/HeaderComponent'
import { useAppSelector } from '../app/hooks'
import { modeStatus } from '../slice/TradeSlice'


const ZendPrepaidHistory = ({navigation}: any) => {
    const [type, setType] = useState('all');
    const modeInfo = useAppSelector(modeStatus);

    
  return (
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
              <View style={styles.margin} />
              <HeaderComponent onPress={() => navigation.goBack()} /> 
      <Text style={{...FONTS.h3, fontWeight: '600',color:modeInfo ? COLORS.black : COLORS.white}}>Zend Prepaid History</Text>
      {/* <View style={[GlobalStyle.rowStart, {marginTop: hp(30), marginBottom: hp(20)}]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              width: wp(70),
              borderColor: type === 'all' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'all' ? 1 : 1,
              //  borderColor: COLORS.primary,
               borderRadius: hp(20),
              marginRight: hp(10),
              padding: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('all')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color: type === 'all' ? COLORS.primary : 'rgb(128, 128, 128)',
                }}>
                All
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: wp(100),
              // backgroundColor:
              //   type === 'withdraw' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              borderColor: type === 'withdraw' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'withdraw' ? 1 : 1,
               borderRadius: hp(20),
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('withdraw')}>
              <Text
                style={{
                  ...FONTS.h5,
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
              width: wp(100),
              // backgroundColor:
              //   type === 'deposit' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
               borderRadius: hp(20),
              borderColor: type === 'deposit' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'deposit' ? 1 : 1,
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('deposit')}>
              <Text
                style={{
                  ...FONTS.h5,
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
              width: wp(100),
              // backgroundColor:
              //   type === 'successful' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
               borderRadius: hp(20),
              borderColor: type === 'successful' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'successful' ? 1 : 1,
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('successful')}>
              <Text
                style={{
                  ...FONTS.h5,
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
              width: wp(100),
              // backgroundColor:
              //   type === 'incoming' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
                 marginRight: hp(10),
              borderRadius: hp(20),
              borderColor: type === 'incoming' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'incoming' ? 1 : 1,
              padding: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('incoming')}>
              <Text
                style={{
                  ...FONTS.h5,
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
              width: wp(100),
              // backgroundColor:
              //   type === 'pending' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              //   marginRight: hp(10),
               borderRadius: hp(20),
              borderColor: type === 'pending' ? COLORS.primary : COLORS.gray,
              borderWidth: type === 'pending' ? 1 : 1,
              marginRight: hp(10),
              padding: hp(5),
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
              width: wp(100),
              // backgroundColor:
              //   type === 'failed' ? COLORS.primary : COLORS.white,
              //  borderColor: COLORS.primary,
              // borderWidth: 1,
              borderRadius: hp(20),
              //   marginRight: hp(10),
                borderColor: type === 'failed' ? COLORS.primary : COLORS.gray,
                borderWidth: type === 'failed' ? 1 : 1,
                marginRight: hp(10),
                padding: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Pressable onPress={() => setType('failed')}>
              <Text
                style={{
                  ...FONTS.h5,
                  textAlign: 'center',
                  color: type === 'failed' ? COLORS.primary : COLORS.gray,
                }}>
                Failed
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View> */}
     <View style={styles.hr}></View>

     <View style={styles.gifContainer}>
      <Image style={styles.gifStyle} source={require('../assets/images/trans.gif')} />
     {/* <TranHistoryCard header="Swap" /> */}
     </View>
    </View>
  )
}

export default ZendPrepaidHistory

const styles = StyleSheet.create({
    margin: {
        // marginVertical: 20,
      },
      gifContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      gifStyle: {
        width: wp(300),
        height: hp(380),
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