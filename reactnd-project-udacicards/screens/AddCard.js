import React, { Component } from 'react'
import { Text, View, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import { green, white } from '../utils/colors'
import commonStyles from '../utils/commonStyles'
import Button from '../components/Button'
import { addCard } from '../redux/actions'


class AddCard extends Component {
  state = {
    Q: '',
    A: ''
  }
  addCardToDeck = () => {
    const { navigation, addCardToDeck } = this.props
    const deckId = navigation.state.params.id

    navigation.goBack()
    addCardToDeck({card: this.state, deckId})
  }

  render() {
    const { addCardToDeck } = this
    return (
      <View style={commonStyles.background}>
        <KeyboardAvoidingView behavior="padding" enabled style={[commonStyles.foreground, commonStyles.deckCard]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Text style={commonStyles.deckDescription}>Question</Text>
              <TextInput
                style={commonStyles.textInput}
                placeholder="Type here your question"
                onChangeText={(question) => this.setState({Q: question})}
                returnKeyType="next"
                onSubmitEditing={() => { this.secondTextInput.focus() }}
              />
              <Text style={commonStyles.deckDescription}>Answer</Text>
              <TextInput
                style={commonStyles.textInput}
                placeholder="Answer goes here"
                onChangeText={(answer) => this.setState({A: answer})}
                returnKeyType="send"
                ref={(input) => { this.secondTextInput = input }}
                onSubmitEditing={addCardToDeck}
              />
              <View style={commonStyles.buttonContainer}>
                <Button
                  title="Submit"
                  color={white}
                  backgroundColor={green}
                  onPress={addCardToDeck}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addCardToDeck: ({card, deckId}) => dispatch(addCard({card, deckId})),
})

export default connect(null, mapDispatchToProps)(AddCard)