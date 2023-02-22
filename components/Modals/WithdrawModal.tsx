import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React from 'react';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {COLORS, FONTS} from '../../utils/constants/theme';
  import {format, hp, wp} from '../../utils/helper';
  import {TextInput} from '../TextInput';
  import {tokenBalanceData} from '../../utils/constants/tokenList';
  import GlobalStyle from '../../utils/globalStyle';
  import {ScrollView} from 'react-native-gesture-handler';


  
  const WithdrawModal = ({modalVisible, setModalVisible}: any) => {
    const assets = () => {
      return tokenBalanceData?.map(info => {
        return (
          <TouchableOpacity>
            <View style={styles.actionCard2}>
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
  
              <Text style={{...FONTS.h2, textAlign: 'left'}}>Withdraw Token</Text>
              <Text
                style={{
                  ...FONTS.body4,
                  textAlign: 'left',
                  color: COLORS.lightGray3,
                }}>
                Select token you want to withdraw
              </Text>
              <View style={styles.search}>
                <TextInput label={'Search Assets'} value={''} searchInput />
              </View>
              <ScrollView>{assets()}</ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default WithdrawModal;
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
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
      backgroundColor: COLORS.primary2,
      padding: 10,
      borderColor: COLORS.primary,
      borderWidth: 1,
      borderRadius: 10,
    },
  });
  