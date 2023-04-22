import { View, Text, StyleSheet, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { hp } from '../utils/helper';
import { COLORS, FONTS } from '../utils/constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GlobalStyle from '../utils/globalStyle';
import CountryFlag from "react-native-country-flag";
import { TextInput } from '../components/TextInput'
import { useAppSelector } from '../app/hooks';
import { modeStatus } from '../slice/TradeSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SelectDropdowns = ({label, data, selected, setSelected, dob, onPress, search}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const modeInfo = useAppSelector(modeStatus);
  
  const handleSelected = (info: any) => {
    setSelected(info?.name);
    setModalVisible(false);
  };

  const filterSearch = data?.filter((dd: any) => dd?.name?.toLowerCase().includes(value?.toLowerCase()))


  return (
    <View style={[styles.div, {backgroundColor: !modeInfo ? COLORS.darkMode : COLORS.primary2, borderColor: !modeInfo ? COLORS.white : COLORS.primary}]}>
      <TouchableOpacity style={GlobalStyle.rowBetween} onPress={dob ? onPress : () => setModalVisible(true)}>
        <Text style={{color: !modeInfo ? COLORS.white : COLORS.black}}>{!selected ? label : selected}</Text>
        <AntDesign name="down" size={15} color={!modeInfo ? COLORS.white : COLORS.black} />
      </TouchableOpacity>

      <View>
       <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {backgroundColor:modeInfo ? COLORS.white : COLORS.darkMode}]}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={styles.end}>
                  <AntDesign name="close" size={30} color={modeInfo ? COLORS.black : COLORS.white} />
                </View>
              </TouchableOpacity>

              <Text style={{...FONTS.h3, textAlign: 'center', marginBottom: hp(20),color:modeInfo ? COLORS.black : COLORS.white}}>{label}</Text>
              {
                search && <View style={{width: '100%'}}>
                <TextInput
                   label={'Search country'}
                   value={value}
                   onChangeText={(value: any) => setValue(value)}
                   searchInput
                   style={{backgroundColor: COLORS.ldPrimary}}
                 />
                </View>
              }
             <ScrollView>
              {
               search ?
               filterSearch?.map((info: any) => {
                return <TouchableOpacity onPress={() => handleSelected(info)} key={info?.id}>
                  <View style={styles.modalP}>
                 
                  {info?.code &&  <CountryFlag isoCode={info?.code} size={25} style={{width: 20, height: 20, marginRight: 10}} />}
                  <Text style={{...FONTS.body5, fontWeight: '700', textTransform: 'uppercase', textAlign: !info?.code? 'center' : 'left' ,  color: COLORS.primary}}>{info?.name}</Text>
                </View>
                </TouchableOpacity>;
              })
              :
              data?.map((info: any) => {
                return <TouchableOpacity onPress={() => handleSelected(info)} key={info?.id}>
                  <View style={styles.modalP}>
                 
                  {info?.code &&  <CountryFlag isoCode={info?.code} size={25} style={{width: 20, height: 20, marginRight: 10}} />}
                  <Text style={{...FONTS.body5, fontWeight: '700', textTransform: 'uppercase', textAlign: !info?.code? 'center' : 'left' ,  color: COLORS.primary}}>{info?.name}</Text>
                </View>
                </TouchableOpacity>;
              })
              }
             </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
     </View>
    </View>
  );
};

export default SelectDropdowns;

const styles = StyleSheet.create({

  div: {
    padding: hp(20),
    backgroundColor: COLORS.primary2,
    borderRadius: 5,
    marginBottom: hp(15),
    borderColor: COLORS.primary,
    borderWidth: 0.3,


  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparentBlack,

  },
  end: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalView: {
    margin: 20,
    maxHeight: hp(600),
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
  modalP: {
    flexDirection: 'row',
    padding: hp(20),
    backgroundColor: COLORS.primary2,
    marginVertical: hp(5),
    borderRadius: 5,
  },
});

