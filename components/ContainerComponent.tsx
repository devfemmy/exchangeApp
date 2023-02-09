/* eslint-disable comma-dangle */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable quotes */

import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from "../navigation/tabs";

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
    </Stack.Navigator>
</NavigationContainer>
  )
}

export default ContainerComponent