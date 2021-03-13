import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  DELETE_CARD,
  DELETE_DECK
} from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      const { deck } = action;
      return {
        ...state,
        [deck.title]: {
          ...deck,
          questions: deck.questions ? deck.questions : []
        }
      };
    case ADD_CARD:
      const { card, deckTitle } = action;
      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions: [...state[deckTitle].questions, card]
        }
      };
    case DELETE_CARD:
      return {
        ...state,
        ...action.deck
      };
    case DELETE_DECK:
      return {
        ...state,
        ...action.deck
      };
    default:
      return state;
  }
}

export default decks;
