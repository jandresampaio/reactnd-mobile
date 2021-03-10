import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { purple, white } from "./utils/colors";
import { Constants } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddCard from "./components/AddCard";
import AddDeck from "./components/AddDeck";
import DeckList from "./components/DeckList";
import DeckView from "./components/DeckView";
import QuizView from "./components/QuizView";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

const Stack = createStackNavigator();

export default class App extends React.Component {
  componentDidMount() {
    //setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={DeckList}
                options={{ title: "Decks" }}
              />
              <Stack.Screen
                name="DeckView"
                component={DeckView}
                options={{ title: "Decks" }}
              />
              <Stack.Screen
                name="AddDeck"
                component={AddDeck}
                options={{ title: "Add Deck" }}
              />
              <Stack.Screen
                name="AddCard"
                component={AddCard}
                options={{ title: "Add Card" }}
              />
              <Stack.Screen name="QuizView" component={QuizView} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
