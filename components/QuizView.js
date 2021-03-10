import React, { useState } from "react";
import { Text, Button, StyleSheet, View } from "react-native";
import { green, purple } from "../utils/colors";

function QuizResults({ title, score, navigation, onReset }) {
  const [answers, setAnswers] = useState({ correct: 0, incorrect: 0 });

  return (
    <View>
      <Text>Score: {score * 100}%</Text>
      <Button
        style={{ margin: 20 }}
        title="Restart Quiz"
        color="green"
        accessibilityLabel="Restart Quiz"
        onPress={onReset}
      />
      <Button
        style={{ margin: 20 }}
        title="Back to Deck"
        color="green"
        accessibilityLabel="Return back to deck main page"
        onPress={() =>
          navigation.navigate("DeckView", {
            deckId: title
          })
        }
      />
    </View>
  );
}

const initialAnswersState = { correct: 0, incorrect: 0 };

export default function QuizView(props) {
  const { questions, title } = props.route.params.deck;
  if (!questions || !questions.length)
    return (
      <View>
        <Text>Cannot start a Quiz when the Deck is empty</Text>
      </View>
    );

  const [answers, setAnswers] = useState(initialAnswersState);
  const answersCount = answers.correct + answers.incorrect;
  if (answersCount == questions.length) {
    const score = answers.correct / questions.length;
    return (
      <QuizResults
        onReset={() => setAnswers(initialAnswersState)}
        title={title}
        score={score}
        {...props}
      />
    );
  }

  const currentCard = questions[answersCount];
  return (
    <View>
      <Text style={[styles.reset]}>{currentCard.question}</Text>
      <Button
        style={{ margin: 20 }}
        title="Correct"
        color={green}
        accessibilityLabel="Show this question answer"
        onPress={() => setAnswers({ ...answers, correct: answers.correct + 1 })}
      />
      <Button
        style={{ margin: 20 }}
        title="Incorrect"
        color={purple}
        accessibilityLabel="Show this question answer"
        onPress={() =>
          setAnswers({ ...answers, incorrect: answers.incorrect + 1 })
        }
      />
      <Button
        style={{ margin: 20 }}
        title="Show Answer"
        color="#841584"
        accessibilityLabel="Show this question answer"
        onPress={() => setAnswers(answers++)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  reset: {
    textAlign: "center",
    color: purple
  }
});
