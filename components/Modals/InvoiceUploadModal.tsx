/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, SIZES} from '../../utils/constants/theme';
import {hp, wp} from '../../utils/helper';
import IconTextButton from '../IconTextButton';
import GlobalStyle from '../../utils/globalStyle';
import {launchImageLibrary} from 'react-native-image-picker';
import UploadCard from '../UploadCard';
import { Notifier, NotifierComponents } from 'react-native-notifier';

const InvoiceUploadModal = ({modalVisible, setModalVisible, routeNext}: any) => {
  const [invoiceImg, setInvoiceImg] = useState<any>();


  const imagePickerHandler = async() => {
    const options: any = {
      quality: 1.0,
      maxWidth: 500,
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    launchImageLibrary(options, async (response: any) => {
      // const path = await this.normalizePath(response.uri);
      // const imageUri = await RNFetchBlob.fs.readFile(path, 'base64');
      if (response.didCancel) {
        //('User cancelled photo picker');
      } else if (response.error) {
        //('ImagePicker Error: ', response.error);
      } else {
        // const uri = response.uri;
        const imageUri = response?.assets[0].uri;
        const payload = {
          fileName: response?.assets[0].fileName,
          uri: imageUri
        }
        setInvoiceImg(payload);
      }
    });
  };


  const handleInvoice = (invoiceImg: any) => {
    if(invoiceImg) {
       routeNext(invoiceImg)
    }
    else {
      Notifier.showNotification({
        title: 'Error',
        description: "Invoice is required",
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });
    }
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
                  fontWeight: '600',
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
             <UploadCard header="Upload Invoice Document" data={invoiceImg} handlePress={imagePickerHandler} />

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
                  <IconTextButton label="Upload Invoice" onPress={() => handleInvoice(invoiceImg)} />
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
