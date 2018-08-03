import React, { PureComponent } from 'react'
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { green, red, white, beige } from '../utils/colors'
import commonStyles from '../utils/commonStyles'
import Button from '../components/Button'

class DeckView extends PureComponent {
  goToAddCard = () => {
    const { navigation, deck } = this.props
    navigation.navigate('AddCard', {id: deck.deckId, name: deck.deckName})
  }

  render() {
    const { deck } = this.props
    return (
      <View style={{backgroundColor: beige, flex: 1}}>
        <View style={[{backgroundColor: white, flex: 1}, commonStyles.deckCard]}>
          <Text style={commonStyles.deckTitle}>{deck.deckName}</Text>
          <Text style={commonStyles.deckTitle}>{`${deck.cards.length} cards`}</Text>
          <View style={commonStyles.buttonContainer}>
            <Button title="Start Quiz" color={white} backgroundColor={green}/>
            <Button
              title="Add a Card"
              color={white}
              backgroundColor={red}
              onPress={this.goToAddCard}/>
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

export default connect(mapStateToProps)(DeckView)