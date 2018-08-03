import { combineReducers } from 'redux'
import { ADD_DECK, ADD_CARD, NEW_QUIZ, ADD_ANSWER } from './actions'
import initState from './initState'

function decks (state = initState, action) {
  console.log(action, state)
  switch (action.type) {
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD :
      const newState = {...state}
      newState[action.deckId].cards.push(action.card)
      return newState
    default :
      return state
  }
}

function quiz (state = {}, action) {
  switch (action.type) {
    case NEW_QUIZ :
      return {
        ...state,
        quiz: {
          deckId,
          total: 0
        },
      }
    case ADD_ANSWER :
      const newState = Object.create({}, state);
      newState.quiz.total += action.answer
      return {
        ...newState
      }
    default :
      return state
  }
}

export default combineReducers({decks, quiz})