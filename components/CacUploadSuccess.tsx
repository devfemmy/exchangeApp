import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import { COLORS, FONTS } from '../utils/constants/theme';
import { hp } from '../utils/helper';
import IconTextButton from './IconTextButton';

const CacUploadSuccess = ({navigation}: any) => {
  return (
    <View style={[GlobalStyle.container, {flex: 1}]}>
      <View style={styles.div}>
        <Text style={{...FONTS.h2, textAlign: 'center', color: COLORS.darkGreen, fontWeight: 'bold'}}>Your CAC Document has been uploaded</Text>
        <Text style={{...FONTS.body4, textAlign: 'center', color: COLORS.gray, marginVertical: hp(30)}}>Your CAC Document uploaded and verified, you now have access to Zend USD</Text>
      </View> 
     <View style={styles.div2}>
     <IconTextButton label="Continue" onPress={() => navigation.navigate("ZendUsdForm")} />
     </View>
    </View>
  );
};

export default CacUploadSuccess;

const styles = StyleSheet.create({
  div: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 3
  },
  div2: {
    flex: 1
  },
});
