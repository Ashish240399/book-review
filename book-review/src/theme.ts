"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
// import { colors } from "./constants/Color";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    // primary: {
    //   main: colors.red,
    // },
  },
});

export default theme;
