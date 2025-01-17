import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import GlobalStyle from '../utils/globalStyle'
import { COLORS } from '../utils/constants/theme'
import { hp } from '../utils/helper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector } from '../app/hooks'
import { modeStatus } from '../slice/TradeSlice'
import { TouchableOpacity } from 'react-native-gesture-handler';

const SwapHeader = ({header, handlePress}: any) => {
    const navigation = useNavigation() as any
    const modeInfo = useAppSelector(modeStatus);

    
  return (
    <View style={[GlobalStyle.rowBetween, {marginBottom: hp(20)}]}>
          <TouchableOpacity  style={styles.backPress}  onPress={() => navigation.goBack()}>
          <AntDesign
                name="arrowleft"
                size={hp(20)}
                color={modeInfo ? COLORS.black : COLORS.white}
                onPress={() => navigation.goBack()}
              />
          </TouchableOpacity>
              <TouchableOpacity style={styles.swapHistory} onPress={() => handlePress()}>
                <View style={styles.swap}>
                  <Text style={{marginRight: hp(5), color:modeInfo ? COLORS.black : COLORS.white}}>{header}</Text>
                  <MaterialIcons name="history" size={20} color={modeInfo ? COLORS.black : COLORS.white} />
                </View>
              </TouchableOpacity>
            </View>
  );
};

export default SwapHeader;

const styles = StyleSheet.create({
    swap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        paddingHorizontal: hp(10),
        paddingVertical: hp(5),
      },
      swapHistory: {
      },
      backPress: {
        width: hp(100),
        height: hp(30)
      }
});
