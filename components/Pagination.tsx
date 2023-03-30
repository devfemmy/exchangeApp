import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/globalStyle'
import { hp, wp } from '../utils/helper'
import { COLORS } from '../utils/constants/theme'

const Pagination = ({data, handlePagination}: any) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <View style={[GlobalStyle.rowBetween, {paddingBottom: hp(10)}]}>
        <TouchableOpacity disabled={data?.page === 1} style={{backgroundColor: COLORS.red, padding: hp(10),width: wp(80)}} onPress={() => handlePagination("prev")}> 
         <Text style={{color: COLORS.white, textAlign: 'center'}}>Prev</Text>
        </TouchableOpacity>
        <View style={{width: wp(20)}} />
         <TouchableOpacity disabled={data?.page === data?.nextPage} style={{backgroundColor: COLORS.primary, padding: hp(10),width: wp(80)}} onPress={() => handlePagination("next")}>
         <Text style={{color: COLORS.white, textAlign: 'center'}}>Next</Text>
        </TouchableOpacity>
     </View>
    </View>
  )
}

export default Pagination