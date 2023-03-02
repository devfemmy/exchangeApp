import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import GlobalStyle from '../utils/globalStyle';
import SwapHeader from '../components/SwapHeader';
import {COLORS, FONTS} from '../utils/constants/theme';
import {hp, wp} from '../utils/helper';
import {tether} from '../assets/images';
import {SelectInput} from '../components/SelectInput';
import {TextInput} from '../components/TextInput';
import IconTextButton from '../components/IconTextButton';
import InvoiceUploadModal from '../components/Modals/InvoiceUploadModal';

const ZendUsdForm = ({navigation}: any) => {
  const [type, setType] = useState<any>(1);
  const [openModal, setOpenModal] = useState(false)

  const handleOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const sectionOne = () => {
    return (
      <View>
        <View style={[GlobalStyle.rowBetween, {marginVertical: hp(20)}]}>
          <View style={GlobalStyle.rowStart}>
            <Image source={tether} style={styles.icons} />
            <Text
              style={{
                ...FONTS.body4,
                fontWeight: 'bold',
                color: COLORS.grayBlack,
              }}>
              Tether
            </Text>
          </View>
          <View style={GlobalStyle.rowStart}>
            <Text style={{...FONTS.body4, color: COLORS.gray}}>Balance: </Text>
            <Text style={{...FONTS.body4, fontWeight: 'bold'}}>10000 USDT</Text>
          </View>
        </View>

        <View style={styles.form}>
          <SelectInput
            items={['Nigeria', 'Togo', 'Ghana', 'Usa', 'Uk']}
            setState={(value: any) => console.log(value)}
            value=""
            placeholder="Select Country"
            errorMsg={undefined}
          />
          <TextInput label={'Enter amount you want to send'} />
        </View>

        <View style={styles.card}>
          <View style={[GlobalStyle.rowBetween, {paddingVertical: hp(10)}]}>
            <Text style={{...FONTS.body5, color: COLORS.gray}}>Charges</Text>
            <Text style={{...FONTS.body5, color: COLORS.gray}}>$0</Text>
          </View>
          <View style={styles.hr} />
          <View style={[GlobalStyle.rowBetween, {paddingVertical: hp(10)}]}>
            <Text style={{...FONTS.body5, color: COLORS.gray}}>
              Recipents will receive
            </Text>
            <Text style={{...FONTS.body5, color: COLORS.gray}}>$0</Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <Text
            style={{
              ...FONTS.body4,
              textAlign: 'center',
              marginVertical: hp(20),
            }}>
            Transfer may take up to 48hrs
          </Text>
          <IconTextButton
            label="Save and Continue"
            onPress={() => setType(type + 1)}
          />
        </View>
      </View>
    );
  };

  const sectionTwo = () => {
    return (
      <View>

        <View style={styles.form}>
        <TextInput label={'Enter Beneficial Name'} />
        <TextInput label={'Enter Beneficial Address'} />
        <TextInput label={'Enter Bank Name'} />
        <TextInput label={'Enter Bank Account'} />
        <TextInput label={'Enter Swift Code'} />
        </View>



        <View style={styles.bottom2}>
          <Text
            style={{
              ...FONTS.body4,
              textAlign: 'center',
              marginVertical: hp(20),
            }}>
            Transfer may take up to 48hrs
          </Text>
          <IconTextButton
            label="Proceed"
            onPress={() => handleOpen()}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={GlobalStyle.container}>
        <SwapHeader
          header="Zend History"
          handlePress={() => navigation.navigate('ZendUsdHistory')}
        />
        <View style={GlobalStyle.rowBetween}>
          <View>
            <Text
              style={{...FONTS.h3, fontWeight: 'bold', marginBottom: hp(10)}}>
              Zend USD
            </Text>
            <Text style={{...FONTS.body5, color: COLORS.gray}}>
              Kindly provide the necessary details
            </Text>
          </View>
          <View style={GlobalStyle.rowStart}>
            <Text style={{...FONTS.body4, color: COLORS.gray}}>Rate </Text>
            <Text style={{...FONTS.body4, color: COLORS.primary}}>1.00</Text>
          </View>
        </View>

        {type === 1 && sectionOne()}

        {type === 2 && sectionTwo()}
      </View>
      <InvoiceUploadModal modalVisible={openModal} setModalVisible={() => handleClose()} />
    </ScrollView>
  );
};

export default ZendUsdForm;

const styles = StyleSheet.create({
  icons: {
    width: wp(30),
    height: hp(30),
    marginRight: hp(10),
  },
  form: {
    marginTop: hp(30),
  },
  card: {
    backgroundColor: COLORS.primary2,
    borderRadius: 10,
    padding: hp(15),
  },
  hr: {
    width: '100%',
    backgroundColor: COLORS.primary,
    height: hp(1),
  },
  bottom: {
    height: hp(200),
    justifyContent: 'flex-end',
  },
  bottom2: {
    // height: hp(200),
    justifyContent: 'flex-end',
  },
});
