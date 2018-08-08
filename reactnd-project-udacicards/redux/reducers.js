import { combineReducers } from 'redux'
import { ADD_DECK, ADD_CARD, NEW_QUIZ, ADD_ANSWER } from './actions'
import initState from './initState'

function decks (state = initState, action) {
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
        deckId: action.deckId,
        cardNumber: 0,
        total: 0
      }
    case ADD_ANSWER :
      return {
        ...state,
        cardNumber: ++state.cardNumber,
        total: state.total + action.answer
      }
    default :
      return state
  }
}

export default combineReducers({decks, quiz})