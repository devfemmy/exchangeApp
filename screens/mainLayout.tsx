/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import { View, Animated } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, SIZES, } from '../utils/constants/theme'
import { useAppSelector } from '../app/hooks'
import { tradeStatus } from '../slice/TradeSlice'
import IconTextButton from '../components/IconTextButton'

const MainLayout = ({children}: any) => {
 
    const tradeStatusInfo = useAppSelector(tradeStatus)

    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;


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
        <IconTextButton 
            label="Transfer"
            onPress={() => console.log("Transfer")}
        />
         <IconTextButton 
            label="Withdraw"
            onPress={() => console.log("Withdraw")}
            containerStyle={{
                marginTop: SIZES.base
            }}
        />
         <IconTextButton 
            label="Withdraw"
            onPress={() => console.log("Withdraw")}
            containerStyle={{
                marginTop: SIZES.base
            }}
        />
         <IconTextButton 
            label="Withdraw"
            onPress={() => console.log("Withdraw")}
            containerStyle={{
                marginTop: SIZES.base
            }}
        />
         <IconTextButton 
            label="Withdraw"
            onPress={() => console.log("Withdraw")}
            containerStyle={{
                marginTop: SIZES.base
            }}
        />
         <IconTextButton 
            label="Withdraw"
            onPress={() => console.log("Withdraw")}
            containerStyle={{
                marginTop: SIZES.base
            }}
        />
     </Animated.View>
    </View>
  )
}

export default MainLayout