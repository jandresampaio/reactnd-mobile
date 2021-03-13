import React from "react";
import { StyleSheet, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddCard from "./components/AddCard";
import AddDeck from "./components/AddDeck";
import DeckList from "./components/DeckList";
import DeckView from "./components/DeckView";
import QuizView from "./components/QuizView";
import { setLocalNotification } from "./utils/helpers";

const Stack = createStackNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01
  }
};

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
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
                options={{ title: "Deck" }}
              />
              <Stack.Screen
                name="AddDeck"
                component={AddDeck}
                options={{
                  title: "Add Deck",
                  transitionSpec: {
                    open: config,
                    close: config
                  }
                }}
              />
              <Stack.Screen
                name="AddCard"
                component={AddCard}
                options={{ title: "Add Card" }}
              />
              <Stack.Screen
                name="QuizView"
                options={{ title: "Quiz" }}
                component={QuizView}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
