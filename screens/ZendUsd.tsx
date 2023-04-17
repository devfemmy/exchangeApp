import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';
import DocumentPicker from "react-native-document-picker"
import GlobalStyle from '../utils/globalStyle';
import HeaderComponent from '../components/HeaderComponent';
import {COLORS, FONTS} from '../utils/constants/theme';
import {hp} from '../utils/helper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconTextButton from '../components/IconTextButton';
import {TextInput} from '../components/TextInput';
import {useFormik} from 'formik';
import {CompanyVerificationSchema} from '../utils/schemas';
import {CompanyVerificationFormData} from '../utils/types';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {verifyOrganisation} from '../slice/ZendSlice';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {launchImageLibrary} from 'react-native-image-picker';
import { userState } from '../slice/AuthSlice';
import KycLogo from "../assets/svg/kyclogo.svg";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { getTradeStatus, modeStatus, tradeStatus } from '../slice/TradeSlice';

const ZendUsd = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [imgUriCac, setImageUriCac] = useState<any>();
  const [imgUriMemo, setImageUriMemo] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false)
  const isFocused = useIsFocused();
  const tradeStatusInfo = useAppSelector(tradeStatus)
  const userStateInfo = useAppSelector(userState);
  const modeInfo = useAppSelector(modeStatus);
  const getUserInfo = userStateInfo?.userData
  ? userStateInfo?.userData
  : userStateInfo;



  useEffect(() => {
      if(getUserInfo?.isKycVerified) {
        setModalVisible(false)
      }
      else {
        setModalVisible(true)
      }
  }, [getUserInfo?.isKycVerified, isFocused])

  const initialValues: CompanyVerificationFormData = {
    CACNumber: '',
    registeredName: '',
  };

  const handleVisible = () => {
    setModalVisible(false)
  }
  const handleSubmitData = async (data: any) => {
    setLoader(true);
    const payload = {
      CACNumber: data?.CACNumber,
      registeredName: data?.registeredName,
        isCacUploaded: true,
        cacFile: imgUriCac?.uri,
        isMemoUploaded: true,
        memoFile: imgUriMemo,
        userId: getUserInfo?.id
    };
    try {
      var response = await dispatch(verifyOrganisation(payload));
      if (verifyOrganisation.fulfilled.match(response)) {
        setLoader(false);
        navigation.navigate('CacUploadSuccess');
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
    } catch (e) {
      setLoader(false);
    }
  };

  const {values, errors, touched, handleChange, handleSubmit, handleBlur} =
    useFormik({
      initialValues,
      validationSchema: CompanyVerificationSchema,
      onSubmit: (data: CompanyVerificationFormData) => handleSubmitData(data),
    });

    const imagePickerHandlerCac = async() => {
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
          const imageUri = response?.assets[0].uri;
          const payload = {
            fileName: response?.assets[0].fileName,
            uri: imageUri
          }
          setImageUriCac(payload);
        }
      });
    };



    const imagePickerHandlerMemo = useCallback(async () => {
      try {
        const response = await DocumentPicker.pick({
          presentationStyle: 'fullScreen',
        });
        setImageUriMemo(response[0]?.uri);
      } catch (err) {
        console.warn(err);
      }
    }, []);

    // async() => {
    //   const options: any = {
    //     quality: 1.0,
    //     maxWidth: 500,
    //     mediaType: 'pdf',
    //     includeBase64: true,
    //     maxHeight: 500,
    //     storageOptions: {
    //       skipBackup: true,
    //     },
    //   };
    //   launchImageLibrary(options, async (response: any) => {
    //     // const path = await this.normalizePath(response.uri);
    //     // const imageUri = await RNFetchBlob.fs.readFile(path, 'base64');
    //     if (response.didCancel) {
    //       //('User cancelled photo picker');
    //     } else if (response.error) {
    //       //('ImagePicker Error: ', response.error);
    //     } else {
    //       // const uri = response.uri;
    //       const imageUri = response?.assets[0].uri;
    //       const payload = {
    //         fileName: response?.assets[0].fileName,
    //         uri: imageUri
    //       }
    //       setImageUriMemo(payload);
      
    //     }
    //   });
    // };



    const proceedKyc = () => {
      setModalVisible(false)
      dispatch(getTradeStatus(!tradeStatusInfo))
      if(!getUserInfo?.hasVerifiedPhoneNumber) {
        return navigation.navigate("VerifyPhone")
      }
      return navigation.navigate("KycScreen")
    }


  return (
    <View style={[GlobalStyle.container, {backgroundColor: modeInfo ? COLORS.white : COLORS.darkMode}]}>
      <HeaderComponent onPress={() => navigation.goBack()} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <ScrollView>
        <Text style={{...FONTS.h3, fontWeight: '600',color:modeInfo ? COLORS.black : COLORS.white}}>
          Welcome to Zend USD
        </Text>
        <Text style={{...FONTS.body4, marginTop: hp(20), color:modeInfo ? COLORS.gray : COLORS.white}}>
          Welcome to zend USD, before you can carry out any transactions you
          have to upload your company CAC Document
        </Text>

        <TouchableOpacity onPress={imagePickerHandlerCac}>
          <View style={styles.div}>
            <AntDesign name="addfolder" size={20} color={COLORS.primary} />
            <Text style={{...FONTS.body5, color: COLORS.primary}}>
              Upload CAC Document
            </Text>
            <Text style={{...FONTS.body5, color: COLORS.black}}>
              Support file type JPEG, PNG, Max file 2mb
            </Text>
            <Text style={{...FONTS.body5, color: COLORS.gray}}>{imgUriCac ? imgUriCac?.fileName : null}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={imagePickerHandlerMemo}>
          <View style={styles.div2}>
            <AntDesign name="addfolder" size={20} color={COLORS.primary} />
            <Text style={{...FONTS.body5, color: COLORS.primary}}>
              Upload Mermat (MEMORANDUM OF ARTICLES)
            </Text>
            <Text style={{...FONTS.body5, color: COLORS.black}}>
              Support file type PDF, Max file 2mb
            </Text>
            <Text style={{...FONTS.body5, color: COLORS.gray}}>{imgUriMemo ? imgUriMemo?.fileName : null}</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          label={'Business Name'}
          value={values?.registeredName}
          onBlur={handleBlur('registeredName')}
          onChangeText={handleChange('registeredName')}
          errorMsg={touched.registeredName ? errors.registeredName : undefined}
        />
        <TextInput
          label={'Business Number'}
          value={values?.CACNumber}
          onBlur={handleBlur('CACNumber')}
          onChangeText={handleChange('CACNumber')}
          errorMsg={touched.CACNumber ? errors.CACNumber : undefined}
        />
        <IconTextButton
          label="Upload Document"
          onPress={() => handleSubmit()}
          isLoading={loader}
        />


<View>
    <View style={styles.centeredView}>
     <Modal
       animationType="slide"
       transparent={true}
       visible={modalVisible}
       onDismiss={() => {
        handleVisible();
       }}
       onRequestClose={() => {
         handleVisible();
       }}>
       <View style={styles.centeredView}>
       <View style={[styles.modalView, {backgroundColor:modeInfo ? COLORS.white : COLORS.darkMode}]}>
           <View style={{justifyContent: 'center', alignItems: 'center'}}>
           <KycLogo />
            <Text style={{...FONTS.body3, textAlign: 'center',color:modeInfo ? COLORS.black : COLORS.white}}>You need to complete your KYC to continue</Text>
           </View>

           <View style={{marginTop: hp(25)}}>
            <IconTextButton label="Proceed to Kyc" onPress={() => proceedKyc()} />
           </View>

         </View>
       </View>
       
     </Modal>
   </View>
  </View>
      </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ZendUsd;

const styles = StyleSheet.create({
  div: {
    marginTop: hp(30),
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 15,
    borderStyle: 'dashed',
    backgroundColor: COLORS.primary2,
    height: hp(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(30),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparentBlack
  },
  end: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalView: {
    margin: 20,
    // height: hp(600),
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
  div2: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 15,
    borderStyle: 'dashed',
    backgroundColor: COLORS.primary2,
    height: hp(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(20),
  },
});
