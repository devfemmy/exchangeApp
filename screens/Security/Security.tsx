
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../../utils/constants/theme';
import MainLayout from '../mainLayout';
import { hp, wp } from '../../utils/helper';
import HeaderComponent from '../../components/HeaderComponent';
import GlobalStyle from '../../utils/globalStyle';
import SecurityIcon from '../../assets/svg/security-safe.svg';
import PassswordIcon from '../../assets/svg/password-check.svg';
// import BioMetricIcon from '../../assets/svg/finger-scan.svg';
import ListCardItem from '../../components/ListCardItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteUserAccount, signOutUser, userState } from '../../slice/AuthSlice';
import { modeStatus } from '../../slice/TradeSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LogOuts from "../../assets/svg/logout.svg"


export default function Security({navigation}: any) {
  const userStateInfo = useAppSelector(userState);
  const modeInfo = useAppSelector(modeStatus);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
  const getUserInfo = userStateInfo?.userData
    ? userStateInfo?.userData
    : userStateInfo;


  const RouteInfo = [
    {
      id: 2,
      name: 'Change Transaction Pin',
      icon: <SecurityIcon width={25} height={25} />,
      route: 'ChangePin',
      isVerify: false
    },
    {
      id: 3,
      name: 'Change Password',
      icon: <PassswordIcon width={25} height={25} />,
      route: 'ChangePassword',
      isVerify: false,
    },
    {
      id: 4,
      name: 'Verfify Phone Number',
      icon: <PassswordIcon width={25} height={25} />,
      route: 'VerifyPhone',
      isVerify: getUserInfo?.hasVerifiedPhoneNumber ? true : false
    },
       {
      id: 5,
      name: 'Delete Account',
      icon: <SecurityIcon width={25} height={25} color="red" />,
      route: 'DeleteAccount',
    },
    // {
    //   id: 5,
    //   name: 'Allow Biometrics',
    //   icon: <BioMetricIcon width={25} height={25} />,
    //   route: 'NotificationScreen',
    // },
  ];
const dispatch = useAppDispatch();
const logOut = async () => {
  dispatch(signOutUser()).then(() => {
    AsyncStorage.clear();
  });
};
  const deleteUser = async () => {
    const payload = {
      id: getUserInfo?.id
    }
    try {
      var response = await dispatch(deleteUserAccount(payload))
      if(deleteUserAccount.fulfilled.match(response)){
        logOut()
      }
      else {
        var errMsg = response?.payload as string
        Notifier.showNotification({
          title: 'Error',
          description: errMsg,
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
          },
        });
      }
    }
    catch(e) {
      console.log({e})
    }
  }


  
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={[GlobalStyle.container,{backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
      <MainLayout>
        <ScrollView>
          <HeaderComponent onPress={() => navigation.goBack()} />
          <Text style={{...FONTS.h2}}>Security</Text>
          <Text style={styles.textStyle}>Protect all delecate informations on this application to prevents intruder</Text>
          <View>
          {
            RouteInfo?.filter(a => !a?.isVerify)?.map((data, i) => {
              return <ListCardItem onToggleSwitch={onToggleSwitch} isSwitchOn={isSwitchOn} icon={data?.icon} key={i} id={i} data={data} handlePress={data?.route === "DeleteAccount" ? () => setModalDeleteVisible(true) :() => navigation.navigate(data?.route)} logOut={(() => null)} />;
            })
          }
        </View>

        <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalDeleteVisible}
                onRequestClose={() => {
                  setModalDeleteVisible(false);
                }}>
                <View style={[styles.centeredView]}>
                  <View style={[styles.modalView, {backgroundColor: modeInfo ? "white" : COLORS.darkMode}]}>
                    <TouchableOpacity onPress={() => setModalDeleteVisible(false)}>
                      <View style={styles.end}>
                        <AntDesign name="close" size={30} color={modeInfo ? COLORS.black : COLORS.white} />
                      </View>
                    </TouchableOpacity>

                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <LogOuts  />
                      <Text style={{...FONTS.h3, fontWeight: '700', marginVertical: hp(10),color: modeInfo ? COLORS.black : COLORS.white}}>Confirm Account Delete</Text>
                      <Text style={{...FONTS.body4, marginBottom: hp(10),color: modeInfo ? COLORS.black : COLORS.white}}>Are you sure about this?</Text>
                      <TouchableOpacity onPress={() => deleteUser()}>
                      <View style={{backgroundColor: COLORS.red, width: wp(150), padding: hp(10), borderRadius: hp(5)}}>
                        <Text style={{textAlign: 'center',...FONTS.h3, color: COLORS.white }}>Delete Account</Text>
                      </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
        </ScrollView>
      </MainLayout>
    </View>
  );
}


const styles = StyleSheet.create({
  imgCircle: {
    backgroundColor: '#E2E6FD',
    padding: hp(10),
    borderRadius: 50,
  },
  lowerContainer: {
    justifyContent: 'space-between',
    marginTop: hp(5),
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparentBlack,
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
  txt: {
    marginTop: hp(35),
    alignItems: 'center',
  },
  end: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  container: {
    paddingHorizontal: wp(10),
    backgroundColor: 'white',
    flex: 1,
    paddingTop: hp(10),
  },
  row: {
    flexDirection: 'row',
    paddingVertical: hp(10),
    alignItems: 'center',
    marginTop: hp(16),
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(20),
  },
  levelContainer: {
    marginBottom: hp(20),
  },
  rowDiv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  div: {
    width: '50%',
    marginHorizontal: hp(20),
  },
  settings: {
    marginBottom: hp(25),
  },
  textContainer: {
    width: '55%',
  },
  textStyle: {
    marginVertical: hp(15),
    color: '#4F4F4F',
    lineHeight: 20,
  },
  img: {},
  txt1: {},
  txt2: {
    backgroundColor: '#DEF8E9',
    paddingHorizontal: hp(8),
    marginLeft: hp(5),
    borderRadius: 10,
  },
  txtNotVerified: {
    backgroundColor: '#ff0000',
    paddingHorizontal: hp(8),
    marginLeft: hp(5),
    borderRadius: 10,
  },
  txt3: {},
  tag: {
    backgroundColor: '#E2E6FD',
    borderRadius: 10,
    padding: hp(10),
    width: wp(110),
  },
  imgs: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});