import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  FlatList,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import { getDecks } from "../utils/api";
import { blue, white } from "../utils/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    backgroundColor: blue,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  itemText: {
    color: white
  },
  title: {
    fontSize: 32
  }
});

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
      return "loading";
    }

    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <TouchableOpacity
          key={item.title}
          onPress={() =>
            navigation.navigate("DeckView", {
              deckId: item.title
            })
          }
        >
          <View>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemText}>{item.questions.length} cards</Text>
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <View>
        <FlatList
          data={Object.values(decks)}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
        <Button
          style={{ margin: 20 }}
          title="Add Deck"
          color="green"
          accessibilityLabel="Learn more about this purple button"
          onPress={() => navigation.navigate("AddDeck")}
        />
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
