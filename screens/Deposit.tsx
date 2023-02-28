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
import { isNullOrUndefined } from 'util';

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
            <TouchableOpacity onPress={() => handleModalOpen(info)}>
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
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          ...FONTS.body5,
                          fontWeight: 'bold',
                          color: COLORS.lightGray3,
                        }}>{`$${format(data?.current_price.toFixed(2))}`}</Text>
                      <Text
                        style={{
                          ...FONTS.body5,
                          marginLeft: hp(4),
                          color:
                            data?.price_change_percentage_24h === 0
                              ? COLORS.lightGray
                              : data?.price_change_percentage_24h > 0
                              ? COLORS.darkGreen
                              : COLORS.red,
                        }}>{`${
                        data?.price_change_24h.toFixed(2) +
                        ' ' +
                        `(${data?.price_change_percentage_24h.toFixed(2)})%`
                      }`}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                  <AntDesign name="right" />
                </View>
              </View>
            </TouchableOpacity>
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.end}>
                <AntDesign name="arrowleft" size={30} />
              </View>
            </TouchableOpacity>

            <Text style={{...FONTS.h2, textAlign: 'left'}}>Deposit Token</Text>
            <Text
              style={{
                ...FONTS.body4,
                textAlign: 'left',
                color: COLORS.lightGray3,
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
