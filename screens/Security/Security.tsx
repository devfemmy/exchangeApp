
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FONTS } from '../../utils/constants/theme';
import MainLayout from '../mainLayout';
import { hp } from '../../utils/helper';
import HeaderComponent from '../../components/HeaderComponent';
import GlobalStyle from '../../utils/globalStyle';
import SecurityIcon from '../../assets/svg/security-safe.svg';
import PassswordIcon from '../../assets/svg/password-check.svg';
import BioMetricIcon from '../../assets/svg/finger-scan.svg';
import ListCardItem from '../../components/ListCardItem';

export default function Security({navigation}: any) {
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
    },
    {
      id: 3,
      name: 'Change Password',
      icon: <PassswordIcon width={25} height={25} />,
      route: 'ChangePassword',
    },
    {
      id: 4,
      name: 'Verfify Phone Number',
      icon: <PassswordIcon width={25} height={25} />,
      route: 'VerifyPhone',
    },
    {
      id: 5,
      name: 'Allow Biometrics',
      icon: <BioMetricIcon width={25} height={25} />,
      route: 'NotificationScreen',
    },
  ];
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={[GlobalStyle.container]}>
      <MainLayout>
        <ScrollView>
          <HeaderComponent onPress={() => navigation.goBack()} />
          <Text style={{...FONTS.h2}}>Security</Text>
          <Text style={styles.textStyle}>Protect all delecate informations on this application to prevents intruder</Text>
          <View>
          {
            RouteInfo?.map((data, i) => {
              return <ListCardItem onToggleSwitch={onToggleSwitch} isSwitchOn={isSwitchOn} icon={data?.icon} key={i} id={i} data={data} handlePress={() => navigation.navigate(data?.route)} logOut={(() => null)} />;
            })
          }
        </View>
        </ScrollView>
      </MainLayout>
    </View>
  );
}
