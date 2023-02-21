/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */



import { View, Text, StyleSheet,ScrollView,Image, Pressable, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import MainLayout from './mainLayout'
import GlobalStyle from '../utils/globalStyle'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getProfile, signOutUser, userState } from '../slice/AuthSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IconTextButton from '../components/IconTextButton'
import { hp, wp } from '../utils/helper'
import { bigM } from '../assets/images'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ListCard from '../components/ListCard'
import { FONTS } from '../utils/constants/theme'

const Profile = ({navigation}: any) => {

  const dispatch = useAppDispatch()
 const userStateInfo = useAppSelector(userState)
 

  const getUserInfo = userStateInfo?.userData ? userStateInfo?.userData : userStateInfo

  const logOut = async () => {
    dispatch(signOutUser()).then(() => {
      AsyncStorage.clear()
    })
  }

    useEffect(() => {
    const loadData = async () => {
      dispatch(getProfile())
    }
    loadData()
  }, [])

    const Info = [
    {
      id: 1,
      name: "General",
      icon: "user",
      route: 'GeneralScreen'
    },
    {
      id: 2,
      name: "Security",
      icon: "security",
      route: 'SecurityScreen'
    },
    {
      id: 3,
      name: "Support",
      icon: "support",
      route: 'SupportScreen'
    },
    {
      id: 4,
      name: "KYC",
      icon: "addusergroup",
      route: 'KycScreen'
    },
    {
      id: 5,
      name: "Refer & Earn",
      icon: "notifications-none",
      route: 'NotificationScreen'
    },
    {
      id: 6,
      name: "Sign Out",
      icon: "logout",
      route: 'SignOut'
    }
  ]



  return (
    <MainLayout>
    <View style={GlobalStyle.container}>
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{...FONTS.h2, marginBottom: hp(25)}}>Account Settings</Text>

        <View>
          {
            Info?.map((data, i) => {
              return <ListCard id={i} data={data} handlePress={() => navigation.navigate(data?.route)} logOut={logOut} />
            })
          }
        </View>
      </ScrollView>
    </View>
   </View> 
  </MainLayout>
  )
}

export default Profile


const styles = StyleSheet.create({
  imgCircle: {
    backgroundColor: '#E2E6FD',
    padding: hp(10),
    borderRadius: 50,
  },
  txt: {
    marginTop: hp(35)
  },
  container: {
    paddingHorizontal: wp(10),
    backgroundColor: 'white',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: hp(10),
    alignItems: 'center',
    marginTop: hp(16)
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(20)
  },
  rowDiv: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  div: {
    width: '50%',
    marginHorizontal: hp(20)
  },
  img: {

  },
  txt1: {

  },
  txt2: {
    backgroundColor: '#DEF8E9',
    paddingHorizontal: hp(8),
    marginLeft: hp(5),
    borderRadius: 10
  },
  txtNotVerified: {
    backgroundColor: '#ff0000',
    paddingHorizontal: hp(8),
    marginLeft: hp(5),
    borderRadius: 10
  },
  txt3: {

  },
  tag: {
    backgroundColor: '#E2E6FD',
    borderRadius: 10,
    padding: hp(10),
    width: wp(110)
  }
})