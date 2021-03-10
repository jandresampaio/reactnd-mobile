import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Platform
} from "react-native";

import { saveDeckTitle } from "../utils/api";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { green, white } from "../utils/colors";
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
class AddDeck extends Component {
  state = {
    title: ""
  };

  submit = () => {
    const { title } = this.state;

    this.props.dispatch(addDeck({ title }));

    this.toDeckView(title);

    saveDeckTitle(title);

    //clearLocalNotification().then(setLocalNotification);
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
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={(text) => this.onChangeText(text)}
          value={title}
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
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: green,
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

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AddDeck);
