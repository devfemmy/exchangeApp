/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
import React, {useEffect} from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NotifierWrapper } from 'react-native-notifier';
import { Provider } from 'react-redux';
import { store } from './app/store';
import SplashScreen from 'react-native-splash-screen'
import StateCreen from './screens/StateCreen';




const App = () => {

  
     useEffect(() => {
    SplashScreen.hide();
  }, [])

    return (
      <NotifierWrapper>
      <Provider store={store}>
        <PaperProvider>
            <StateCreen />
        </PaperProvider>
           
      </Provider>
      </NotifierWrapper>
    )
}

export default App;