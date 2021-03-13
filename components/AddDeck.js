import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { saveDeckTitle } from "../utils/api";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { blue } from "../utils/colors";
import { CommonActions } from "@react-navigation/native";
import Button from "./Button";

class AddDeck extends Component {
  state = {
    title: ""
  };

  submit = () => {
    const { title } = this.state;

    this.props.dispatch(addDeck({ title }));

    this.toDeckView(title);

    saveDeckTitle(title);
  };

  toDeckView = (title) => {
    this.props.navigation.dispatch(
      CommonActions.navigate({
        name: "DeckView",
        params: {
          deckId: title
        }
      })
    );
  };

  onChangeText(title) {
    this.setState(() => ({ title }));
  }

  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          placeholder="Type the Deck name here..."
          onChangeText={(text) => this.onChangeText(text)}
          value={title}
        />
        <Button title="Add Deck" onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between"
  },
  inputText: {
    marginTop: 20,
    height: 40,
    borderColor: blue,
    borderWidth: 1
  }
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AddDeck);
