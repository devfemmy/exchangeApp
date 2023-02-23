/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../../utils/constants/theme';
import {hp, wp} from '../../utils/helper';
import {stroke} from '../../assets/images';
import icons from '../../utils/constants/icons';
import IconTextButton from '../IconTextButton';
import {ScrollView} from 'react-native-gesture-handler';
import SelectTokenModal from './SelectTokenModal';
import SwapTokenModal from './SwapTokenModal';

const SwapModal = ({modalVisible, setModalVisible}: any) => {
  const [from, setFrom] = useState('Funding');
  const [to, setTo] = useState('Trading');
  const [selectedAssetsFrom, setSelectedAssetsFrom] = useState('USD');
  const [selectedAssetsTo, setSelectedAssetsTo] = useState('USD');
  const [number, setNumber] = useState('');
  const [openSelectFrom, setOpenSelectFrom] = useState(false);
  const [openSelectTo, setOpenSelectTo] = useState(false);
  const [max, setMax] = useState('');

  const handleOpenSelectFromOpen = () => {
    setOpenSelectFrom(true);
  };

  const handleOpenSelectFromClose = () => {
    setOpenSelectFrom(false);
  };

  const handleOpenSelectToOpen = () => {
    setOpenSelectTo(true);
  };

  const handleOpenSelectToClose = () => {
    setOpenSelectTo(false);
  };

  const range = [
    {
      id: 1,
      num: '25%',
    },
    {
      id: 2,
      num: '50%',
    },
    {
      id: 3,
      num: '75%',
    },
    {
      id: 4,
      num: '100%',
    },
  ];

  const handleSelectionFrom = (value: any) => {
    setSelectedAssetsFrom(value);
    handleOpenSelectFromClose();
  };

  const handleSelectionTo = (value: any) => {
    setSelectedAssetsTo(value);
    handleOpenSelectToClose();
  };

  const changeAction = () => {
   setSelectedAssetsFrom(selectedAssetsTo)
   setSelectedAssetsTo(selectedAssetsFrom)
  }

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

            <Text style={{...FONTS.h2, textAlign: 'left'}}>Swap Assets</Text>
            <Text
              style={{
                ...FONTS.body4,
                textAlign: 'left',
                color: COLORS.lightGray3,
              }}>
              Select assets you want to swap
            </Text>

            <View style={styles.card}>
              <View style={{width: '40%'}}>
               <TouchableOpacity onPress={() => handleOpenSelectFromOpen()}>
               <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <Image source={} /> */}
                  <Text style={{...FONTS.body5}}>{selectedAssetsFrom}</Text>
                  <AntDesign name="down" />
                </View>
               </TouchableOpacity>
                <Text style={{...FONTS.body5}}>Bal 0 {selectedAssetsFrom}</Text>
              </View>
             <TouchableOpacity onPress={() => changeAction()}>
             <View style={{backgroundColor: COLORS.primary2,borderColor: COLORS.primary, borderWidth: 1, padding: hp(5), borderRadius: 50}}>
                <AntDesign name="swap" color={COLORS.primary} />
              </View>
             </TouchableOpacity>
              <View
                style={{
                  width: '40%',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                     <TouchableOpacity onPress={() => handleOpenSelectToOpen()}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <Image source={} /> */}
                  <Text style={{...FONTS.body5}}>{selectedAssetsTo}</Text>
                  <AntDesign name="down" />
                </View>
                </TouchableOpacity>
                <Text style={{...FONTS.body5}}>Bal 0 {selectedAssetsTo}</Text>
              </View>
            </View>

            <View style={styles.card2}>
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={value => setNumber(value)}
                  value={number}
                  placeholder={`0`}
                  keyboardType="numeric"
                />
              </View>
              <View
                style={{
                  paddingHorizontal: hp(5),
                  borderRadius: 5,
                }}>
                <Text style={{...FONTS.h4, color: COLORS.black}}>{selectedAssetsFrom}</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginVertical: hp(20),
              }}>
              {range?.map(data => {
                return (
                  <TouchableOpacity onPress={() => setMax(data?.num)}>
                    <Text
                      style={{
                        ...FONTS.body5,
                        color: max === data?.num ? COLORS.white : COLORS.black,
                        backgroundColor:
                          max === data?.num
                            ? COLORS.primary
                            : COLORS.lightGray2,
                        marginHorizontal: hp(5),
                        paddingHorizontal: hp(5),
                        borderRadius: 15,
                      }}>
                      {data?.num}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{marginTop: hp(10)}}>
              <IconTextButton label="Convert" />
            </View>
          </View>

          <SwapTokenModal
            modalVisible={openSelectFrom}
            setSelectedToken={(value: any) => handleSelectionFrom(value)}
            setModalVisible={() => handleOpenSelectFromClose()}
            selectedToken={selectedAssetsTo}
          />
          <SwapTokenModal
            modalVisible={openSelectTo}
            setSelectedToken={(value: any) => handleSelectionTo(value)}
            setModalVisible={() => handleOpenSelectToClose()}
            selectedToken={selectedAssetsFrom}
          />
        </View>
      </Modal>
    </View>
  );
};

export default SwapModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: COLORS.white,
  },
  modalView: {
    margin: 20,
    height: hp(550),
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
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(20),
    backgroundColor: COLORS.primary2,
    padding: hp(15),
    borderRadius: 10,
  },
  card2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(5),
    backgroundColor: COLORS.primary2,
    paddingHorizontal: hp(25),
    paddingVertical: hp(10),
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowDiv: {
    width: '20%',
  },
  cardDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },
  icon: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: hp(10),
    width: wp(30),
    height: hp(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: hp(20),
  },
  nd1: {
    width: '60%',
    height: hp(1),
    backgroundColor: COLORS.lightGray3,
  },
  nd: {
    width: '20%',
  },
  input: {
    height: 40,
  },
});
