import React, { Component } from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { blue, white } from "../utils/colors";
import Button from "./Button";
import { DeckInfo } from "./DeckInfo";
class DeckView extends Component {
  componentDidMount() {}

  render() {
    const { deck, navigation } = this.props;
    if (!deck) return <View>Deck was not found</View>;
    return (
      <View style={styles.container}>
        <DeckInfo deck={deck}></DeckInfo>
        <View>
          <Button
            onPress={() =>
              navigation.navigate("AddCard", {
                deckId: deck.title
              })
            }
            margin={10}
            title="Add Card"
          />
          <Button
            onPress={() =>
              navigation.navigate("QuizView", {
                deck
              })
            }
            margin={10}
            title="Start Quiz"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    borderRadius: 4,
    backgroundColor: blue,
    padding: 20,
    textTransform: "uppercase"
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between"
  }
});

function mapStateToProps(decks, { navigation, route }) {
  const { deckId } = route.params;

  return {
    deck: decks ? decks[deckId] : null
  };
}

function mapDispatchToProps(dispatch, { navigation, route }) {
  const { deckId } = route.params;

  return {
    remove: () =>
      dispatch(
        addEntry({
          [deckId]: timeToString() === entryId ? getDailyReminderValue() : null
        })
      ),
    goBack: () => navigation.goBack()
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView);
