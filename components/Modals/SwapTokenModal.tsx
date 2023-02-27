import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, { useState } from 'react';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {COLORS, FONTS} from '../../utils/constants/theme';
  import {format, hp, wp} from '../../utils/helper';
  import {TextInput} from '../TextInput';
  import {tokenBalanceData} from '../../utils/constants/tokenList';
  import GlobalStyle from '../../utils/globalStyle';
  import {ScrollView} from 'react-native-gesture-handler';
  
  const SwapTokenModal = ({modalVisible, setModalVisible, selectedToken, setSelectedToken}: any) => {
    const [value, setValue] = useState("")


    const searchToken = tokenBalanceData?.filter(data => data?.currency?.toLowerCase().includes(value?.toLowerCase()) || data?.token?.toLowerCase().includes(value?.toLowerCase()))

  
    const selectType = (data: any) => {
        setSelectedToken(data)
    }

    const assets = () => {
      return searchToken?.map(info => {
        return (
          <TouchableOpacity onPress={ selectedToken?.toLowerCase() === info?.currency?.toLowerCase() ? () => {} : () => selectType(info)}>
            <View style={[styles.actionCard2, {backgroundColor: selectedToken?.toLowerCase() === info?.currency?.toLowerCase() ? COLORS.lightGray2 : COLORS.white}]}>
              <View style={GlobalStyle.rowStart}>
                <Image
                  source={info?.icon}
                  resizeMode="cover"
                  style={styles.icons}
                />
                <View style={{marginLeft: hp(10)}}>
                  <Text style={{...FONTS.body3, fontWeight: 'bold'}}>
                    {info?.token}
                  </Text>
                  <Text style={{...FONTS.body5, textTransform: 'uppercase'}}>
                    {info?.currency}
                  </Text>
                </View>
              </View>
              <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{`$${format(
                  0,
                )}`}</Text>
                <Text style={{...FONTS.body5}}>0</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    };
  
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setModalVisible()}>
                <View style={styles.end}>
                  <AntDesign name="close" size={30} />
                </View>
              </TouchableOpacity>
  
              <Text style={{...FONTS.h2, textAlign: 'center'}}>Select Token</Text>
              <View style={styles.search}>
                <TextInput label={'Search Assets'} value={value} onChangeText={(value) => setValue(value)} searchInput />
              </View>
              <ScrollView>{assets()}</ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default SwapTokenModal;
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
      backgroundColor: "transparent"
    },
    modalView: {
      margin: 20,
      height: hp(500),
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
    end: {
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    search: {
      marginVertical: hp(15),
    },
    icons: {
      width: wp(20),
      height: hp(20),
    },
    actionCard2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp(10),
      paddingBottom: hp(10),
      padding: 10,
      borderRadius: 10,
    },
  });