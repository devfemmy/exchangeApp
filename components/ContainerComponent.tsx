/* eslint-disable comma-dangle */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable quotes */

import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from "../navigation/tabs";
import AssetInfo from '../screens/AssetInfo';
import EditProfile from '../screens/EditProfile';
import Security from '../screens/Security/Security';
import ChangeTransactionPin from '../screens/Security/TransactionPinChange';
import ChangePassword from '../screens/Security/ChangePassword';
import Deposit from '../screens/Security/Deposit';
import Withdrawal from '../screens/Withdrawal';
import Swap from '../screens/Swap';
import WithdrawalCard from '../screens/WithdrawalCard';
import SwapCard from '../screens/SwapCard';

const Stack = createStackNavigator();


const ContainerComponent = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName={'MainLayout'}
    >
        <Stack.Screen
            name="MainLayout"
            component={Tabs}
        />
        <Stack.Screen
            name="AssetInfo"
            component={AssetInfo}
        />
           <Stack.Screen
            name="Deposit"
            component={Deposit}
        />
         <Stack.Screen
            name="Swap"
            component={Swap}
        />
         <Stack.Screen
            name="Withdraw"
            component={Withdrawal}
        />
          <Stack.Screen
            name="WithdrawalCard"
            component={WithdrawalCard}
        />
         <Stack.Screen
            name="SwapCard"
            component={SwapCard}
        />
        <Stack.Screen
            name="EditProfile"
            component={EditProfile}
        />
        <Stack.Screen
            name="SecurityScreen"
            component={Security}
        />
        <Stack.Screen
            name="ChangePin"
            component={ChangeTransactionPin}
        />
        <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
        />
    </Stack.Navigator>
</NavigationContainer>
  )
}

export default ContainerComponent