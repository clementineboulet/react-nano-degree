import React from 'react'
import { View, Text } from 'react-native'
import commonStyles from '../utils/commonStyles'

export default function Deck ({ id, name, cardsLength, goToDeck }) {
  return (
    <View style={commonStyles.deckCard} onStartShouldSetResponder={() => true} onResponderGrant={() => goToDeck(id)}>
      <Text style={commonStyles.deckTitle}>
        {name}
      </Text>
      <Text style={commonStyles.deckDescription}>
        {`Number of cards: ${cardsLength}`}
      </Text>
    </View>
  )
}