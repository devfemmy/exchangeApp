/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import { View, Animated, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, SIZES, } from '../utils/constants/theme'
import { useAppSelector } from '../app/hooks'
import { tradeStatus } from '../slice/TradeSlice'

import TradeCard from '../components/TradeCard'
import { hp } from '../utils/helper'


const MainLayout = ({children}: any) => {

    const tradeStatusInfo = useAppSelector(tradeStatus)


    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;


    const tradeAction = [
        // {
        //     id: 1,
        //     header: "Deposit",
        //     title: "Deposit crypto to another wallet",
        //     icon: 'arrowdown',
        //     navigationScreen: "Deposit",
        // },
        {
            id: 2,
            header: "Swap",
            title: "Exchange for crypto",
            icon: 'swap',
            navigationScreen: "SwapCard",
        },
        {
            id: 3,
            header: "Withdraw",
            title: "Withdraw your crypto",
            icon: 'arrowup',
            navigationScreen: "Withdraw",
        },
        {
            id: 4,
            header: "Zend Prepaid",
            title: "Change your crypto to giftcard",
            icon: 'sync',
            navigationScreen: "ZendPrepaid",
        },
        {
            id: 5,
            header: "Zend USD",
            title: "make Usd payment to customers",
            icon: 'dollar',
            navigationScreen: "ZendUsd",
        },
    ]

    useEffect(() => {
        if(tradeStatusInfo){
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start()
        }
        else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start()
        }
    }, [tradeStatusInfo])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0,1],
        outputRange: [SIZES.height, SIZES.height - 550]
    })
  
  return (
    <View style={{flex: 1}}>
     {children}

     {/* Dim Background */}
     {
        tradeStatusInfo && 
        <Animated.View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.transparentBlack,
        }} 
        opacity={modalAnimatedValue}
        />
     }

        {/* Modal */}

     <Animated.View
        style={{
            position: "absolute",
            left: hp(10),
            right: hp(10),
            top: modalY,
            // width: "100%",
            borderRadius: 30,
            padding: SIZES.padding,
            backgroundColor: COLORS.white,
            // marginHorizontal: hp(20),
            width: Dimensions.get('window').width/1.07,
        }}
     >
       {
        tradeAction?.map(data => {
            return <TradeCard data={data} />
        })
       }
     </Animated.View>
    </View>
  )
}

export default MainLayout