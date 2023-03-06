import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/globalStyle'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS, FONTS } from '../utils/constants/theme'
import { format, hp } from '../utils/helper'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HistoryCard = ({data, handleClick}: any) => {
    const {transactionType,currency, timeStamp, amount, status} = data;
  

  return (
   <TouchableOpacity onPress={() => handleClick(data)}>
     <View style={[GlobalStyle.rowBetween, styles.card]}>
      <View style={[GlobalStyle.rowStart, {padding: hp(10)}]}>
        <View style={{padding: hp(5),marginRight: hp(10), borderRadius: 50, backgroundColor: transactionType === "deposit" ? COLORS.lightGreen : transactionType === "withdraw" ? "#FFCCCB" : transactionType === "incoming" ? "#FFD580" : ""}}>
            <AntDesign name={transactionType === "withdraw" ? "arrowdown" : "arrowup"} size={15} color={transactionType === "deposit" ? COLORS.darkGreen : transactionType === "withdraw" ? COLORS.red : transactionType === "incoming" ? COLORS.orange : ""} />
        </View>
        <View>
            <Text style={{textTransform: 'capitalize', ...FONTS.body4}}>{transactionType}</Text>
            <Text  style={{...FONTS.body5}}>{new Date(timeStamp).toDateString()}</Text>
        </View>
      </View>

      <View>
            <Text  style={{fontWeight: "bold", ...FONTS.body4}}>{format(parseFloat(amount).toFixed(3))} {currency}</Text>
            <Text style={{textAlign: 'right',...FONTS.body5, color: status === "success" ? COLORS.darkGreen : status === "submitted" ? COLORS.orange : COLORS.red}}>{status}</Text>
        </View>


   
    </View>
   </TouchableOpacity>
  )
}

export default HistoryCard

const styles = StyleSheet.create({
 card: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray2,
    marginBottom: hp(10),
    padding: hp(5)
 }
})