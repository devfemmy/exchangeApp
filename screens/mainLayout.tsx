/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import { View, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, } from '../utils/constants/theme'
import { useAppSelector } from '../app/hooks'
import { tradeStatus } from '../slice/TradeSlice'

import TradeCard from '../components/TradeCard'
import DepositModal from '../components/Modals/DepositModal'
import WithdrawModal from '../components/Modals/WithdrawModal'
import SwapModal from '../components/Modals/SwapModal'

const MainLayout = ({children}: any) => {
    const [depositModal, setDepositModal] = useState(false)
    const tradeStatusInfo = useAppSelector(tradeStatus)
    const [withdrawModal, setWithdrawModal] = useState(false)
    const [swapModal, setSwapModal] = useState(false)

    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

    const handleDepositOpen = () => {
        setDepositModal(true)
      }
      
      const handleDepositClose = () => {
        setDepositModal(false)
      }
      const handleWithdrawalOpen = () => {
        setWithdrawModal(true)
      }

      const handleSwapOpen = () => {
        setSwapModal(true)
      }
      
      const handleSwapClose = () => {
        setSwapModal(false)
      }
      
      const handleWithdrawalClose = () => {
       setWithdrawModal(false)
      }
    

    const tradeAction = [
        {
            id: 1,
            header: "Deposit",
            title: "Deposit crypto to another wallet",
            icon: 'arrowdown',
            navigationScreen: handleDepositOpen
        },
        {
            id: 2,
            header: "Swap",
            title: "Exchange for crypto",
            icon: 'swap',
            navigationScreen: handleSwapOpen
        },
        {
            id: 3,
            header: "Withdraw",
            title: "Withdraw your crypto",
            icon: 'arrowup',
            navigationScreen: handleWithdrawalOpen
        },
        {
            id: 4,
            header: "Xend Prepaid",
            title: "Change your crypto to giftcard",
            icon: 'sync',
            navigationScreen: "Prepaid",
            comingSoon: true
        },
        {
            id: 5,
            header: "Zend USD",
            title: "make Usd payment to customers",
            icon: 'arrowdown',
            navigationScreen: "ZendUsd",
            comingSoon: true
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
            left: 0,
            top: modalY,
            width: "100%",
            borderRadius: 30,
            padding: SIZES.padding,
            backgroundColor: COLORS.white
        }}
     >
       
       {
        tradeAction?.map(data => {
            return <TradeCard data={data} />
        })
       }
       
<WithdrawModal modalVisible={withdrawModal} setModalVisible={() => handleWithdrawalClose()} />
       <DepositModal modalVisible={depositModal} setModalVisible={() => handleDepositClose()} />
       <SwapModal modalVisible={swapModal} setModalVisible={() => handleSwapClose()} />
     </Animated.View>
    </View>
  )
}

export default MainLayout