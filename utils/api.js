import { useAsyncStorage } from "@react-native-community/async-storage";
const STORAGE_KEY = "mobile-flashcards:DECKS";

const appStorage = useAsyncStorage(STORAGE_KEY);

const mockData = JSON.stringify({
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
});

export function getDecks() {
  return appStorage.getItem().then((results) => results && JSON.parse(results));
}

export function getDeck(title) {
  return appStorage.getItem().then((decks) => decks.find(deck.title == title));
}

export function saveDeckTitle(title) {
  return appStorage.mergeItem(
    JSON.stringify({
      [title]: { title, questions: [] }
    })
  );
}

export function addCardToDeck(title, card) {
  return appStorage.getItem().then((results) => {
    const decks = JSON.parse(results);
    const deck = decks && decks[title];
    return appStorage.mergeItem(
      JSON.stringify({
        [title]: { title, questions: [...deck.questions, card] }
      })
    );
  });
}
