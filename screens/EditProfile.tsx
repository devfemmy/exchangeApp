/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import React, { useState } from 'react';
import GlobalStyle from '../utils/globalStyle';
import { ForgetPasswordFormData, ProfileFormData } from '../utils/types';
import CountryPicker from 'react-native-country-picker-modal';
import { useFormik } from 'formik';
import { ForgetPasswordSchema, ProfileAccountSchema } from '../utils/schemas';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextInput } from '../components/TextInput';
import IconTextButton from '../components/IconTextButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { capitalizeWord, hp, wp } from '../utils/helper';
import { COLORS, FONTS } from '../utils/constants/theme';
import { Image } from 'react-native';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateImageProfile, userState } from '../slice/AuthSlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SelectDropdowns from '../components/SelectDropdowns';
import DatePicker from 'react-native-date-picker';
import {updateProfile, getProfile} from '../slice/AuthSlice';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderComponent from '../components/HeaderComponent';
import { modeStatus } from '../slice/TradeSlice';
import { ActivityIndicator } from 'react-native-paper';

const EditProfile = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const userStateInfo = useAppSelector(userState);
  const [countryCode, setCountryCode] = useState('NG');
  const [, setCountry] = useState(null);
  const modeInfo = useAppSelector(modeStatus);
  const getUserInfo = userStateInfo?.userData ? userStateInfo?.userData : userStateInfo;
  const [imageLoader, setImageLoader] = useState(false)
  const [imgUri, setImageUri] = useState(getUserInfo?.image);
  const [base64Img, setBase64] = useState<string>('');
  const [gender, setGender] = useState(getUserInfo?.gender);
  const [date, setDate] = useState(getUserInfo?.dateOfBirth === 'Invalid date' ? new Date('1999-03-30') : new Date(getUserInfo?.dateOfBirth));
  const [open, setOpen] = useState(false);
  const initialValues: ProfileFormData = {
    firstName: getUserInfo?.firstName,
    lastName: getUserInfo?.lastName,
    email: getUserInfo?.emailAddress,
    username: getUserInfo?.username,
    country: getUserInfo?.country,
    streetName: getUserInfo?.homeAddress,
    gender: gender,
    phone: getUserInfo?.phoneNumber,
    dob: '',
    image: getUserInfo?.image,
  };

  
  const handleCredentialSubmit =  async (data: any) => {
    const payload = {
      dateOfBirth: moment(date).format('YYYY-MM-DD'),
      gender: gender,
      country: data?.country === "n/a" ? "" : data?.country ,
      houseAddress: data?.streetName, 
      userId: getUserInfo?._id,
      image: base64Img ? `data:image/jpeg;base64,${base64Img}` : imgUri,
    };
    setLoader(true);
    try {
      var response = (await dispatch(updateProfile(payload))) as any;
      if (updateProfile.fulfilled.match(response)) {
        setLoader(false);
        dispatch(getProfile());
        let msg = "User updated successfully";
        Notifier.showNotification({
          title: 'Success',
          description: msg,
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'success',
          },
        });
      } else {
        var errMsg = response?.payload as string;
        setLoader(false);
        Notifier.showNotification({
          title: 'Error',
          description: errMsg,
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
          },
        });
      }
    } catch (e) {}
  };

 

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: ProfileAccountSchema,
      onSubmit: (data: ProfileFormData) => handleCredentialSubmit(data),
    });
    const onSelect = (country: any) => {
      setCountryCode(country.cca2);
      setCountry(country);
    };
    
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
          setImageLoader(true);
          const imageUri = response?.assets[0].uri;
          const base64Image = response?.assets[0].base64;
          setBase64(base64Image);
          setImageUri(imageUri);
          const uri = response.uri;
          const avatarUri = response.uri;
          const type = response.type;
          const name = response.fileName;

          const payload = {
            userId: getUserInfo?._id,
            image: base64Image ? `data:image/jpeg;base64,${base64Image}` : imgUri,
          };
       
          try {
            var response = (await dispatch(updateImageProfile(payload))) as any;
            if (updateImageProfile.fulfilled.match(response)) {
              setImageLoader(false);
              dispatch(getProfile());
              let msg = "Image uploaded successfully";
              Notifier.showNotification({
                title: 'Success',
                description: msg,
                Component: NotifierComponents.Alert,
                componentProps: {
                  alertType: 'success',
                },
              });
            } else {
              var errMsg = response?.payload as string;
              setImageLoader(false);
              Notifier.showNotification({
                title: 'Error',
                description: errMsg,
                Component: NotifierComponents.Alert,
                componentProps: {
                  alertType: 'error',
                },
              });
            }
          } catch (e) {}
        }
      });
    };

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={[GlobalStyle.container, styles.div, {backgroundColor: modeInfo ? COLORS.white : COLORS.darkMode}]}>
       <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {/* <ScrollView showsVerticalScrollIndicator={false} style={styles.top}> */}
        {/* <AntDesign onPress={() => navigation.goBack()} name="arrowleft" style={styles.icon} size={hp(20)} color={COLORS.gray2} /> */}
         <HeaderComponent onPress={() => navigation.goBack()} />
        <Text style={{...FONTS.h2, color: modeInfo ? COLORS.darkMode : COLORS.white}}>Edit Profile</Text>

        <View style={styles.container} >
          {
            imageLoader ? <View style={{justifyContent: 'center', alignItems: 'center',backgroundColor: 'gray', width: 100, height: 100, borderRadius: 50}}>
              <ActivityIndicator color={COLORS.primary} size={20} />
              </View> : <Pressable style={GlobalStyle.profileCircle2} onPress={imagePickerHandler}>
                  <Image style={styles.icons} source={{uri: getUserInfo?.image}} defaultSource={require('../assets/images/placeholder.png')} />
          </Pressable>
          }
          
          <View>
            <Text style={{...FONTS.h3, fontSize: hp(18), fontWeight: '600', color: COLORS.primary, textAlign: 'center', textTransform: 'capitalize'}}>{capitalizeWord(getUserInfo?.firstName)}  {capitalizeWord(getUserInfo?.lastName)}</Text>
            <Text style={{...FONTS.h4, fontSize: hp(16), fontWeight: '400', color: '#808080', textAlign: 'center'}}>{getUserInfo?.emailAddress}</Text>
          <Text>
          <Text style={{...FONTS.h4, fontSize: hp(11), fontWeight: '400', color: '#808080', textAlign: 'center', fontStyle: 'italic'}}>Joined on:</Text>
            <Text style={{...FONTS.h4, fontSize: hp(11), fontWeight: '400', color: '#808080', textAlign: 'center', fontStyle: 'italic'}}>{moment(getUserInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
          </Text>
          </View>
        </View>

       <View style={styles.top2}>
          <TextInput
              label={'First Name'}
              value={values.firstName}
              editable={false}
              onBlur={handleBlur('firstName')}
              onChangeText={handleChange('firstName')}
              errorMsg={touched.firstName ? errors.firstName : undefined}
            />
          <TextInput
              label={'Last Name'}
              value={values.lastName}
              editable={false}
              onBlur={handleBlur('lastName')}
              onChangeText={handleChange('lastName')}
              errorMsg={touched.lastName ? errors.lastName : undefined}
            />
          <TextInput
              label={'Email'}
              editable={false}
              value={values.email}
              onBlur={handleBlur('emailAddress')}
              onChangeText={handleChange('emailAddress')}
              errorMsg={touched.email ? errors.email : undefined}
            />
            <TextInput
              label={'Username'}
              editable={false}
              value={values.username}
              onBlur={handleBlur('username')}
              onChangeText={handleChange('username')}
              errorMsg={touched.username ? errors.username : undefined}
            />
            <SelectDropdowns
                label="Gender"
                data={[
                  {
                    id: 1,
                    name: 'male',
                  },
                  {
                    id: 2,
                    name: 'female',
                  },
                  {
                    id: 3,
                    name: 'prefer not to say',
                  },
                ]}
                selected={gender}
                setSelected={(value: any) => setGender(value)}
              />
              <View>
              <SelectDropdowns
                dob
                onPress={() => setOpen(true)}
                label="Date of Birth"
                data={[
                  {
                    id: 1,
                    name: 'Male',
                  },
                  {
                    id: 2,
                    name: 'Female',
                  },
                ]}
                selected={String(date).slice(0, 15)}
                // setSelected={(value: any) => setGender(value)}
              />
              <DatePicker
                modal
                mode="date"
                open={open}
                minimumDate={new Date('1990-12-31')}
                date={date}
                onConfirm={(value) => {
                  setOpen(false);
                  setDate(value);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              </View>
            <TextInput
              label={'House Address'}
              value={values.streetName}
              onBlur={handleBlur('streetName')}
              onChangeText={handleChange('streetName')}
              errorMsg={touched.streetName ? errors.streetName : undefined}
            />
            <View style={GlobalStyle.rowBetweenNoCenter}>
            <View style={styles.countryPicker}>
              <CountryPicker
                withCallingCode
                withFlag
                withFilter
                countryCode={countryCode}
                onSelect={onSelect}
                visible={false}
              />
            </View>
            <View style={{width: '89%'}}>
              <TextInput
              label={'Phone Number'}
              value={values.phone}
              editable={false}
              onBlur={handleBlur('phone')}
              onChangeText={handleChange('phone')}
              errorMsg={touched.phone ? errors.phone : undefined}
            />
            </View>
        </View>
       </View>
       <View>
        
       </View>

        <View style={styles.btnContainer}>
          <IconTextButton isLoading={loader} label="Save Changes" onPress={handleSubmit}/>
        </View>
      {/* </ScrollView> */}

      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default EditProfile;


const styles = StyleSheet.create({
  div: {
    paddingVertical: hp(70),

  },
  icons: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  icon: {
    marginVertical: hp(20),
  },
  top2: {
    marginTop: hp(0),
  },
  contain: {
    paddingHorizontal: wp(10),
    flex: 1,
    backgroundColor: 'white',
  },
  buttonStyle: {
    backgroundColor: '#E2E6FD',
    paddingHorizontal: hp(12),
    paddingVertical: hp(7),
    borderRadius: hp(5),
    marginBottom: hp(10),
  },
  countryPicker: {
    // backgroundColor: 'red',
    height: hp(70),
    justifyContent: 'center',
  },
  txt: {
    marginTop: hp(35),
  },
  txt2: {
    marginTop: hp(10),
    marginBottom: hp(24),
  },
  btnContainer: {
    marginVertical: hp(15),
    width: '100%',
    marginBottom: 80,
  },
  span: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp(20),
  },
  fg: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  top: {
    flex: 5,
  },
  bottom: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    marginVertical: hp(20),
    alignItems: 'center',
  },
});
