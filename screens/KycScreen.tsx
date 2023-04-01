import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import CountryPicker from 'react-native-country-picker-modal';
import {COLORS, FONTS} from '../utils/constants/theme';
import {hp, wp} from '../utils/helper';
// import {useAppSelector} from '../app/hooks';
// import {userState} from '../slice/AuthSlice';
// import {SelectInput} from '../components/SelectInput';
// import {TextInput} from '../components/TextInput';
import IconTextButton from '../components/IconTextButton';
import DojahWidget from '../components/Dojah';
// import UploadCard from '../components/UploadCard';
// import { PhoneNumberData } from '../utils/types';
// import { useFormik } from 'formik';
// import { PhoneSchema } from '../utils/schemas';
// import SelectDropdowns from '../components/SelectDropdowns';


const KycScreen = ({navigation}: any) => {
  // const [type, setType] = useState(1)
  // const userStateInfo = useAppSelector(userState);
  // const [countryCode, setCountryCode] = useState('NG');
  // const [, setCountry] = useState(null);
  // const initialValues: PhoneNumberData = {
  //   phone: '',
  // };
  // const handleCredentialSubmit = (data: any) => {
  //   console.log('HandleSubmit');
  // };
  // const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
  //   useFormik({
  //     initialValues,
  //     validationSchema: PhoneSchema,
  //     onSubmit: (data: PhoneNumberData) => handleCredentialSubmit(data),
  //   });
  // const onSelect = (country: any) => {
  //   setCountryCode(country.cca2);
  //   setCountry(country);
  // };
  // const getUserInfo = userStateInfo?.userData
  //   ? userStateInfo?.userData
  //   : userStateInfo;

    // const [selectedKin, setSelectedKin] = useState("")
    // const [selectedVerifyType, setSelectedVerifyType] = useState("")

    // const sectionOne = () => {
    //     return (
    //         <View>
    //              <View style={styles.container}>
    //         {/* <View style={GlobalStyle.profileCircle2}>
    //           <Image source={{uri: getUserInfo?.image}} style={styles.icons} />
    //         </View>
    //         <View
    //           style={{
    //             backgroundColor: COLORS.primary2,
    //             padding: hp(10),
    //             borderRadius: 10,
    //           }}>
    //           <Text style={{...FONTS.body4, color: COLORS.primary}}>
    //             Upload a Selfie
    //           </Text>
    //         </View> */}
    //       </View>
    //       <View style={GlobalStyle.rowBetweenNoCenter}>
    //         <View style={styles.countryPicker}>
    //           <CountryPicker
    //             withCallingCode
    //             withFlag
    //             withFilter
    //             countryCode={countryCode}
    //             onSelect={onSelect}
    //             visible={false}
    //           />
    //         </View>
    //         <View style={{width: '89%',}}>
    //           <TextInput
    //           label={'Phone Number'}
    //           value={values.phone}
    //           onBlur={handleBlur('phone')}
    //           onChangeText={handleChange('phone')}
    //           errorMsg={touched.phone ? errors.phone : undefined}
    //         />
    //         </View>
    //     </View>

    //       {/* <View style={styles.form}>
    //         <SelectInput placeholder="Date of Birth" />
    //         <SelectInput placeholder="Nationality" />
    //         <TextInput label="State" />
    //         <TextInput label="Street Name" />
    //         <SelectInput placeholder="Gender" />
    //         <SelectInput placeholder="Marital Status" />
    //       </View> */}
    //         </View>
    //     )
    // }

    // const sectionTwo = () => {
    //     return (
    //         <View>

    //       <View style={styles.form}>
    //       <TextInput label="Name Next of Kin" />
    //         <SelectDropdowns
    //             label="Next of Kin Relationship"
    //             data={[
    //               {
    //                 id: 1,
    //                 name: "Father"
    //               },
    //               {
    //                 id: 2,
    //                 name: "Sibling"
    //               },
    //               {
    //                 id: 3,
    //                 name: "Friend"
    //               }
    //             ]}
    //             selected={selectedKin}
    //             setSelected={(value: any) => setSelectedKin(value)}
    //           />

    //         <TextInput label="Next of kin Address" />
    //         <SelectDropdowns
    //             label="Verification Type ID"
    //             data={[
    //               {
    //                 id: 1,
    //                 name: "Voter's Card"
    //               },
    //               {
    //                 id: 2,
    //                 name: "National ID Card"
    //               },
    //               {
    //                 id: 3,
    //                 name: "Passport"
    //               }
    //             ]}
    //             selected={selectedVerifyType}
    //             setSelected={(value: any) => setSelectedVerifyType(value)}
    //           />

    //         <TextInput label="Verification Number" />
    //         <UploadCard header="Upload scanned ID" />
    //       </View>
    //         </View>
    //     )
    // }


    const handleDojah = () => {
      return (
        <>
     
        </>
        // <DojahWidget />
      )
    }

  return (
    <View style={GlobalStyle.container}>
      <View style={styles.top}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            style={styles.icon}
            size={hp(20)}
            color={COLORS.gray2}
          />

          <Text style={{...FONTS.h2, fontWeight: '700'}}>KYC Verification</Text>
          <Text style={{...FONTS.body4, color: COLORS.gray, width: wp(250)}}>
            Complete your kyc process to increase your transaction limit
          </Text>

          <View style={[GlobalStyle.rowStart, {marginVertical: hp(15)}]}>
            {/* <View style={{width: type === 1 ? "50%" : "100%", borderBottomWidth: 1,paddingBottom: hp(10), borderBottomColor: COLORS.primary}}>
                <Text style={{...FONTS.body4}}>{type === 1 ? "1/2" : "2/2"}</Text>
            </View> */}
             <View style={{width: "50%", borderBottomWidth: 1,paddingBottom: hp(10), borderBottomColor: COLORS.primary}}>
                <Text style={{...FONTS.body4}}>Level 2</Text>
            </View>
          </View>

         {/* {
            type === 1 && sectionOne()
         }
         {
            type === 2 && sectionTwo()
         } */}

<Text style={{...FONTS.body4, color: COLORS.gray, marginTop: hp(10)}}>On this level, you will provided the neccessary documents as stated below to complete this process.</Text>
       
       <View style={{marginTop: hp(20)}}>
       <View style={styles.div2}>
          <Text style={{fontSize: hp(40), marginRight: hp(5), marginTop: hp(-5)}}>{'\u2022'}</Text>
          <Text style={{...FONTS.body3}}>
            {' '}
           Bio Data
          </Text>
        </View>
        <View style={styles.div2}>
          <Text style={{fontSize: hp(40), marginRight: hp(5),marginTop: hp(-5)}}>{'\u2022'}</Text>
          <Text style={{...FONTS.body3}}>
            {' '}
           Government Data
          </Text>
        </View>
        <View style={styles.div2}>
          <Text style={{fontSize: hp(40), marginRight: hp(5),marginTop: hp(-5)}}>{'\u2022'}</Text>
          <Text style={{...FONTS.body3}}>
            {' '}
           ID / Document Verification
          </Text>
        </View>
        <View style={styles.div2}>
          <Text style={{fontSize: hp(40), marginRight: hp(5),marginTop: hp(-5)}}>{'\u2022'}</Text>
          <Text style={{...FONTS.body3}}>
            {' '}
           Valid Address
          </Text>
        </View>
       </View>
        </ScrollView>
      </View>

      <View style={styles.bottom}>
        {/* <IconTextButton label={type === 1 ? "Save and Continue" : "Complete"} onPress={type === 1 ? () => setType(type + 1) : () => {}} /> */}
        <IconTextButton label={"Begin Process"} onPress={() => handleDojah()} />
      </View>
    </View>
  );
};

export default KycScreen;

const styles = StyleSheet.create({
  div: {
    paddingVertical: hp(70),
  },
  div2: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
    marginTop: hp(20)
  },
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    marginVertical: hp(20),
    alignItems: 'center',
  },
  icons: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  form: {},
});
