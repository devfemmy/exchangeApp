/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NotifierWrapper } from 'react-native-notifier';
import { Provider } from 'react-redux';
import { store } from './app/store';

import StateCreen from './screens/StateCreen';




const App = () => {
    
    
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