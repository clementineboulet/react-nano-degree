import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import commonStyles from '../utils/commonStyles'

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