
import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';
import ForgetPassword from '../screens/ForgetPassword';
import ResetPassword from '../screens/ResetPassword';
import EmailVerification from '../screens/EmailVerification';
import RequireConfirmation from '../screens/RequireConfirmation';


const Stack = createStackNavigator();

const NoAuthComponennt = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            animationEnabled: true,
            animationTypeForReplace: 'push',
        }}
        initialRouteName={'Login'}
    >
        <Stack.Screen
            name="Login"
            component={Login}
        />
         <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
        />
         <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
        />
         <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
        />
        <Stack.Screen
        name="EmailVerification"
        component={EmailVerification}
    />

<Stack.Screen
        name="RequireConfirmation"
        component={RequireConfirmation}
    />

    </Stack.Navigator>
// </NavigationContainer>

  );
};

export default NoAuthComponennt;


