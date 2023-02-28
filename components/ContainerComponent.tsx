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
import VerifyPhone from '../screens/Security/VerifyPhone';
import VerifyPhonePin from '../screens/Security/VerifyPhonePin';

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
        <Stack.Screen
            name="VerifyPhone"
            component={VerifyPhone}
        />
        <Stack.Screen
            name="VerifyPhonePin"
            component={VerifyPhonePin}
        />
    </Stack.Navigator>
</NavigationContainer>
  )
}

export default ContainerComponent