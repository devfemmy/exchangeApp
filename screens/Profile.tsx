/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Pressable,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainLayout from './mainLayout';
import GlobalStyle from '../utils/globalStyle';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {deleteUserAccount, getProfile, signOutUser, userState} from '../slice/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconTextButton from '../components/IconTextButton';
import {hp, wp} from '../utils/helper';
import {bigM, userSearch} from '../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ListCard from '../components/ListCard';
import {COLORS, FONTS} from '../utils/constants/theme';
import EditIcon from '../assets/svg/edit.svg';
import TextIconIndicator from '../components/TextIcon';
import CheckIcon from '../assets/svg/check.svg';
import UserDark from '../assets/svg/userdark.svg';
import UserSearch from '../assets/svg/user-search.svg';
import SecuritySafe from '../assets/svg/security-safe.svg';
import SupportDark from '../assets/svg/24-supportdark.svg';
import SignOutDark from '../assets/svg/logoutdark.svg';
import LogOuts from "../assets/svg/logout.svg"
import { modeStatus } from '../slice/TradeSlice';
import { Notifier, NotifierComponents } from 'react-native-notifier';

const Profile = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const userStateInfo = useAppSelector(userState);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const modeInfo = useAppSelector(modeStatus);

  const getUserInfo = userStateInfo?.userData
    ? userStateInfo?.userData
    : userStateInfo;

  const logOut = async () => {
    dispatch(signOutUser()).then(() => {
      AsyncStorage.clear();
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const token = await AsyncStorage.getItem('token')
      dispatch(getProfile());
    };
    loadData();
  }, []);

  const Info = [
    {
      id: 1,
      name: 'General',
      icon: <UserDark />,
      route: 'EditProfile',
    },
    {
      id: 4,
      name: 'KYC',
      icon: <UserSearch />,
      route: 'KycScreen',
    },
    {
      id: 2,
      name: 'Security',
      icon: <SecuritySafe />,
      route: 'SecurityScreen',
    },
    {
      id: 3,
      name: 'Support',
      icon: <SupportDark />,
      route: 'SupportScreen',
    },
    {
      id: 5,
      name: 'Refer & Earn',
      icon: <UserDark />,
      route: 'ReferAndEarn',
    },
    {
      id: 6,
      name: 'Delete Account',
      icon: <UserDark />,
      route: 'SignOut',
    },
    {
      id: 7,
      name: 'Sign Out',
      icon: <SignOutDark />,
      route: 'SignOut',
    },
  ];

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

  return (
    <MainLayout>
      <View style={[GlobalStyle.container,{backgroundColor: modeInfo ? "white" : "#1a202c"}]}>
        <View style={[styles.container,{backgroundColor: modeInfo ? "white" : "#1a202c"}]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{...FONTS.h2, marginBottom: hp(25), fontWeight: '600',color: modeInfo ? "#1a202c" : "white"}}>
              Account Settings
            </Text>

            {/* <View style={[GlobalStyle.rowBetween, styles.settings]}>
          <View style={GlobalStyle.profileCircle}>
            <Image source={{uri: getUserInfo?.image}}  style={styles.imgs} />
          </View>
          <View style={styles.textContainer}>
            <Text style={{...FONTS.h3, fontSize: hp(18), fontWeight: '600', color: COLORS.primary, textTransform: 'capitalize'}}>{getUserInfo?.firstName + " " + getUserInfo?.lastName }</Text>
          <View style={styles.lowerContainer}>
            <Text style={{...FONTS.h4, fontSize: hp(16), fontWeight: '600', color: COLORS.black}}>@{getUserInfo?.username}</Text>
            <TextIconIndicator icon={<CheckIcon width={15} height={15} color={getUserInfo?.isVerified ? "#219653" : COLORS.white} />} bg={getUserInfo?.isVerified ? "#DEF8E9" : COLORS.red } color={getUserInfo?.isVerified ? "#219653" : COLORS.white} text={getUserInfo?.isVerified ? "Verified" : "Not verified"} />
          </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={{width: '10%', alignItems: 'flex-end'}}>
            <EditIcon width={30} height={30} />
          </TouchableOpacity>
        </View>
        <View>
        <Text style={{...FONTS.h3, marginBottom: hp(15), color: '#4F4F4F', fontWeight: '600'}}>User Level</Text>
        <View style={[GlobalStyle.rowBetween, styles.levelContainer]}>
          <View style={GlobalStyle.level}>
            <Text style={{...FONTS.h4, color: '#4F4F4F', fontWeight: '500'}}>Beginner</Text>
          </View>
          <View>
            <Text style={styles.textStyle}>
              Progress 50%
            </Text>
          </View>
        </View>
        </View> */}

            <View>
              {Info?.map((data, i) => {
                return (
                  <ListCard
                    id={i}
                    data={data}
                    modeInfo={modeInfo}
                    handlePress={() => navigation.navigate(data?.route)
                    }
                    logOut={ data?.name === "Sign Out" ? () => setModalVisible(true) : () => setModalDeleteVisible(true)}
                  />
                );
              })}
            </View>

            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(false);
                }}>
                <View style={[styles.centeredView]}>
                  <View style={[styles.modalView,{backgroundColor: modeInfo ? "white" : "#1a202c"}]}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <View style={styles.end}>
                        <AntDesign name="close" size={30} />
                      </View>
                    </TouchableOpacity>

                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <LogOuts  />
                      <Text style={{...FONTS.h3, fontWeight: '700', marginVertical: hp(10)}}>Confirm Logout</Text>
                      <Text style={{...FONTS.body4, marginBottom: hp(10)}}>Are you sure about this?</Text>
                      <TouchableOpacity onPress={() => logOut()}>
                      <View style={{backgroundColor: COLORS.red, width: wp(100), padding: hp(10), borderRadius: hp(5)}}>
                        <Text style={{textAlign: 'center',...FONTS.h3, color: COLORS.white }}>Logout</Text>
                      </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
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
                  <View style={[styles.modalView, {backgroundColor: modeInfo ? "white" : "#1a202c"}]}>
                    <TouchableOpacity onPress={() => setModalDeleteVisible(false)}>
                      <View style={styles.end}>
                        <AntDesign name="close" size={30} />
                      </View>
                    </TouchableOpacity>

                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <LogOuts  />
                      <Text style={{...FONTS.h3, fontWeight: '700', marginVertical: hp(10)}}>Confirm Account Delete</Text>
                      <Text style={{...FONTS.body4, marginBottom: hp(10)}}>Are you sure about this?</Text>
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
        </View>
      </View>
    </MainLayout>
  );
};

export default Profile;

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
  textStyle: {
    color: '#4F4F4F',
    fontWeight: '400',
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
