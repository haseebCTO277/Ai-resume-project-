import { Link, View } from "@react-pdf/renderer";
import React from "react";

function LinkContent({ displayLabel, value, color, isWidth }) {
  return (
    <View
      style={{
        maxWidth: isWidth ? "105px" : "130px",
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        wordBreak: "inherit",
        display: "block",
      }}
    >
      <Link
        href={value}
        style={{
          fontSize: "11px",
          color,
          fontWeight: 400,
          display: "flex",
        }}
      >
        {displayLabel}
      </Link>
    </View>
  );
}

export default LinkContent;
