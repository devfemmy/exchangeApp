/* eslint-disable react-native/no-inline-styles */







import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../../utils/constants/theme';
import {copyToClipboard, format, hp, wp} from '../../utils/helper';
import GlobalStyle from '../../utils/globalStyle';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';

const TransactionDetailModal = ({modalVisible, setModalVisible, data}: any) => {


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
              style={{...FONTS.body3, textAlign: 'center', fontWeight: '700', marginBottom: hp(20)}}>
              Transaction Details
            </Text>

            <View>
              <View style={[GlobalStyle.rowStart, {marginVertical: hp(10)}]}>
                <View
                  style={{
                    padding: hp(15),
                    marginRight: hp(20),
                    borderRadius: 50,
                    backgroundColor:
                    data?.status === 'success' ? COLORS.lightGreen : data?.status === 'submitted' ? COLORS.lightOrange : COLORS.lightOrange,
                  }}>
                  <AntDesign
                    name={data?.transactionType === 'withdraw' ? 'arrowup' : 'arrowdown'}
                    size={20}
                    color={
                      data?.status === 'success' ? COLORS.darkGreen : data?.status === 'submitted' ? COLORS.orange :  COLORS.orange
                    }
                  />
                </View>
                <View>
                  <Text style={{textTransform: 'capitalize', ...FONTS.body4}}>
                    {data?.transactionType}
                  </Text>
                  <Text style={{...FONTS.body5, color: COLORS.gray}}>
                  { (data?.currency === "USDT" || data?.currency === "USDC") ? parseFloat(data?.amount) : parseFloat(data?.amount)?.toFixed(5).slice(0, -1)} {data?.currency?.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                  Amount:
                </Text>
                <Text style={{...FONTS.body3, textTransform: 'capitalize'}}>
                 {(data?.currency === "USDT" || data?.currency === "USDC") ? parseFloat(data?.amount) : parseFloat(data?.amount).toFixed(5).slice(0, -1)} {data?.currency?.toUpperCase()}
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
               <Text style={{...FONTS.body3, marginRight: hp(30), width: wp(220)}}>{data?.type === 'internal' ? data?.billId : data?.txId}</Text>
               <Feather name="copy" size={20} onPress={() => copyToClipboard(data?.type === 'internal' ? data?.billId : data?.txId)} />
               </View>
              </View>


  <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                {data?.type === 'internal' ? 'Fee' :  'Network'}
                </Text>
                <Text style={{...FONTS.body3, textTransform: 'capitalize'}}>
                  { data?.type === 'internal' ? data?.fee : data?.chain}
                </Text>
              </View>

              {
                data?.transactionType === 'withdraw' && data?.type !== 'internal' && <View>
<View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                Fee:
                </Text>
                <Text style={{...FONTS.body3, textTransform: 'capitalize'}}>
                  {data?.fee}
                </Text>
              </View>

              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                To Address:
                </Text>
                <Text style={{...FONTS.body3, textTransform: 'capitalize'}}>
                  { data?.toAddr}
                </Text>
              </View>

                  </View>
              }


              <View style={GlobalStyle.rowBetween}>
              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                  Transaction Type:
                </Text>
                <Text style={{...FONTS.body3, textTransform: 'capitalize'}}>
                  {data?.type} Transaction
                </Text>
              </View>
            {
              data?.type === 'internal' &&   <View style={styles.mt}>
              <Text
                style={{
                  textTransform: 'capitalize',
                  ...FONTS.body4,color: COLORS.gray,
                  textAlign: 'right',
                }}>
                Beneficiary:
              </Text>
              <Text style={{...FONTS.body4}}>
                @{data?.beneficiary?.username}
              </Text>
            </View>
            }
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
                <Text style={{...FONTS.body3, fontSize: hp(12), textTransform: 'capitalize'}}>
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
                <Text style={{...FONTS.body4, textAlign: 'right', color: data?.status === 'success' ? COLORS.darkGreen : data?.status === 'submited' ? COLORS.orange : COLORS.orange , textTransform: 'capitalize'}}>
                  {data?.status}
                </Text>
              </View>
              </View>

              {
                data?.type === 'external' && data?.chain !== 'USDT-TRC20' &&
              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    ...FONTS.body4,color: COLORS.gray,
                  }}>
                  Value when received in USD
                </Text>
                <Text style={{...FONTS.body3, color: COLORS.black, textTransform: 'uppercase'}}>
                  {format(parseFloat(data?.usdValue ? data?.usdValue : 0)?.toFixed(2))} USD
                </Text>
              </View>
              }


            </View>
          </View>
        </View>
      </Modal>
    </View>
   </View>
  );
};

export default TransactionDetailModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparentBlack,
  },
  modalView: {
    margin: 20,
    // maxHeight: hp(650),
    backgroundColor: 'white',
    borderRadius: 20,
    padding:hp(25),
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
