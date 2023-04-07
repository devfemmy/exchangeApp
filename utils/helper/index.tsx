/* eslint-disable space-infix-ops */
/* eslint-disable radix */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable no-bitwise */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import {
    widthPercentageToDP as wdp,
    heightPercentageToDP as hdp,
  } from 'react-native-responsive-screen';
  import {useState, useCallback} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { Notifier, NotifierComponents } from 'react-native-notifier';

  type useSecureTextEntryReturnType = {
    secureTextEntry: boolean;
    toggleEntry: () => void;
  };
  

  const customWidth = 375;
  const customHeight = 812;
  
  export const wp = (value: number): number => {
    const dimension = (value / customWidth) * 100;
    return wdp(`${dimension}%`);
  };
  export const hp = (value: number): number => {
    const dimension = (value / customHeight) * 100;
    return hdp(`${dimension}%`);
  };
  
  
  export const getCurrentDate = (data: any)=>{
   
    var date = new Date(data).getDate();
    var month = new Date(data).getMonth() + 1;
    var year = new Date(data).getFullYear();
  
    return year + '-' + month + '-' + date;//format: d-m-y;
  }

  
  
  export const numberFormat = (value: number) => {
    const re = '\\d(?=(\\d{' + 3 + '})+' + '\\D' + ')';
    const num = value?.toFixed(Math.max(0, ~~2));
    const str = num?.replace(new RegExp(re, 'g'), '$&' + ',');
    return str;
  }
  
  export const useSecureTextEntry = (isPassword: boolean): useSecureTextEntryReturnType => {
    const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  
    const toggleEntry = useCallback(() => {
      setSecureTextEntry(prevState => !prevState);
    }, []);
  
    return {secureTextEntry, toggleEntry};
  };

  

 export const format = (num: any )=> String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')


  export const copyToClipboard = (value: string) => {
    Clipboard.setString(value)
    Notifier.showNotification({
        title: 'Copied!',
        description: value,
        Component: NotifierComponents.Alert,
        hideOnPress: false,
        componentProps: {
          alertType: 'success',
        },
    });
}