import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import commonStyles from '../utils/commonStyles'
import { green, red, white } from '../utils/colors'
import Button from './Button'


/**
* @description Deck Component
* @constructor
* @param {string} title - the title of the card
* @param {string} result - the result of the quiz
* @param {string} nextCardState - the state of the next card (question/answer)
* @param {number} remainingNumber - the number of cards remaining in the quiz
* @param {func} goToTwin - on press card event action (flip the card)
* @param {func} goBack - on press button event action (here go to back deck when results)
* @param {func} addAnswer - on press button event action (here add answer if no results)
* @param {func} restart - on press button event action (here restart quiz when results)
*/

export default function Card ({
  title,
  result,
  nextCardState,
  remainingNumber,
  goToTwin,
  goBack,
  addAnswer,
  restart
}) {
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
            Tap the card to show the {nextCardState}
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