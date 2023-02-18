
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable keyword-spacing */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';





export const getRequest = async (url: string) => {

    const token = await AsyncStorage.getItem("token");

    var response = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      if(response?.status === 200){
        return response
      }
}

export const getRequestNoToken = async (url: string) => {

  var response = await axios.get(url)
    if(response?.status === 200){
      return response
    }
}

export const postRequest =  async (url: string, payload?: any) => {
  const token = await AsyncStorage.getItem("token");

  var res = await axios.post(url, payload, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  if(res?.status === 200){
    return res
  }
  
}

export const updateRequest =  async (url: string, payload?: any) => {
  const token = await AsyncStorage.getItem("token");

  var res = await axios.put(url, payload, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  if(res?.status === 200){
    return res
  }
  
}

export const deleteRequest = (url: string, payload?: any) => {
  return axios.delete(url, payload)
}

export const deleteRequestNoPayload = async (url: string) => {
  const token = await AsyncStorage.getItem("token");
  return axios.delete(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}


export const truncate = (info: string, num: number) => {
  return info?.length > num ? info?.substr(0, num - 1) + "..." : info 
}
