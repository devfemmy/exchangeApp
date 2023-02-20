/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */



import { View, Text } from 'react-native'
import React, {useState} from 'react'
import MainLayout from './mainLayout'
import GlobalStyle from '../utils/globalStyle'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { signOutUser, userState } from '../slice/AuthSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IconTextButton from '../components/IconTextButton'

const Profile = () => {

  const dispatch = useAppDispatch()
 const userStateInfo = useAppSelector(userState)
 

  const getUserInfo = userStateInfo?.userData ? userStateInfo?.userData : userStateInfo

  const logOut = async () => {
    dispatch(signOutUser()).then(() => {
      AsyncStorage.clear()
    })
  }


  return (
    <MainLayout>
    <View style={GlobalStyle.container}>
    <Text>Welcome {getUserInfo?.firstName + " " + getUserInfo?.lastName}</Text>
       <IconTextButton label="Log out" onPress={logOut} />
   </View> 
  </MainLayout>
  )
}

export default Profile