import React from "react";
import { BlueAndWhitePdf } from "./BlueAndWhite";
import { WhiteAndBluePdf } from "./WhiteAndBlue";
import { OceanThemePdf } from "./OceanTheme";
import { BlackAndWhitePdf } from "./BlackAndWhite";
import { Document, Font, Page, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Times New Roman",
  fonts: [
    { src: "/fonts/times-new-roman.ttf" },
    // { src: "/fonts/times-new-roman-italic.ttf", fontStyle: "italic" },
    {
      src: "/fonts/times-new-roman-700.ttf",
      fontWeight: 700,
    },
    {
      src: "/fonts/times-new-roman-400.ttf",
      fontWeight: 400,
    },
  ],
});

Font.register({
  family: "Arial",
  fonts: [
    { src: "/fonts/ARIAL.ttf" },
    // { src: "/fonts/ARIALBI.ttf", fontStyle: "italic" },
    {
      src: "/fonts/ARIALBD.ttf",
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "Verdana",
  fonts: [
    { src: "/fonts/Verdana.ttf" },
    { src: "/fonts/Verdana.ttf", fontWeight: 500 },
    {
      src: "/fonts/Verdana-Bold.ttf",
      fontWeight: 700,
    },
    {
      src: "/fonts/Verdana.ttf",
      fontWeight: 400,
    },
  ],
});
Font.register({
  family: "Courier New",
  fonts: [
    { src: "/fonts/Courier-New-Regular.ttf" },
    // { src: "/fonts/Courier-New-Italic.ttf", fontStyle: "italic" },
    {
      src: "/fonts/Courier-New-Bold.ttf",
      fontWeight: 700,
    },
  ],
});
Font.register({
  family: "Georgia",
  fonts: [
    { src: "/fonts/georgia.ttf" },
    // { src: "/fonts/georgiai.ttf", fontStyle: "italic" },
    {
      src: "/fonts/georgiab.ttf",
      fontWeight: 700,
    },
  ],
});
Font.register({
  family: "Trebuchet MS",
  fonts: [
    { src: "/fonts/trebuc.ttf" },
    // { src: "/fonts/Trebuchet-MS-Italic.ttf", fontStyle: "italic" },
  ],
});
Font.register({
  family: "Comic Sans MS",
  fonts: [
    { src: "/fonts/ComicSansMS3.ttf" },
    // { src: "/fonts/comici.ttf", fontStyle: "italic" },
    {
      src: "/fonts/comicz.ttf",
      fontWeight: 700,
    },
  ],
});
Font.register({
  family: "Tahoma",
  fonts: [
    { src: "/fonts/TAHOMA_0.ttf" },
    {
      src: "/fonts/TAHOMAB0.ttf",
      fontWeight: 700,
    },
    // { src: "/fonts/TAHOMA_0.ttf", fontStyle: "italic" },
  ],
});

Font.register({
  family: "Alex Brush",
  fonts: [
    { src: "/fonts/AlexBrush-Regular.ttf" },
    {
      src: "/fonts/AlexBrush-Regular.ttf",
      fontWeight: 700,
    },
    // { src: "/fonts/AlexBrush-Regular.ttf", fontStyle: "italic" },
  ],
});
Font.register({
  family: "Arima",
  fonts: [
    { src: "/fonts/ArimaMadurai-400.ttf" },
    { src: "/fonts/ArimaMadurai-500.ttf", fontWeight: 500 },
    { src: "/fonts/ArimaMadurai-600.ttf", fontWeight: 600 },
    { src: "/fonts/ArimaMadurai-700.ttf", fontWeight: 700 },
    // { src: "/fonts/ArimaMadurai-400.ttf", fontStyle: "italic" },
  ],
});
Font.register({
  family: "Anton SC",
  fonts: [
    { src: "/fonts/AntonSC-Regular.ttf" },
    {
      src: "/fonts/AntonSC-Regular.ttf",
      fontWeight: 700,
    },
    // { src: "/fonts/AntonSC-Regular.ttf", fontStyle: "italic" },
  ],
});
Font.register({
  family: "Zain",
  fonts: [{ src: "/fonts/Zain-Regular.ttf" }],
});

function ThemePdf({
  resumeData,
  sectionsVisibility,
  fullNameColor,
  fontFamily,
  selectedTheme,
  language,
}) {
  const styles = StyleSheet.create({
    flexRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    flexCol: {
      display: "flex",
      flexDirection: "column",
    },
    textCenter: {
      textAlign: "center",
    },
    title: {
      fontWeight: 700,
      textTransform: "uppercase",
      fontSize: "14px",
      width: "100%",
      paddingBottom: "4px",
      borderBottom: "2px solid rgb(160, 159, 159)",
      color: `${fullNameColor}`,
    },
    text: {
      fontWeight: 500,
      fontSize: "11px",
      color: "#000",
    },
    blueAndWhiteText: {
      fontSize: "10px",
      color: "#fff",
      fontWeight: "400",
      whiteSpace: "normal",
      wordBreak: "break-word",
      fontFamily: `${fontFamily}`,
    },
    blueAndWhiteTitle: {
      borderBottom: "2px solid #000",
      marginBottom: "8px",
      fontWeight: 700,
      textTransform: "uppercase",
      fontSize: "14px",
      width: "100%",
      paddingBottom: "4px",
      color: `${fullNameColor}`,
    },
    whiteAndBlueText: {
      fontSize: "10px",
      color: "#000",
      fontWeight: "400",
      whiteSpace: "normal",
      wordBreak: "break-word",
    },
    whiteAndBlueTitle: {
      borderBottom: "2px solid #0000FF",
      marginBottom: "8px",
      fontWeight: 700,
      textTransform: "uppercase",
      fontSize: "14px",
      width: "100%",
      paddingBottom: "4px",
      color: "#0000FF",
    },
    oceanText: {
      fontSize: "10px",
      color: "#000",
      fontWeight: "400",
      whiteSpace: "normal",
      wordBreak: "break-word",
    },
    oceanTitle: {
      fontWeight: 700,
      textTransform: "uppercase",
      fontSize: "14px",
      width: "100%",
      color: "#fff",
      marginBottom: "8px",
      marginTop: "10px",
      paddingBottom: "4px",
      borderBottom: "2px solid #000",
    },
    secondPage: {
      minHeight: "100vh",
      height: "auto",
    },
    rtl: {
      direction: "rtl",
      textAlign: "right",
    },
  });

  return (
    <Document>
      <Page
        style={{
          fontFamily: fontFamily,
        }}
      >
        {selectedTheme === "BlueAndWhite" ? (
          <BlueAndWhitePdf
            resumeData={resumeData}
            sectionsVisibility={sectionsVisibility}
            fullNameColor={fullNameColor}
            styles={styles}
            language={language}
          />
        ) : selectedTheme === "OceanTheme" ? (
          <OceanThemePdf
            resumeData={resumeData}
            sectionsVisibility={sectionsVisibility}
            fullNameColor={fullNameColor}
            styles={styles}
            language={language}
          />
        ) : selectedTheme === "WhiteAndBlue" ? (
          <WhiteAndBluePdf
            resumeData={resumeData}
            sectionsVisibility={sectionsVisibility}
            fullNameColor={fullNameColor}
            styles={styles}
            language={language}
          />
        ) : (
          <BlackAndWhitePdf
            resumeData={resumeData}
            sectionsVisibility={sectionsVisibility}
            fullNameColor={fullNameColor}
            styles={styles}
            language={language}
          />
        )}
      </Page>
    </Document>
  );
}

export default ThemePdf;
