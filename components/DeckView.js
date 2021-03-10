import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Button
} from "react-native";
import { connect } from "react-redux";
import { white } from "../utils/colors";

class DeckView extends Component {
  componentDidMount() {}

  delete() {
    const { deck, navigation } = this.props;
  }

  render() {
    const { deck, navigation } = this.props;
    if (!deck) return <View>Deck was not found</View>;
    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length}</Text>
        <Button
          style={{ margin: 20 }}
          onPress={() =>
            navigation.navigate("AddCard", {
              deckId: deck.title
            })
          }
          title="Add Card"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          style={{ margin: 20 }}
          onPress={() =>
            navigation.navigate("QuizView", {
              deck
            })
          }
          title="Start Quiz"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          style={{ margin: 20 }}
          title="Delete Deck"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
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
