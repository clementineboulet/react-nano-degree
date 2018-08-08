import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import commonStyles from '../utils/commonStyles'
import { green, red, white } from '../utils/colors'
import Button from './Button'

export default function Card ({ title, addAnswer, goToTwin, result, goBack, restart }) {
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
        : null
      }
      <View style={commonStyles.buttonContainer}>
            <Button
              title={result ? 'Go back': 'Correct'}
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