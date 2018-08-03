export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const NEW_QUIZ = 'NEW_QUIZ'
export const ADD_ANSWER = 'ADD_ANSWER'

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function addCard ({card, deckId}) {
  return {
    type: ADD_CARD,
    deckId,
    card,
  }
}

export function createQuiz (deckId) {
  return {
    type: NEW_QUIZ,
    deckId
  }
}

export function addAnswerToQuiz (answer) {
  return {
    type: ADD_ANSWER,
    answer
  }
}