/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { Dimensions, Platform } from "react-native";
import { hp } from "../helper";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary: "#485FE6",
    primary2: "#E2E6FD",
    ldPrimary: "#FAFBFF",
    lightPrimary: "rgba(72, 95, 230, 0.29)",
    secondary: "#219653",
    white: "#fff",
    lightGreen: "#DEF8E9",
    successGreen: "rgb(33, 150, 83)",
    warning: 'rgb(247, 147, 26)',
    darkGreen: "#44eb8b",
    lightDark: "#2D3748",
    orange: "#F09242",
    lightOrange: "rgb(255, 241, 204)",
    red: "#FF0000",
    black: "#232323",
    lightBlack: "#333333",
    grayBlack: "#4F4F4F",
    gray: "#828282",
    gray1: "#5B5959",
    gray2: "#808080",
    lightGray: "#3B3B3B",
    lightGray2: '#F8F8F8',
    lightGray3: 'rgba(128, 128, 128, 0.6)',
    transparentWhite: 'rgba(255, 255, 255, 0.2)',
    transparentBlack: 'rgba(0, 0, 0, 0.8)',
    transparentBlack1: 'rgba(0, 0, 0, 0.4)',
    darkMode: "#1a202c"
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: hp(40),
    h1: hp(30),
    h2: hp(24),
    h3: hp(16),
    h4: hp(14),
    h5: hp(12),
    body1: hp(30),
    body2: hp(22),
    body3: hp(16),
    body4: hp(14),
    body5: hp(12),

    // app dimensions
    width,
    height
};
export const FONTS = {
    largeTitle: { fontFamily: "Poppins-ExtraBold", fontSize: SIZES.largeTitle, color: COLORS.black },
    h1: { fontFamily: "Poppins-Medium", fontWeight: Platform.OS === "android" ? 700 : "600", fontSize: SIZES.h1, lineHeight: 36, color: COLORS.black },
    h2: { fontFamily: "Poppins-Medium", fontWeight: Platform.OS === "android" ? 700 : "600", fontSize: SIZES.h2, lineHeight: 30, color: COLORS.black },
    h3: { fontFamily: "Poppins-Medium", fontWeight: Platform.OS === "android" ? 700 : "600", fontSize: SIZES.h3, lineHeight: 22, color: COLORS.black },
    h4: { fontFamily: "Poppins-Medium", fontWeight: Platform.OS === "android" ? 700 : "600", fontSize: SIZES.h4, lineHeight: 22, color: COLORS.black },
    h5: { fontFamily: "Poppins-Medium", fontWeight: Platform.OS === "android" ? 700 : "600", fontSize: SIZES.h5, lineHeight: 22, color: COLORS.black },
    body1: { fontFamily: "Poppins-Regular", fontSize: SIZES.body1, lineHeight: 36, color: COLORS.black },
    body2: { fontFamily: "Poppins-Regular", fontSize: SIZES.body2, lineHeight: 30, color: COLORS.black },
    body3: { fontFamily: "Poppins-Regular", fontSize: SIZES.body3, lineHeight: 22, color: COLORS.black },
    body4: { fontFamily: "Poppins-Regular", fontSize: SIZES.body4, lineHeight: 22, color: COLORS.black },
    body5: { fontFamily: "Poppins-Regular", fontSize: SIZES.body5, lineHeight: 22, color: COLORS.black },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
