/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
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
import { hp, wp } from '../utils/helper';
import { COLORS, FONTS } from '../utils/constants/theme';
import { Image } from 'react-native';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { userState } from '../slice/AuthSlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SelectDropdowns from '../components/SelectDropdowns';
import DatePicker from 'react-native-date-picker';
import {updateProfile, getProfile} from '../slice/AuthSlice';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

const EditProfile = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const userStateInfo = useAppSelector(userState);
  const [countryCode, setCountryCode] = useState('NG');
  const [, setCountry] = useState(null);

  const getUserInfo = userStateInfo?.userData ? userStateInfo?.userData : userStateInfo;
  console.log('getUserInfo?.dateOfBirth', getUserInfo)
  const [imgUri, setImageUri] = useState(getUserInfo?.image);
  const [base64Img, setBase64] = useState(getUserInfo?.image);
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
    image: imgUri,
  };
  const handleCredentialSubmit =  async (data: any) => {
    const payload = {
      dateOfBirth: moment(date).format('YYYY-MM-DD'),
      gender: gender,
      country: data?.country,
      houseAddress: data?.streetName,
      userId: getUserInfo?._id,
      image: '',
    };
    setLoader(true);
    try {
      var response = (await dispatch(updateProfile(payload))) as any;
      if (updateProfile.fulfilled.match(response)) {
        setLoader(false);
        dispatch(getProfile());
        let msg = response?.payload?.message as string;
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
        console.log('response', response.payload);

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
          console.log('response', response?.assets[0].uri);
          const imageUri = response?.assets[0].uri;
          const base64Image = response?.assets[0].base64;
          setBase64(base64Image);
          setImageUri(imageUri);
          const uri = response.uri;
          const avatarUri = response.uri;
          const type = response.type;
          const name = response.fileName;
        }
      });
    };

  return (
    <View style={[GlobalStyle.container, styles.div]}>
       <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.top}>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" style={styles.icon} size={hp(20)} color={COLORS.gray2} />

        <Text style={{...FONTS.h2, fontWeight: '700'}}>Edit Profile</Text>

        <View style={styles.container}>
          {/* <View style={GlobalStyle.level}>
            <Text style={{...FONTS.h4, color: '#4F4F4F', fontWeight: '500'}}>Beginner</Text>
          </View> */}
          <Pressable style={styles.buttonStyle}  onPress={imagePickerHandler} >
          <Text style={{...FONTS.h4, fontSize: hp(15), fontWeight: '400', color: '#232323', textAlign: 'center'}}>Upload New Image</Text>
          </Pressable>
          <Pressable style={GlobalStyle.profileCircle2}>
          <FastImage
                    style={styles.icons}
                    defaultSource={require('../assets/images/placeholder.png')}
                    source={{
                        uri: imgUri,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
          </Pressable>
          <View>
            <Text style={{...FONTS.h3, fontSize: hp(18), fontWeight: '600', color: COLORS.primary, textAlign: 'center', textTransform: 'capitalize'}}>{getUserInfo?.firstName} {getUserInfo?.lastName}</Text>
            <Text style={{...FONTS.h4, fontSize: hp(16), fontWeight: '400', color: '#808080', textAlign: 'center'}}>@{getUserInfo?.emailAddress}</Text>
          </View>
        </View>

       <View style={styles.top2}>
          <TextInput
              label={'First Name'}
              value={values.firstName}
              disabled
              onBlur={handleBlur('firstName')}
              onChangeText={handleChange('firstName')}
              errorMsg={touched.firstName ? errors.firstName : undefined}
            />
          <TextInput
              label={'Last Name'}
              value={values.lastName}
              disabled
              onBlur={handleBlur('lastName')}
              onChangeText={handleChange('lastName')}
              errorMsg={touched.lastName ? errors.lastName : undefined}
            />
          <TextInput
              label={'Email'}
              disabled
              value={values.email}
              onBlur={handleBlur('emailAddress')}
              onChangeText={handleChange('emailAddress')}
              errorMsg={touched.email ? errors.email : undefined}
            />
            <TextInput
              label={'Username'}
              disabled
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
              disabled
              onBlur={handleBlur('phone')}
              onChangeText={handleChange('phone')}
              errorMsg={touched.phone ? errors.phone : undefined}
            />
            </View>
        </View>
       </View>
       <View>
        
       <Text style={{...FONTS.h4, fontSize: hp(15), fontWeight: '400', color: '#808080', textAlign: 'center', fontStyle: 'italic'}}>Joined on:</Text>
            <Text style={{...FONTS.h4, fontSize: hp(15), fontWeight: '400', color: '#808080', textAlign: 'center', fontStyle: 'italic'}}>{moment(getUserInfo?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
       </View>

        <View style={styles.btnContainer}>
          <IconTextButton isLoading={loader} label="Save Changes" onPress={handleSubmit}/>
        </View>
      </ScrollView>

      </KeyboardAwareScrollView>
    </View>
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
    marginTop: hp(20),
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
