import { combineReducers } from 'redux'
import { ADD_DECK, ADD_CARD, NEW_QUIZ, ADD_ANSWER } from './actions'
import { AsyncStorage } from 'react-native'

const DECKS_KEY = 'UdaciCards:decks'

function getInitState() {
  let data
  AsyncStorage.getItem(DECKS_KEY)
    .then((results) => {
      data = JSON.parse(results)
    })
  return data
}

function decks (state = getInitState(), action) {
  let newState = {...state}
  switch (action.type) {
    case ADD_DECK :
      newState = {
        ...newState,
        ...action.deck
      }
      break
    case ADD_CARD :
      newState[action.deckId].cards.push(action.card)
      break
    default :
      break
  }
  AsyncStorage.setItem(DECKS_KEY, JSON.stringify(newState))
  return newState
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