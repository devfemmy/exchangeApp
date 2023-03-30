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
import Deposit from '../screens/Deposit';
import Withdrawal from '../screens/Withdrawal';
import Swap from '../screens/Swap';
import WithdrawalCard from '../screens/WithdrawalCard';
import SwapCard from '../screens/SwapCard';
import DepositAddress from '../screens/DepositAddress';
import SwapHistory from '../screens/SwapHistory';
import TokenHistory from '../screens/TokenHistory';
import ZendUsdHistory from '../screens/ZendUsdHistory';
import ZendPrepaidHistory from '../screens/ZendPrepaidHistory';
import ZendUsd from '../screens/ZendUsd';
import ZendPrepaid from '../screens/ZendPrepaid';
import CacUploadSuccess from './CacUploadSuccess';
import ZendUsdForm from '../screens/ZendUsdForm';
import PaymentDetails from '../screens/PaymentDetails';
import TransferAsset from '../screens/TransferAsset';
import GiftCard from '../screens/GiftCard';
import ReferAndEarn from '../screens/ReferAndEarn';
import KycScreen from '../screens/KycScreen';
import Transfer from '../screens/Transfer';
import ConfirmSwap from '../screens/ConfirmSwap';
import Instructions from '../screens/Instructions';
import TwoFactorVerification from '../screens/TwoFactorVerification';
import SuccessScreen from '../screens/SuccessScreen';
import SupportScreen from '../screens/SupportScreen';

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
            name="SupportScreen"
            component={SupportScreen}
        />
        <Stack.Screen
            name="DepositAddress"
            component={DepositAddress}
        />
         <Stack.Screen
            name="SwapHistory"
            component={SwapHistory}
        />
         <Stack.Screen
            name="TokenHistory"
            component={TokenHistory}
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
            name="ZendUsdHistory"
            component={ZendUsdHistory}
        />
         <Stack.Screen
            name="ZendUsdForm"
            component={ZendUsdForm}
        />
        <Stack.Screen 
            name="PaymentDetails"
            component={PaymentDetails}
        />
          <Stack.Screen
            name="ZendPrepaidHistory"
            component={ZendPrepaidHistory}
        />
         <Stack.Screen
            name="CacUploadSuccess"
            component={CacUploadSuccess}
        />
         <Stack.Screen
            name="ZendUsd"
            component={ZendUsd}
        />
          <Stack.Screen
            name="ZendPrepaid"
            component={ZendPrepaid}
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
            name="ReferAndEarn"
            component={ReferAndEarn}
        />
         <Stack.Screen
            name="Transfer"
            component={Transfer}
        />
         <Stack.Screen
            name="SuccessScreen"
            component={SuccessScreen}
        />
        <Stack.Screen
            name="TwoFactorVerification"
            component={TwoFactorVerification}
        />
        <Stack.Screen
            name="Instructions"
            component={Instructions}
        />
         <Stack.Screen
            name="ConfirmSwap"
            component={ConfirmSwap}
        />
             <Stack.Screen
            name="KycScreen"
            component={KycScreen}
        />
          <Stack.Screen
            name="TransferAsset"
            component={TransferAsset}
        />
          <Stack.Screen
            name="GiftCard"
            component={GiftCard}
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