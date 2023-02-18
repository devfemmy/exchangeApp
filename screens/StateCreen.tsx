/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect} from 'react'
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
    <>
      {
                userStateInfo ? <ContainerComponent /> : <NoAuthComponennt />
            }
    </>
  )
}

export default StateCreen