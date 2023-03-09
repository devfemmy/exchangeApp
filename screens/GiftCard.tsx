import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {hp} from '../utils/helper';
import {COLORS, FONTS} from '../utils/constants/theme';
import {SelectInput} from '../components/SelectInput';
import {TextInput} from '../components/TextInput';
import UploadCard from '../components/UploadCard';
import IconTextButton from '../components/IconTextButton';

const GiftCard = ({navigation}: any) => {
  return (
    <View style={GlobalStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={GlobalStyle.rowBetween}>
            <AntDesign
              name="arrowleft"
              size={hp(25)}
              onPress={() => navigation?.goBack()}
            />
            <Text style={{...FONTS.h3, fontWeight: 'bold'}}>
              Convert Gift card
            </Text>
            <View />
          </View>
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.lightBlack,
              marginVertical: hp(20),
              fontWeight: 'bold',
            }}>
            Select your gift card type
          </Text>

          <View>
            <SelectInput
              placeholder="Select Gift Card"
              items={['America Express', 'Walmat Visa Giftcard']}
            />
            <TextInput label="Card Code" />
            <TextInput label="Amount" />
            <View style={GlobalStyle.rowBetween}>
              <View style={{width: '47%'}}>
                <TextInput label="CVV" />
              </View>
              <View style={{width: '47%'}}>
                <TextInput label="Expire Date" />
              </View>
            </View>

            <View style={styles.gift}>
              <Text
                style={{
                  ...FONTS.body5,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                }}>
                Upload the back view of the gift card
              </Text>
              <Text style={{...FONTS.body5, color: COLORS.gray}}>
                Support file type, JPEG, PNG, Max file size 2mb
              </Text>
            </View>

            <UploadCard header="Upload Receipt" />
            <View style={{marginTop: hp(-20)}}>
                 <IconTextButton label="Proceed" />
            </View>
           
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GiftCard;

const styles = StyleSheet.create({
  gift: {
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 10,
    padding: hp(20),
    backgroundColor: COLORS.primary2,
  },
});