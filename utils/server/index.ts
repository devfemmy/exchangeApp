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



const Base_Url = "https://accounts.zendwallet.com"


export const doPost = async (payload: Object, url: String, v?: String) => {
    
    var response = await axios.post(Base_Url + url, payload);

    return response
        
};

export const postAuthRequest = async (url: string, payload: any) => {
  const token = await AsyncStorage.getItem("token");

  var res = await axios.post(Base_Url + url, payload)
    if(res?.status === 200){
      return res
    }
}


export const getRequest = async (url: String, v?: String) => {

    const token = await AsyncStorage.getItem("token");

    var response = await axios.get(Base_Url + url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      if(response?.status === 200){
        return response
      }
}


export const specialGetRequest = async (url: String, v?: String) => {

  const token = await AsyncStorage.getItem("token") as string;

  var response = await axios.get(Base_Url + url, {
      headers: {
        "access-token": token,
      },
    })
    if(response?.status === 200){
      return response
    }
}

export const getRequestNoToken = (url: string) => {
  try {
    return axios.get(Base_Url + url)
  }
  catch(e){
    console.log("err",{e})
  }
}


// export const specialGetRequest = async (url: string) => {
//   const token = await AsyncStorage.getItem("token");

//   var res = await axios.get(Base_Url + url,
//      {
//        headers: {
//          authorization: `Bearer ${token}`,
//        },
//      })
 
//      if(res?.status === 200){
//        return res
//      }
    
//  }
 




export const getProfileRequest = async (url: String, v?: String) => {

    const token = await AsyncStorage.getItem("token");

    var response = await axios.get(Base_Url + url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    return response
}

export const postRequest =  async (url: string, payload?: any) => {
  const token = await AsyncStorage.getItem("token");
  console.log({token})
  var res = await axios.post(Base_Url + url, payload, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  if(res?.status === 200){
    return res
  }
  
}

export const specialPostRequest =  async (url: string, payload?: any) => {
  const token = await AsyncStorage.getItem("token") as string;
 
  var res = await axios.post(Base_Url + url, payload, {
    headers: {
      "access-token": token,
      // authorization: `Bearer ${token}`,
    }
  })
  if(res?.status === 200){
    return res
  }
  
}

export const deleteRequest = (url: string, payload: any) => {
  return axios.delete(Base_Url + url, payload)
}

export const deleteRequestNoPayload = async (url: string) => {
  const token = await AsyncStorage.getItem("token");
  return axios.delete(Base_Url + url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}


// export const uploadImageFunc = async (payload: any) => {
//   const token = await AsyncStorage.getItem("token");
//   return axios.post(config.databaseUpload, payload, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   })
// }



export const truncate = (info: string, num: number) => {
  return info?.length > num ? info?.substr(0, num - 1) + "..." : info 
}



export const sendPost = async ( url: String, payload: any, v?: String) => {
    
    const token = await AsyncStorage.getItem("token");

    var response = await axios.post(Base_Url + url, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    return response
        
};

export const sendDelete = async ( url: String, v?: String) => {
    
  const token = await AsyncStorage.getItem("token");

  var response = await axios.delete(Base_Url + url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
  });

  return response
      
};


  
 
export default {doPost}