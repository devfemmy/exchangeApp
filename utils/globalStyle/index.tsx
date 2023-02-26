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
      level: {
        minWidth: wp(80),
        height: hp(32),
        borderRadius: 8,
        backgroundColor: COLORS.primary2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
      },
});

export default GlobalStyle;
