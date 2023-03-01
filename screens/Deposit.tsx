/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../utils/constants/theme';
import {format, hp, wp} from '../utils/helper';
import {TextInput} from '../components/TextInput';
import {tokenBalanceData} from '../utils/constants/tokenList';
import GlobalStyle from '../utils/globalStyle';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {getMarketPrice, marketInfo} from '../slice/TradeSlice';
import DepositModal from '../components/Modals/DepositModal';
import { getWalletNetwork } from '../slice/WalletSlice';
import AssetsComponent from '../components/AssetsComponent';
import HeaderComponent from '../components/HeaderComponent';


const Deposit = ({navigation}: any) => {
  const [value, setValue] = useState('');
  const marketInfos = useAppSelector(marketInfo) as any;
  const [openModal, setOpenModal] = useState(false)
  const [networks, setNetworks] = useState<any>()
  const dispatch = useAppDispatch()
  const [otherInfo, setOtherInfo] = useState<any>()


  const searchToken = !value
    ? tokenBalanceData
    : tokenBalanceData?.filter(
        (data: any) =>
          data?.currency?.toLowerCase().includes(value?.toLowerCase()) ||
          data?.token?.toLowerCase().includes(value?.toLowerCase()),
      );

      const handleModalClose = () => {
        setOpenModal(false)
        setNetworks(null)
      }

      const handleModalOpen = (data: any) => {
        setOpenModal(true)
        dispatch(getWalletNetwork(data?.currency)).then(pp => setNetworks(pp?.payload?.[data?.currency?.toUpperCase()]))
        setOtherInfo(data)
      }



  const assets = () => {
    return marketInfos?.map((data: any) => {
      return searchToken?.map((info: any) => {
        return (
          info?.currency === data?.symbol && (
            <AssetsComponent info={info} data={data} handleClick={(info: any, data: any) => handleModalOpen(info)} />
          )
        );
      });
    });
  };

  return (
    <View style={GlobalStyle.container}>
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <HeaderComponent onPress={() => navigation.goBack()} />

            <Text style={{...FONTS.h2, fontWeight: 'bold', textAlign: 'left'}}>Deposit</Text>
            <Text
              style={{
                ...FONTS.body4,
                textAlign: 'left',
                color: COLORS.gray,
              }}>
              Select token you want to deposit
            </Text>
            <View style={styles.search}>
              <TextInput
                label={'Search Assets'}
                value={value}
                onChangeText={(value: any) => setValue(value)}
                searchInput
              />
            </View>
            <ScrollView>{assets()}</ScrollView>

            <DepositModal 
                  modalVisible={openModal}
                  setModalVisible={() => handleModalClose()}
                  networks={networks}
                  otherInfo={otherInfo}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 10,
    height: hp(650),
  },
  end: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: hp(20),
  },
  search: {
    marginVertical: hp(15),
  },
  icons: {
    width: wp(30),
    height: hp(30),
  },
  actionCard2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(10),
    paddingBottom: hp(10),
    padding: 10,
    borderRadius: 10,
    borderBottomColor: COLORS.lightGray3,
    borderBottomWidth: 1,
  },
});
