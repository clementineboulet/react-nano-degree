import React, { PureComponent } from 'react'
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { green, red, white } from '../utils/colors'
import commonStyles from '../utils/commonStyles'
import Button from '../components/Button'
import { createQuiz } from '../redux/actions'
import navigationConst from '../utils/navigation'


/**
* @description DeckView Screen - the view of the selected deck
* @constructor
* @param {object} decks - the list of decks
* @param {object} deck - the current deck
* @param {func} startNewQuiz - (Re)Start a new quiz from scratch
*/
class DeckView extends PureComponent {
  /**
  * @description go the new card creation screen
  */
  goToAddCard = () => {
    const { navigation, deck } = this.props
    navigation.navigate(navigationConst.addCard, {id: deck.deckId, name: deck.deckName})
  }

  /**
  * @description go the quiz screen
  */
  startQuiz = () => {
    const { deck, startNewQuiz, navigation } = this.props
    startNewQuiz(deck.deckId)
    navigation.navigate(navigationConst.quiz)
  }

  render() {
    const { deck } = this.props
    const {startQuiz, goToAddCard} = this
    return (
      <View style={commonStyles.background}>
        <View style={[commonStyles.foreground, commonStyles.deckCard]}>
          <Text style={commonStyles.deckTitle}>{deck.deckName}</Text>
          <Text style={commonStyles.deckTitle}>{`${deck.cards.length} cards`}</Text>
          <View style={commonStyles.buttonContainer}>
            <Button
              title="Start Quiz"
              color={white}
              backgroundColor={green}
              onPress={startQuiz}
              disabled={deck.cards.length === 0}/>
            <Button
              title="Add a Card"
              color={white}
              backgroundColor={red}
              onPress={goToAddCard}/>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({decks}, {navigation}) => ({
  deck: decks[navigation.state.params.id],
  decks,
})

const mapDispatchToProps = (dispatch) => ({
  startNewQuiz: (deckId) => dispatch(createQuiz(deckId))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckView)