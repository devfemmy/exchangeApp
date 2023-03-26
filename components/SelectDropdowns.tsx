import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image, } from 'react-native'
import React, { useState } from 'react'
import { hp } from '../utils/helper'
import { COLORS, FONTS } from '../utils/constants/theme'
import AntDesign from 'react-native-vector-icons/AntDesign'
import GlobalStyle from '../utils/globalStyle'

const SelectDropdowns = ({label, data, selected, setSelected}: any) => {
  const [modalVisible, setModalVisible] = useState(false);


  const handleSelected = (data: any) => {
    setSelected(data?.name)
    setModalVisible(false)
  }


  return (
    <View style={styles.div}>
      <TouchableOpacity style={GlobalStyle.rowBetween} onPress={() => setModalVisible(true)}>
        <Text>{!selected ? label : selected}</Text>
        <AntDesign name="down" size={15} />
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
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={styles.end}>
                  <AntDesign name="close" size={30} />
                </View>
              </TouchableOpacity>
  
              <Text style={{...FONTS.h3, textAlign: 'center', marginBottom: hp(20)}}>{label}</Text>
           
             <ScrollView>
              {
                data?.map((info: any) => {
                  return <TouchableOpacity onPress={() => handleSelected(info)} key={info?.id}>
                    <View style={styles.modalP}>
                    {info?.image && <Image source={{uri: info?.image}} />}
                    <Text style={{...FONTS.h4, fontWeight: '700', textTransform: 'capitalize', textAlign: !info?.image ? "center" : "left" ,  color: COLORS.primary}}>{info?.name}</Text>
                  </View>
                  </TouchableOpacity>
                })
              }
             </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
     </View>
    </View>
  )
}

export default SelectDropdowns

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
    padding: hp(20),
    backgroundColor: COLORS.primary2,
    marginVertical: hp(5),
    borderRadius: 5
  }
})

