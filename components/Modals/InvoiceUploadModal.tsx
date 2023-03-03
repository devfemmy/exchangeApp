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
import {COLORS, FONTS, SIZES} from '../../utils/constants/theme';
import {hp, wp} from '../../utils/helper';
import IconTextButton from '../IconTextButton';
import GlobalStyle from '../../utils/globalStyle';
import { useNavigation } from '@react-navigation/native';
import UploadCard from '../UploadCard';

const InvoiceUploadModal = ({modalVisible, setModalVisible}: any) => {
  const navigation = useNavigation() as any

  const routeNext = () => {
    setModalVisible()
    return navigation.navigate("PaymentDetails")
  
  }

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
                style={{
                  ...FONTS.h3,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: hp(20),
                }}>
                Upload Invoice
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.gray,
                  textAlign: 'center',
                  marginBottom: hp(10),
                }}>
                To complete your transaction, Kindly upload your payment invoice
              </Text>
             <UploadCard header="Upload CAC Document" />

              <View style={GlobalStyle.rowBetween}>
                <TouchableOpacity
                  onPress={() => setModalVisible()}
                  style={styles.btn}>
                  <View>
                    <Text style={{...FONTS.body4, color: COLORS.primary}}>
                      No, Go back
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.cod}>
                  <IconTextButton label="Upload Invoice" onPress={() => routeNext()} />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default InvoiceUploadModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // paddingBottom: 50,
    backgroundColor: COLORS.transparentBlack,
  },
  modalView: {
    margin: 20,
    height: hp(450),
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
  cod: {
    width: '48%',
  },
  btn: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(65),
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: SIZES.radius,
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
  div: {
    marginTop: hp(30),
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 15,
    borderStyle: 'dashed',
    backgroundColor: COLORS.primary2,
    height: hp(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(50),
  },
});
