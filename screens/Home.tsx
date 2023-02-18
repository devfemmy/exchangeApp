/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import { View, Text } from 'react-native'
import React from 'react'

import MainLayout from './mainLayout'
import GlobalStyle from '../utils/globalStyle'
import IconTextButton from '../components/IconTextButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { signOutUser, userState } from '../slice/AuthSlice'

const Home = ({navigation}: any) => {
 const dispatch = useAppDispatch()
 const userStateInfo = useAppSelector(userState)
  const logOut = async () => {
    dispatch(signOutUser()).then(() => {
      AsyncStorage.clear()
    })
  }

  const getUserInfo = userStateInfo?.userData ? userStateInfo?.userData : userStateInfo
  
  return (
   <MainLayout>
     <View style={GlobalStyle.container}>
      <Text>Welcome {getUserInfo?.firstName + " " + getUserInfo?.lastName}</Text>
       <IconTextButton label="Log out" onPress={logOut} />
        <Text>Home</Text>
    </View> 
   </MainLayout>
  )
}

export default Home