import { blue, white } from "../utils/colors";
import { StyleSheet, View } from "react-native";
import StyledText from "./StyledText";
import React from "react";

export function DeckInfo({ deck }) {
  return (
    <View style={styles.item}>
      <StyledText style={styles.itemTitle}>
        {deck.title.toUpperCase()}
      </StyledText>
      <StyledText style={styles.itemText}>
        {deck.questions.length} cards
      </StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: blue,
    padding: 20,
    marginVertical: 8,
    borderRadius: 5
  },
  itemText: {
    color: white
  },
  itemTitle: {
    textTransform: "uppercase"
  }
});
