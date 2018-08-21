import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import commonStyles from '../utils/commonStyles'
import { green, red, white } from '../utils/colors'
import Button from './Button'

export default function Card ({ title, addAnswer, goToTwin, result, goBack, restart, cardState, remainingNumber }) {
  return (
    <TouchableOpacity style={commonStyles.deckCard} onPress={goToTwin}>
      <Text style={commonStyles.deckTitle}>
        {title}
      </Text>
      {
        result
        ? <Text style={commonStyles.deckDescription}>
            {result}
        </Text>
        :  <View>
            <Text style={commonStyles.deckDescription}>
            Tap the card to show the {cardState}
            </Text>
            <Text style={[commonStyles.deckDescription, { fontSize: 10 }]}>
              {`${remainingNumber} ${remainingNumber > 1 ? 'questions' : 'question'} remaining`}
            </Text>
          </View>
          
      }
      <View style={commonStyles.buttonContainer}>
            <Button
              title={result ? 'Back to Deck': 'Correct'}
              color={white}
              backgroundColor={green}
              onPress={() => result ? goBack() : addAnswer(1)}
            />
            <Button
              title={result ? 'Restart Quiz': 'Incorrect'}
              color={white}
              backgroundColor={red}
              onPress={() => result ? restart() : addAnswer(0)}/>
        </View>
    </TouchableOpacity>
  )
}