/* eslint-disable quotes */
/* eslint-disable no-sequences */
import { View, Text, StyleSheet,  Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, FONTS } from '../../utils/constants/theme';
import { hp, wp } from '../../utils/helper';
import FastImage from 'react-native-fast-image';
import { useAppSelector } from '../../app/hooks';
import { userState } from '../../slice/AuthSlice';
import GlobalStyle from '../../utils/globalStyle';
import { useNavigation } from '@react-navigation/native';
import { Notifier, NotifierComponents } from 'react-native-notifier';


const WithdrawalNotice = ({modalVisible, setModalVisible, data}: any) => {
    const navigation = useNavigation() as any
    const userStateInfo = useAppSelector(userState);
    const getUserInfo = userStateInfo?.userData ? userStateInfo?.userData : userStateInfo


    const handlePress = () => {
        if(data?.user?.length <= 0 && data?.userAddress?.length <= 0) {
            return Notifier.showNotification({
              title: 'Error',
              description: "No User Selected",
              Component: NotifierComponents.Alert,
              componentProps: {
                alertType: 'error',
              },
            });
          }
          setModalVisible()
        return navigation.navigate("TwoFactorVerification", {
            params: {
                ...data
            }
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
  
              <View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FastImage
                    style={styles.image}
                    defaultSource={getUserInfo?.icon}
                    source={{
                        uri: getUserInfo?.image,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={{...FONTS.h3, textAlign: 'center', marginVertical: hp(20)}}>Are you sure you want to withdraw into this Zend User account?</Text>
                
               
            </View> 
            <Text style={{marginBottom: hp(20)}}>
                    <Text style={{...FONTS.body3, color: COLORS.gray}}>Username: </Text>
                    <Text style={{...FONTS.body3}}>{data?.user || data?.userAddress}</Text>
                </Text>

                <View style={GlobalStyle.rowBetween}>
                   <TouchableOpacity onPress={() => setModalVisible()} style={{borderColor: COLORS.primary, borderWidth: 1, borderRadius: hp(5), padding: hp(15), width: "47%"}}>
                   <View>
                        <Text style={{color: COLORS.primary,textAlign: 'center'}}>Cancel</Text>
                    </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => handlePress()} style={{backgroundColor: COLORS.primary, borderRadius: hp(5), padding: hp(15),width: "47%"}}>
                   <View>
                        <Text style={{color: COLORS.white, textAlign: 'center'}}>Continue</Text>
                    </View>
                   </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

export default WithdrawalNotice

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.transparentBlack
      },
      modalView: {
        margin: 20,
        maxHeight: hp(650),
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
      image: {
        width: wp(50),
        height: hp(50),
        borderRadius: 50,
    },
    btn: {

    }
  });