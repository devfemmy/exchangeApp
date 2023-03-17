import { View, Text , StyleSheet, Modal, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../utils/constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { success } from '../../assets/images';
import { hp } from '../../utils/helper';

const SuccessModal = ({visible, handleVisible}: any) => {
  return (
    <View>
    <View style={styles.centeredView}>
     <Modal
       animationType="slide"
       transparent={true}
       visible={visible}
       onDismiss={() => {
        handleVisible(false);
       }}
       onRequestClose={() => {
         handleVisible(false);
       }}>
       <View style={styles.centeredView}>
       <View style={styles.modalView}>
           <TouchableOpacity onPress={() => handleVisible(false)}>
             <View style={styles.end}>
               <AntDesign name="close" size={30} />
             </View>
           </TouchableOpacity>

           <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={success} style={{width: 100, height: 100, marginVertical: hp(20)}} />
            <Text style={{...FONTS.h2, textAlign: 'center', color: COLORS.darkGreen}}>Success</Text>
           </View>

         </View>
       </View>
       
     </Modal>
   </View>
  </View>
  )
}

export default SuccessModal


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.transparentBlack
      },
      end: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      },
      modalView: {
        margin: 20,
        // height: hp(600),
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
})