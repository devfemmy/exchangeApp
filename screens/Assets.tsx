/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import { View, Text } from 'react-native'
import React from 'react'
import MainLayout from './mainLayout'
import GlobalStyle from '../utils/globalStyle'

const Assets = () => {
  return (
    <MainLayout>
     <View style={GlobalStyle.container}>
      <Text>Assets</Text>
    </View> 
   </MainLayout>
  )
}

export default Assets