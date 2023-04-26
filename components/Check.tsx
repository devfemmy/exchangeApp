import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import AIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';

const Check = (handlePress: any, isChecked: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        {isChecked ? (
          <AIcon name="checksquare" size={20} color="#30898B" />
        ) : (
          <Icon name="square" size={20} color="#30898B" />
        )}

        {/* { props.isChecked ? <Icon name="square" size={20} color="green" /> : <AIcon name="checksquare" size={20} color="green" /> }   */}
      </TouchableOpacity>
    </View>
  );
};

export default Check;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // position:'absolute',
    marginLeft: 17,
    // marginTop: -10,
    zIndex: 900,
  },
  title: {
    fontSize: 18,
    color: '#5f9a32',
    marginLeft: 5,
    fontWeight: '500',
    lineHeight: 28,
    letterSpacing: 0.2,
  },
});
