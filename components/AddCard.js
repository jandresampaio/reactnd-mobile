import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Platform
} from "react-native";

import { addCardToDeck } from "../utils/api";
import { connect } from "react-redux";
import { addCard, addDeck } from "../actions";
import { purple, white } from "../utils/colors";
import { CommonActions } from "@react-navigation/native";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}
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

    //clearLocalNotification().then(setLocalNotification);
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
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={(text) => this.onChangeQuestion(text)}
          value={question}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={(text) => this.onChangeAnswer(text)}
          value={answer}
        />
        <SubmitBtn style={{ marginTop: 30 }} onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  }
});

function mapStateToProps(decks, { route }) {
  const { deckId } = route.params;

  return {
    title: deckId
  };
}

export default connect(mapStateToProps)(AddCard);
