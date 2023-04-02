/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, FONTS } from '../utils/constants/theme';
import { format, hp } from '../utils/helper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

const HistoryCard = ({data, handleClick}: any) => {
    const {transactionType,currency, timeStamp, amount, status} = data;


  return (
   <TouchableOpacity onPress={() => handleClick(data)}>
     <View style={[GlobalStyle.rowBetween, styles.card]}>
      <View style={[GlobalStyle.rowStart]}>
        <View style={{padding: hp(5),marginRight: hp(10), borderRadius: 50, backgroundColor: status === 'success' ? COLORS.lightGreen : status === 'submitted' ? COLORS.lightOrange :  COLORS.lightOrange}}>
            <AntDesign name={transactionType === 'withdraw' ? 'arrowup' : 'arrowdown'} size={25} color={status === 'success' ? COLORS.darkGreen : status === 'submitted' ? COLORS.orange : COLORS.orange} />
        </View>
        <View>
            <Text>
            <Text style={{textTransform: 'capitalize', ...FONTS.body4}}>{transactionType}</Text>
            <Text style={{...FONTS.body4 }}> {currency?.toUpperCase()}</Text>
            </Text>
            <Text  style={{...FONTS.body5,fontSize: hp(11)}}>{moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a')}</Text>
        </View>
      </View>

      <View>
            <Text  style={{fontWeight: '600', ...FONTS.body4}}>{format(parseFloat(amount))} {currency}</Text>
            <Text style={{textTransform: "capitalize",textAlign: 'right',...FONTS.body4, color: status === 'success' ? COLORS.darkGreen : status === 'submitted' ? COLORS.orange : COLORS.orange}}>{status}</Text>
        </View>



    </View>
   </TouchableOpacity>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
 card: {
    borderWidth: 0.4,
    borderColor: 'rgba(72, 95, 230, 0.5)',
    marginBottom: hp(18),
    padding: hp(5),
    borderRadius: 5,
    paddingHorizontal: hp(15),
    paddingVertical: hp(15),
 },
});
