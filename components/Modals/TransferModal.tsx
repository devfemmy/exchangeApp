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
import { ScrollView } from 'react-native-gesture-handler';
import SelectTokenModal from './SelectTokenModal';


const TransferModal = ({modalVisible, setModalVisible}: any) => {
  const [from, setFrom] = useState('Funding');
  const [to, setTo] = useState('Trading');
  const [selectedAssets, setSelectedAssets] = useState('USD');
  const [number, setNumber] = useState('');
  const [openSelect, setOpenSelect] = useState(false)

  const handleOpenSelectOpen = () => {
    setOpenSelect(true)
  }

  const handleOpenSelectClose = () => {
    setOpenSelect(false)
  }


  const changeDirection = () => {
    if (from === 'Trading') {
      setFrom('Funding');
      setTo('Trading');
    } else {
      setFrom('Trading');
      setTo('Funding');
    }
  };

  const handleSelection = (value: any) => {
    setSelectedAssets(value)
    handleOpenSelectClose()
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
        <ScrollView>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible()}>
              <View style={styles.end}>
                <AntDesign name="close" size={30} />
              </View>
            </TouchableOpacity>

            <Text style={{...FONTS.h2, textAlign: 'left'}}>
              Transfer Assets
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                textAlign: 'left',
                color: COLORS.lightGray3,
              }}>
              Select assets you want to transfer
            </Text>

            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.rowDiv}>
                  <Text style={{...FONTS.body5, color: COLORS.lightGray3}}>From</Text>
                </View>
                <View style={styles.cardDiv}>
                  <Text style={{...FONTS.body5, color: COLORS.lightGray3}}>{from}</Text>
                  <Image source={stroke} />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.nd}></View>
                <View style={styles.nd1}></View>
                <TouchableOpacity onPress={() => changeDirection()}>
                  <View style={styles.icon}>
                    <Image
                      source={icons?.trade}
                      resizeMode="contain"
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <View style={styles.rowDiv}>
                  <Text style={{...FONTS.body5, color: COLORS.lightGray3}}>To</Text>
                </View>
                <View style={styles.cardDiv}>
                  <Text style={{...FONTS.body5, color: COLORS.lightGray3}}>{to}</Text>
                  <Image source={stroke} />
                </View>
              </View>
            </View>

           <TouchableOpacity onPress={() => handleOpenSelectOpen()}>
           <View style={styles.card2}>
                <View>
 <Text style={{...FONTS.body5, color: COLORS.lightGray3}}>Select Token</Text>
                <Text style={{...FONTS.body3}}>{selectedAssets}</Text>
                </View>
                <AntDesign name="down" size={10} />
               
            </View>
           </TouchableOpacity>

            <View style={styles.card2}>
                <View>
                 <Text style={{...FONTS.body5, color: COLORS.lightGray3}}>Enter Amount you want to Transfer</Text>
                 <TextInput
        style={styles.input}
        onChangeText={(value) => setNumber(value)}
        value={number}
        placeholder={`0 ${selectedAssets}`}
        keyboardType="numeric"
      />
                </View>
                <View style={{backgroundColor: COLORS.primary, paddingHorizontal: hp(5), borderRadius: 5}}>
                     <Text style={{...FONTS.body4, color: COLORS.white}}>Max</Text>
                </View>
              
            </View>
            <Text style={{...FONTS.body4, marginVertical: hp(5), color: COLORS.lightGray3}}>{`Avail: 0 ${selectedAssets}`}</Text>
          
          <View style={{marginTop: hp(10)}}>
            <IconTextButton label="Transfer Token" />
          </View>
          
          </View> 
          </ScrollView>
          <SelectTokenModal modalVisible={openSelect} setSelectedToken={(value: any) => handleSelection(value)} setModalVisible={() => handleOpenSelectClose()} />
        </View>
       
      </Modal>

    
    </View>
  );
};

export default TransferModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: COLORS.white
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
    marginVertical: hp(20),
    backgroundColor: COLORS.primary2,
    padding: hp(25),
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
    height: 40
   
  }
});
