import React, { Component } from 'react'
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../redux/actions'
import { green, white, beige } from '../utils/colors'
import commonStyles from '../utils/commonStyles'
import Button from '../components/Button'

class NewDeck extends Component {
  state = {
    deckName: '',
  }
  addNewDeck = () => {
    console.log('Add card to deck!!', this.props)
    const { navigation, addNewDeck } = this.props
    const deckId = `deck_${Date.now()}`
    const deck = {}
    deck[deckId] = {
      deckName: this.state.deckName,
      deckId,
      cards: []
    }
    navigation.navigate('Home')
    addNewDeck(deck)
  }

  render() {
    return (
      <View style={{backgroundColor: beige, flex: 1}}>
        <KeyboardAvoidingView behavior="padding" enabled style={[{backgroundColor: white, flex: 1}, commonStyles.deckCard]}>
          <Text style={commonStyles.deckDescription}>New deck</Text>
          <TextInput
            style={commonStyles.textInput}
            placeholder="New deck"
            onChangeText={(deckName) => this.setState({deckName})}
            returnKeyType="send"
          />
          <View style={commonStyles.buttonContainer}>
            <Button title="Create" color={white} backgroundColor={green} onPress={this.addNewDeck}/>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addNewDeck: (deck) => dispatch(addDeck(deck)),
})

export default connect(null, mapDispatchToProps)(NewDeck)