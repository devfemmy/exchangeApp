import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/globalStyle';
import { hp, wp } from '../utils/helper';
import { COLORS } from '../utils/constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Pagination = ({data, handlePagination}: any) => {
  const styles = StyleSheet.create({
    pagination: {
      backgroundColor: data?.page === 1 ? '#cccc' : COLORS.primary2,
      borderRadius: hp(5),
      minHeight: hp(35),
      justifyContent: 'center',
      paddingHorizontal: hp(10),
      alignItems: 'center',
      flexDirection: 'row',
      width: wp(100),
    },
    textStyle: {
      color: data?.page === 1 ? '#666666' : COLORS.primary,

    },
    pagination2: {
      backgroundColor: data?.page === data?.nextPage ? '#cccc' : COLORS.primary2,
      borderRadius: hp(5),
      minHeight: hp(35),
      justifyContent: 'center',
      paddingHorizontal: hp(10),
      alignItems: 'center',
      flexDirection: 'row',
      width: wp(100),
    },
    textStyle2: {
      color: data?.page === data?.nextPage ? '#666666' : COLORS.primary,

    },
    container: {
      
    }
  });
  return (
    <View style={styles.container}>
    <View style={[GlobalStyle.rowBetween, {paddingBottom: hp(10)}]}>
        <TouchableOpacity disabled={data?.page === 1} style={styles.pagination} onPress={() => handlePagination('prev')}>
          {data?.page === 1 ? null : <AntDesign  name="stepbackward" size={18} color={data?.page === 1 ? '#66666' : COLORS.primary} />}
         <Text style={styles.textStyle}>Previous</Text>
        </TouchableOpacity>
        <View style={{width: wp(20)}} />
         <TouchableOpacity disabled={data?.page === data?.nextPage} style={styles.pagination2} onPress={() => handlePagination('next')}>
         <Text style={styles.textStyle2}>Next</Text>
         <AntDesign  name="stepforward" size={18} color={COLORS.primary} />
        </TouchableOpacity>
     </View>
    </View>
  );
};

export default Pagination;
