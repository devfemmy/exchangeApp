/* eslint-disable react-native/no-inline-styles */







import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../../utils/constants/theme';
import {copyToClipboard, format, hp, wp} from '../../utils/helper';
import GlobalStyle from '../../utils/globalStyle';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';

const SwapDetailModal = ({modalVisible, setModalVisible, data}: any) => {


  return (
   <View>
     <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible()}>
              <View style={styles.end}>
                <AntDesign name="close" size={30} />
              </View>
            </TouchableOpacity>

            <Text
              style={{...FONTS.body4, textAlign: 'center', fontWeight: '700', marginBottom: hp(20)}}>
              Transaction Details
            </Text>

            <View>
              <View style={[GlobalStyle.rowStart, {marginVertical: hp(10)}]}>
                <View
                  style={{
                    padding: hp(15),
                    marginRight: hp(20),
                    borderRadius: 50,
                    backgroundColor: COLORS.lightGreen,
                  }}>
                  <AntDesign
                    name={'swap'}
                    size={15}
                    color={COLORS.darkGreen}
                  />
                </View>
                <View>
                  <Text style={{textTransform: 'capitalize', ...FONTS.body4}}>
                    Swap
                  </Text>
                  <Text style={{...FONTS.body5, color: COLORS.gray}}>
                  {data?.fromCurrency +  '-' + data?.toCurrency}
                  </Text>
                </View>
              </View>

              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                  Amount Received:
                </Text>
                <Text style={{...FONTS.body4}}>
                 {format(parseFloat(data?.toCurrencyAmt).toFixed(5).slice(0, -1))} {data?.toCurrency?.toUpperCase()}
                </Text>
              </View>

              <View style={styles.mt}>
                <Text
                  style={{
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                  Transaction ID:
                </Text>
               <View style={GlobalStyle.rowBetween}>
               <Text style={{...FONTS.body4, marginRight: hp(30)}}>{data?.ordId}</Text>
               <Feather name="copy" size={20} onPress={() => copyToClipboard(data?.ordId)} />
               </View>
              </View>

            <View style={GlobalStyle.rowBetween}>
            <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                  From:
                </Text>
                <Text style={{...FONTS.body4}}>
                  {format(parseFloat(data?.fromCurrencyAmt)?.toFixed(5).slice(0, -1))} {data?.fromCurrency?.toUpperCase()}
                </Text>
              </View>
                  <AntDesign name="swap" size={20} />
                  <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    textAlign: 'right',
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                  To:
                </Text>
                <Text style={{...FONTS.body4}}>
                {format(parseFloat(data?.toCurrencyAmt)?.toFixed(5).slice(0, -1))} {data?.toCurrency?.toUpperCase()}
                </Text>
              </View>
            </View>

              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                 Conversion Rate:
                </Text>
                <Text style={{...FONTS.body4, textTransform: 'capitalize'}}>
                {data?.rate}
                </Text>
              </View>

              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                 Fee:
                </Text>
                <Text style={{...FONTS.body4, textTransform: 'capitalize'}}>
                {format(parseFloat(data?.fee)?.toFixed(7).slice(0, -1))}
                </Text>
              </View>


             <View style={GlobalStyle.rowBetween}>
  <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                  Date:
                </Text>
                <Text style={{...FONTS.body4, textTransform: 'capitalize', fontSize: hp(11)}}>
                {moment(data?.timeStamp).format('MMMM Do YYYY, h:mm:ss a')}
                </Text>
              </View>

               <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                  Transaction Status:
                </Text>
                <Text style={{...FONTS.body4, color: data?.status === 'success' ? COLORS.darkGreen : data?.status === 'submited' ? COLORS.orange :  data?.status === 'pending' ? COLORS.orange : COLORS.red, textTransform: 'capitalize'}}>
                  {data?.status}
                </Text>
              </View>
             </View>


            </View>
          </View>
        </View>
      </Modal>
    </View>
   </View>
  );
};

export default SwapDetailModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparentBlack,
  },
  modalView: {
    margin: 20,
    // height: hp(650),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  end: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  search: {
    marginVertical: hp(15),
  },
  icons: {
    width: wp(20),
    height: hp(20),
  },
  actionCard2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(10),
    paddingBottom: hp(10),
    padding: 10,
    borderRadius: 10,
  },
  sub: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '30%',
  },
  net: {
    padding: hp(10),
    backgroundColor: COLORS.primary2,
    marginBottom: hp(10),
    borderRadius: 10,
  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray2,
    marginBottom: hp(10),
    padding: hp(5),
  },
  mt: {
    marginTop: hp(20),
  },
});
