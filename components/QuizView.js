import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { green, blue, purple, red, white } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import Button from "./Button";
import StyledText from "./StyledText";

const initialAnswersState = { correct: 0, incorrect: 0, showAnswer: false };

export default function QuizView(props) {
  const { questions, title } = props.route.params.deck;
  if (!questions || !questions.length)
    return (
      <View>
        <StyledText>Cannot start a Quiz when the Deck is empty</StyledText>
      </View>
    );

  const [answers, setAnswers] = useState(initialAnswersState);

  const answersCount = answers.correct + answers.incorrect;
  if (answersCount == questions.length) {
    const score = answers.correct / questions.length;
    clearLocalNotification().then(setLocalNotification);

    return (
      <QuizResults
        style={styles.container}
        onReset={() => setAnswers(initialAnswersState)}
        title={title}
        score={score}
        {...props}
      />
    );
  }

  const currentCard = questions[answersCount];
  return (
    <View style={styles.container}>
      <View>
        <StyledText color={blue}>
          Question {answersCount + 1} of {questions.length}
        </StyledText>
        <CardView {...currentCard} showAnswer={answers.showAnswer} />
      </View>
      <View style={styles.actions}>
        <Button
          title="Correct"
          color={green}
          onPress={() =>
            setAnswers({
              ...answers,
              correct: answers.correct + 1,
              showAnswer: false
            })
          }
        />
        <Button
          title="Incorrect"
          color={red}
          onPress={() =>
            setAnswers({
              ...answers,
              incorrect: answers.incorrect + 1,
              showAnswer: false
            })
          }
        />
        <Button
          title="Show Answer"
          color="#841584"
          onPress={() => setAnswers({ ...answers, showAnswer: true })}
        />
      </View>
    </View>
  );
}

function QuizResults({ title, score, navigation, onReset }) {
  return (
    <View style={styles.container}>
      <View style={styles.quizResults}>
        <StyledText>Score: {Math.round(score * 100)}%</StyledText>
      </View>
      <View style={styles.actions}>
        <Button title="Restart Quiz" color="green" onPress={onReset} />
        <Button
          title="Back to Deck"
          color={blue}
          onPress={() =>
            navigation.navigate("DeckView", {
              deckId: title
            })
          }
        />
      </View>
    </View>
  );
}

function CardView({ question, answer, showAnswer }) {
  return (
    <View style={styles.card}>
      <StyledText>{question}</StyledText>
      {showAnswer && <StyledText>The correct answer is: {answer}</StyledText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between"
  },
  card: {
    borderRadius: 4,
    backgroundColor: blue,
    padding: 20,
    textTransform: "uppercase"
  },
  actions: {
    height: 150,
    display: "flex",
    justifyContent: "space-around"
  },
  quizResults: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 150,
    width: 150,
    height: 150,
    backgroundColor: blue,
    alignSelf: "center",
    color: white,
    fontWeight: "bold",
    fontSize: 60
  },
  reset: {
    textAlign: "center",
    color: purple
  }
});
