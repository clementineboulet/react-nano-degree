import React, { Component } from 'react'
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../redux/actions'
import { green, white } from '../utils/colors'
import commonStyles from '../utils/commonStyles'
import Button from '../components/Button'
import navigationConst from '../utils/navigation'

class NewDeck extends Component {
  state = {
    deckName: '',
  }
  addNewDeck = () => {
    const { navigation, addNewDeck } = this.props
    const deckId = `deck_${Date.now()}`
    const deck = {}
    deck[deckId] = {
      deckName: this.state.deckName,
      deckId,
      cards: []
    }
    navigation.navigate(navigationConst.home)
    addNewDeck(deck)
    this.setState({ deckName: '' })
    this.textInput.clear()
  }

  render() {
    return (
      <View style={commonStyles.background}>
        <KeyboardAvoidingView behavior="padding" enabled style={[commonStyles.foreground, commonStyles.deckCard]}>
          <Text style={commonStyles.deckDescription}>New deck</Text>
          <TextInput
            style={commonStyles.textInput}
            placeholder="New deck"
            onChangeText={(deckName) => this.setState({deckName})}
            returnKeyType="send"
            onSubmitEditing={this.addNewDeck}
            blurOnSubmit
            ref={input => { this.textInput = input }}
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