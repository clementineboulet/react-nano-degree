import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import commonStyles from '../utils/commonStyles'


/**
* @description Deck Component
* @constructor
* @param {string} id - the id of the current deck
* @param {string} name - the name of the current deck
* @param {number} cardsLength - the number of cards in the current deck
* @param {func} goToDeck - on press event action (here go to deck)
*/
export default function Deck ({ id, name, cardsLength, goToDeck }) {
  return (
    <TouchableOpacity style={commonStyles.deckCard} onPress={() => goToDeck(id)}>
      <Text style={commonStyles.deckTitle}>
        {name}
      </Text>
      <Text style={commonStyles.deckDescription}>
        {`Number of cards: ${cardsLength}`}
      </Text>
    </TouchableOpacity>
  )
}