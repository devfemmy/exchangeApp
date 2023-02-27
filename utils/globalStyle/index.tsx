import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
import { hp, wp } from "../helper";


const GlobalStyle = StyleSheet.create({
    container: {
        paddingTop: hp(50),
        paddingHorizontal: hp(10),
        flex: 1,
        backgroundColor: COLORS.white
    },
    wrapper: {
        flex: 1,
        backgroundColor: COLORS.primary,
      },
      rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      rowBetweenNoCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      rowAround: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      rowStart: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      profileCircle: {
        backgroundColor: COLORS.primary2,
        height: hp(70),
        width: hp(70),
        borderRadius: hp(35),
        justifyContent: 'center',
        alignItems: 'center',
      },
      profileCircle2: {
        backgroundColor: COLORS.primary2,
        height: hp(90),
        width: hp(90),
        borderRadius: hp(45),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        borderWidth: 0.228,
        borderColor: '#808080',
      },
      level: {
        width: wp(80),
        height: hp(32),
        borderRadius: 8,
        backgroundColor: COLORS.primary2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
      },
});

export default GlobalStyle;
