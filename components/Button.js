import React from "react";
import { TouchableOpacity, Platform } from "react-native";
import { white } from "../utils/colors";
import StyledText from "./StyledText";

function Button({ onPress, color, title, margin }) {
  let style = Platform.OS === "ios" ? styles.ios : styles.android;
  style = {
    ...style,
    color: color || styles.color,
    margin: margin || styles.margin
  };
  return (
    <TouchableOpacity
      style={[
        style,
        {
          justifyContent: "center",
          display: "flex",
          alignItems: "center"
        }
      ]}
      onPress={onPress}
    >
      <StyledText style={styles.title}>{title}</StyledText>
    </TouchableOpacity>
  );
}

const styles = {
  ios: {
    backgroundColor: "#1c1748",
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 40
  },
  android: {
    backgroundColor: "#1c1748",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 40
  },
  title: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  }
};

export default Button;
