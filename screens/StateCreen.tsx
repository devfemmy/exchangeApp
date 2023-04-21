/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import ContainerComponent from '../components/ContainerComponent';
import NoAuthComponennt from '../components/NoAuthComponennt';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getProfile, userState } from '../slice/AuthSlice';


const StateCreen = () => {

    const dispatch = useAppDispatch()
    const userStateInfo = useAppSelector(userState)

    useEffect(() => {
       dispatch(getProfile())
    }, [])

    
  return (
    <NavigationContainer>
      {
                userStateInfo ? <ContainerComponent /> : <NoAuthComponennt />
            }
    </NavigationContainer>
  )
}

export default StateCreen