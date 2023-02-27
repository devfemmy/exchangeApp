import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GlobalStyle from '../utils/globalStyle'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../utils/constants/theme'
import { format, hp } from '../utils/helper'

const HistoryCard = ({data}: any) => {
    const {transactionType,currency, timeStamp, amount, status} = data;

    console.log(typeof(amount))

  return (
    <View style={[GlobalStyle.rowBetween, styles.card]}>
      <View style={[GlobalStyle.rowStart, {padding: hp(10)}]}>
        <View style={{padding: hp(5),marginRight: hp(10), borderRadius: 50, backgroundColor: status === "success" ? COLORS.lightGreen : status === "submitted" ? COLORS.orange : COLORS.red}}>
            <AntDesign name="arrowdown" size={15} color={status === "success" ? COLORS.darkGreen : status === "submitted" ? COLORS.orange : COLORS.red} />
        </View>
        <View>
            <Text>{transactionType} {currency}</Text>
            <Text>{new Date(timeStamp).toDateString()}</Text>
        </View>
      </View>

      <View>
            <Text>{format(parseFloat(amount).toFixed(2))} {currency}</Text>
            <Text style={{textAlign: 'right', color: status === "success" ? COLORS.darkGreen : status === "submitted" ? COLORS.orange : COLORS.red}}>{status}</Text>
        </View>
    </View>
  )
}

export default HistoryCard

const styles = StyleSheet.create({
 card: {
    borderWidth: 1,
    borderColor: COLORS.lightGray2,
    marginBottom: hp(10)
 }
})