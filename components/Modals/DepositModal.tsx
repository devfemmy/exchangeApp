/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
  ScrollView
  } from 'react-native';
  import React from 'react';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {COLORS, FONTS} from '../../utils/constants/theme';
  import { hp, wp} from '../../utils/helper';

import { useNavigation } from '@react-navigation/native';

  
  const DepositModal = ({modalVisible, setModalVisible, networks, otherInfo}: any) => {
    const navigation = useNavigation() as any

    const handleAction = (data: any) => {
        setModalVisible()
       return navigation.navigate("DepositAddress", {
            data: data,
            otherInfo: otherInfo
        })
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
  
              <Text style={{...FONTS.h3, color: COLORS.primary, fontWeight: '600', textAlign: 'center', marginBottom: hp(20)}}>Select Network</Text>
             
             <ScrollView showsVerticalScrollIndicator={false}>
             {
                networks?.map((data: any) => {
                    return <TouchableOpacity onPress={() => handleAction(data)}>
                       <View style={styles.net}>
                       <Text style={{...FONTS.h4, color: COLORS.primary,fontWeight: '600', textAlign: 'center'}}>{data?.chain}</Text>
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
    );
  };
  
  export default DepositModal;
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      // paddingBottom: 50,
      backgroundColor: COLORS.transparentBlack
    },
    modalView: {
      margin: 20,
      height: hp(350),
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
      width: "30%"
    },
    net: {
        padding: hp(10),
        backgroundColor: COLORS.primary2,
        marginBottom: hp(20),
        borderRadius: 10,
        justifyContent: 'center',
        height: hp(65)
    }
  });