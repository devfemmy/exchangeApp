import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import React, { useState } from 'react';
import GlobalStyle from '../utils/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../utils/constants/theme';
import {hp, wp} from '../utils/helper';
import {useAppSelector} from '../app/hooks';
import {userState} from '../slice/AuthSlice';
import {SelectInput} from '../components/SelectInput';
import {TextInput} from '../components/TextInput';
import IconTextButton from '../components/IconTextButton';
import UploadCard from '../components/UploadCard';


const KycScreen = ({navigation}: any) => {
  const [type, setType] = useState(1)
  const userStateInfo = useAppSelector(userState);
  const getUserInfo = userStateInfo?.userData
    ? userStateInfo?.userData
    : userStateInfo;


    const sectionOne = () => {
        return (
            <View>
                 <View style={styles.container}>
            <View style={GlobalStyle.profileCircle2}>
              <Image source={{uri: getUserInfo?.image}} style={styles.icons} />
            </View>
            <View
              style={{
                backgroundColor: COLORS.primary2,
                padding: hp(10),
                borderRadius: 10,
              }}>
              <Text style={{...FONTS.body4, color: COLORS.primary}}>
                Upload a Selfie
              </Text>
            </View>
          </View>

          <View style={styles.form}>
            <SelectInput placeholder="Date of Birth" />
            <SelectInput placeholder="Nationality" />
            <TextInput label="State" />
            <TextInput label="Street Name" />
            <SelectInput placeholder="Gender" />
            <SelectInput placeholder="Marital Status" />
          </View>
            </View>
        )
    }

    const sectionTwo = () => {
        return (
            <View>

          <View style={styles.form}>
          <TextInput label="Name Next of Kin" />
            <SelectInput placeholder="Next of Kin Relationship" />
            <TextInput label="Next of kin Address" />
            <SelectInput placeholder="Verification Type ID" />
            <TextInput label="Verification Number" />
            <UploadCard header="Upload scanned ID" />
          </View>
            </View>
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
          <Text style={{...FONTS.body5, color: COLORS.gray, width: wp(250)}}>
            Complete your kyc process to increase your transaction limit
          </Text>

          <View style={[GlobalStyle.rowStart, {marginVertical: hp(15)}]}>
            <View style={{width: type === 1 ? "50%" : "100%", borderBottomWidth: 1,paddingBottom: hp(10), borderBottomColor: COLORS.primary}}>
                <Text style={{...FONTS.body5}}>{type === 1 ? "1/2" : "2/2"}</Text>
            </View>
          </View>

         {
            type === 1 && sectionOne()
         }
         {
            type === 2 && sectionTwo()
         }
        </ScrollView>
      </View>

      <View style={styles.bottom}>
        <IconTextButton label={type === 1 ? "Save and Continue" : "Complete"} onPress={type === 1 ? () => setType(type + 1) : () => {}} />
      </View>
    </View>
  );
};

export default KycScreen;

const styles = StyleSheet.create({
  div: {
    paddingVertical: hp(70),
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
