import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { addCardToDeck } from "../utils/api";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { blue } from "../utils/colors";
import { CommonActions } from "@react-navigation/native";
import Button from "./Button";

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  submit = () => {
    const { question, answer } = this.state;
    const { title } = this.props;
    const card = { question, answer };
    this.props.dispatch(addCard(title, card));
    this.props.navigation.dispatch(CommonActions.goBack());
    addCardToDeck(title, card);
  };

  onChangeQuestion(question) {
    this.setState(() => ({ question }));
  }

  onChangeAnswer(answer) {
    this.setState(() => ({ answer }));
  }

  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.inputText}
            placeholder="Type the question here..."
            onChangeText={(text) => this.onChangeQuestion(text)}
            value={question}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Type the answer here..."
            onChangeText={(text) => this.onChangeAnswer(text)}
            value={answer}
          />
        </View>
        <Button title="Add Card" onPress={this.submit} />
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
    marginBottom: 20,
    height: 40,
    borderColor: blue,
    borderWidth: 1
  }
});

function mapStateToProps(decks, { route }) {
  const { deckId } = route.params;

  return {
    title: deckId
  };
}

export default connect(mapStateToProps)(AddCard);
