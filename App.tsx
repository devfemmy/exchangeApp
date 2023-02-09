/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { Provider } from 'react-redux';
import { store } from './app/store';
import ContainerComponent from './components/ContainerComponent';
import NoAuthComponennt from './components/NoAuthComponennt';




const App = () => {
    const token = false;
    return (
      <Provider store={store}>
        <PaperProvider>
             {
                token ? <ContainerComponent /> : <NoAuthComponennt />
            }
        </PaperProvider>
           
      </Provider>
      
    )
}

export default App;