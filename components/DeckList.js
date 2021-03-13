import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import { getDecks } from "../utils/api";
import { blue, white } from "../utils/colors";
import Button from "./Button";
import { DeckInfo } from "./DeckInfo";

class DeckList extends Component {
  state = {
    ready: false
  };
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })));
  }

  render() {
    const { decks, navigation } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <ActivityIndicator size="small" color="#0000ff" />;
    }

    const renderItem = ({ item }) => (
      <View>
        <TouchableOpacity
          key={item.title}
          onPress={() =>
            navigation.navigate("DeckView", {
              deckId: item.title
            })
          }
        >
          <DeckInfo deck={item}></DeckInfo>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(decks)}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
        <Button
          title="Add Deck"
          color="#1c1748"
          onPress={() => navigation.navigate("AddDeck")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: StatusBar.currentHeight || 0
  },

  itemText: {
    color: white
  },
  itemTitle: {
    textTransform: "uppercase"
  },
  title: {
    fontSize: 32
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
