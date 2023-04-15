
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FONTS } from '../../utils/constants/theme';
import MainLayout from '../mainLayout';
import { hp } from '../../utils/helper';
import HeaderComponent from '../../components/HeaderComponent';
import GlobalStyle from '../../utils/globalStyle';
import SecurityIcon from '../../assets/svg/security-safe.svg';
import PassswordIcon from '../../assets/svg/password-check.svg';
// import BioMetricIcon from '../../assets/svg/finger-scan.svg';
import ListCardItem from '../../components/ListCardItem';
import { useAppSelector } from '../../app/hooks';
import { userState } from '../../slice/AuthSlice';
import { modeStatus } from '../../slice/TradeSlice';

export default function Security({navigation}: any) {
  const userStateInfo = useAppSelector(userState);
  const modeInfo = useAppSelector(modeStatus);
  const getUserInfo = userStateInfo?.userData
    ? userStateInfo?.userData
    : userStateInfo;


  const styles = StyleSheet.create({
    textStyle: {
      marginVertical: hp(15),
      color: '#4F4F4F',
      lineHeight: 20,
    },
  });

  const RouteInfo = [
    {
      id: 2,
      name: 'Change Transaction Pin',
      icon: <SecurityIcon width={25} height={25} />,
      route: 'ChangePin',
      isVerify: false
    },
    {
      id: 3,
      name: 'Change Password',
      icon: <PassswordIcon width={25} height={25} />,
      route: 'ChangePassword',
      isVerify: false,
    },
    {
      id: 4,
      name: 'Verfify Phone Number',
      icon: <PassswordIcon width={25} height={25} />,
      route: 'VerifyPhone',
      isVerify: getUserInfo?.hasVerifiedPhoneNumber ? true : false
    },
    // {
    //   id: 5,
    //   name: 'Allow Biometrics',
    //   icon: <BioMetricIcon width={25} height={25} />,
    //   route: 'NotificationScreen',
    // },
  ];
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={[GlobalStyle.container,{backgroundColor: modeInfo ? "white" : "#1a202c"}]}>
      <MainLayout>
        <ScrollView>
          <HeaderComponent onPress={() => navigation.goBack()} />
          <Text style={{...FONTS.h2}}>Security</Text>
          <Text style={styles.textStyle}>Protect all delecate informations on this application to prevents intruder</Text>
          <View>
          {
            RouteInfo?.filter(a => !a?.isVerify)?.map((data, i) => {
              return <ListCardItem onToggleSwitch={onToggleSwitch} isSwitchOn={isSwitchOn} icon={data?.icon} key={i} id={i} data={data} handlePress={() => navigation.navigate(data?.route)} logOut={(() => null)} />;
            })
          }
        </View>
        </ScrollView>
      </MainLayout>
    </View>
  );
}
