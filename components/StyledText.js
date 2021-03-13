import React from "react";
import { Text, StyleSheet } from "react-native";
import { white } from "../utils/colors";

const StyledText = ({ children, color }) => {
  return (
    <Text style={styles.baseText}>
      <Text style={{ color: color || white }}>{children}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  baseText: {},
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default StyledText;
