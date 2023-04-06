import React, { useEffect } from 'react';
import Dojah from 'react-native-dojah';

const DojahWidget = () => {
  console.log('I AM HERE')
   /**
   *  This is your app ID
   * (go to your dashboard at
   * https://dojah.io/dashboard
   * to create an app and retrieve it)
   */
   const appID = '6398a00bc3a43300361eb885';

   /**
    *  This is your account public key
    *  (go to your dashboard at
    *  https://dojah.io/dashboard to
    *  retrieve it. You can also regenerate one)
    */
   const publicKey = 'test_pk_uLc0qO4nTjSuCXkvvzOy4WPYL';

   /**
    *  This is the widget type you'd like to load
    *  (go to your dashboard at
    *  https://dojah.io/dashboard to enable different
    *  widget types)
    */
   const type = 'custom';

   /**
    *  These are the configuration options
    *  available to you are:
    *  {debug: BOOL, pages: ARRAY[{page: STRING, config: OBJECT}]}
    *
    *  The config object is as defined below
    *
    *  NOTE: The otp and selfie options are only
    *  available to the `verification` widget
    */
   const config = {
     debug: true,
     pages: [
       {page: 'phone-number', config: {verification: false}},
       {page: 'address'},
       {
         page: 'government-data',
         config: {
           bvn: true,
           nin: false,
           dl: false,
           mobile: false,
           otp: false,
           selfie: false,
         },
       },
       {page: 'selfie'},
       {page: 'id', config: {passport: false, dl: true}},
     ],
   };

   /**
    *  These are the user's data to verify, options
    *  available to you possible options are:
    *  {first_name: STRING, last_name: STRING, dob: DATE STRING}
    *
    *  NOTE: Passing all the values will automatically skip
    *  the user-data page (thus the commented out `last_name`)
    */
   const userData = {
     first_name: 'Chijioke',
     last_name: '', // 'Nna'
     dob: '2022-05-01',
   };

   /**
    *  These are the metadata options
    *  You can pass any values within the object
    */
   const metadata = {
     user_id: '121',
   };

   /**
    * @param {String} responseType
    * This method receives the type
    * The type can only be one of:
    * loading, begin, success, error, close
    * @param {String} data
    * This is the data from doja
    */
   const response = (responseType, data) => {
     console.log(responseType, data);
     if (responseType === 'success') {
     } else if (responseType === 'error') {
     } else if (responseType === 'close') {
     } else if (responseType === 'begin') {
     } else if (responseType === 'loading') {
     }
   };
   useEffect(() => {
    console.log('WIDGET IS CALLED')
    Dojah.hydrate(appID, publicKey);
  }, [appID, publicKey]);

   /**
    *  The `ViewStyle` of the outermost `View` wrapping the Dojah container
    *  defaults to {width: '100%', height: '100%'}
    */
   const outerContainerStyle = {width: '100%', height: '100%'};

   /**
    *  The `ViewStyle` of the `WebView` containing the Dojah connection
    *  This prop is passed to the WebView `style` prop
    */
   const style = {};

   /**
    *  The `ViewStyle` of the innermost `View` within the WebView
    *  This prop is passed to the WebView `containerStyle` prop
    */
   const innerContainerStyle = {};

   // The Doja library accepts 3 props and
   // initiliazes the doja widget and connect process
   return (
     <Dojah
       response={response}
       appID={appID}
       publicKey={publicKey}
       config={config}
       type={type}
       outerContainerStyle={outerContainerStyle}
       style={style}
       innerContainerStyle={innerContainerStyle}
     />
   );
 };

export default DojahWidget;
