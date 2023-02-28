/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../../utils/constants/theme';
import {copyToClipboard, hp, wp} from '../../utils/helper';
import GlobalStyle from '../../utils/globalStyle';
import Feather from 'react-native-vector-icons/Feather';

const TransactionDetailModal = ({modalVisible, setModalVisible, data}: any) => {


  return (
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
              style={{...FONTS.h3, textAlign: 'center', marginBottom: hp(20)}}>
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
                      data?.status === 'success'
                        ? COLORS.lightGreen
                        : data?.status === 'submitted'
                        ? COLORS.orange
                        : COLORS.red,
                  }}>
                  <AntDesign
                    name="arrowdown"
                    size={15}
                    color={
                      data?.status === 'success'
                        ? COLORS.darkGreen
                        : data?.status === 'submitted'
                        ? COLORS.orange
                        : COLORS.red
                    }
                  />
                </View>
                <View>
                  <Text style={{textTransform: 'capitalize', ...FONTS.body4}}>
                    {data?.transactionType}
                  </Text>
                  <Text style={{...FONTS.body3, color: COLORS.lightGray3}}>
                    {data?.chain} {data?.currency} 
                  </Text>
                </View>
              </View>

              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    color: COLORS.lightGray3,
                    ...FONTS.body4,
                  }}>
                  Order ID:
                </Text>
               <View style={GlobalStyle.rowStart}>
               <Text style={{...FONTS.body3, marginRight: hp(30)}}>{data?._id}</Text>
               <Feather name="copy" size={20} onPress={() => copyToClipboard(data?._id)} />
               </View>
              </View>

              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    color: COLORS.lightGray3,
                    ...FONTS.body4,
                  }}>
                  Withdraw Type:
                </Text>
                <Text style={{...FONTS.body3, textTransform: 'capitalize'}}>
                  {data?.type} withdrawal
                </Text>
              </View>

              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    color: COLORS.lightGray3,
                    ...FONTS.body4,
                  }}>
                  From:
                </Text>
                <Text style={{...FONTS.body3, textTransform: 'capitalize'}}>
                  N/A
                </Text>
              </View>

              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    color: COLORS.lightGray3,
                    ...FONTS.body4,
                  }}>
                Token:
                </Text>
                <Text style={{...FONTS.body3, textTransform: 'capitalize'}}>
                  {data?.currency}
                </Text>
              </View>

              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    color: COLORS.lightGray3,
                    ...FONTS.body4,
                  }}>
                  Amount:
                </Text>
                <Text style={{...FONTS.body3, textTransform: 'capitalize'}}>
                 {data?.amount} {data?.currency?.toUpperCase()}
                </Text>
              </View>

              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    color: COLORS.lightGray3,
                    ...FONTS.body4,
                  }}>
                  Date:
                </Text>
                <Text style={{...FONTS.body3, textTransform: 'capitalize'}}>
                {new Date(data?.timeStamp).toDateString()}
                </Text>
              </View>

              <View style={styles.mt}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    color: COLORS.lightGray3,
                    ...FONTS.body4,
                  }}>
                  Transaction Status:
                </Text>
                <Text style={{...FONTS.body3, color: data?.status === "success" ? COLORS.darkGreen : data?.status === "submited" ? COLORS.orange : COLORS.red, textTransform: 'capitalize'}}>
                  {data?.status}
                </Text>
              </View>

            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TransactionDetailModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalView: {
    margin: 20,
    height: hp(650),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '90%',
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
