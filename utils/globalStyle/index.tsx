import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
import { hp } from "../helper";


const GlobalStyle = StyleSheet.create({
    container: {
        paddingVertical: hp(50),
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
      }
})

export default GlobalStyle