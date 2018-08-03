import React, { Component } from 'react'
import { Text, View, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { green, white, beige } from '../utils/colors'
import commonStyles from '../utils/commonStyles'
import Button from '../components/Button'
import { addCard } from '../redux/actions'


class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  addCardToDeck = () => {
    console.log('Add card to deck!!', this.props)
    const { navigation, addCardToDeck } = this.props
    const deckId = navigation.state.params.id
    
    //navigation.dispatch(NavigationActions.back())
    navigation.goBack()
    addCardToDeck({card: this.state, deckId})
  }

  render() {
    return (
      <View style={{backgroundColor: beige, flex: 1}}>
        <KeyboardAvoidingView behavior="padding" enabled style={[{backgroundColor: white, flex: 1}, commonStyles.deckCard]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Text style={commonStyles.deckDescription}>Question</Text>
              <TextInput
                style={commonStyles.textInput}
                placeholder="Type here your question"
                onChangeText={(question) => this.setState({question})}
                returnKeyType="next"
                onSubmitEditing={() => { this.secondTextInput.focus() }}
              />
              <Text style={commonStyles.deckDescription}>Answer</Text>
              <TextInput
                style={commonStyles.textInput}
                placeholder="Answer goes here"
                onChangeText={(answer) => this.setState({answer})}
                returnKeyType="send"
                ref={(input) => { this.secondTextInput = input }}
                onSubmitEditing={this.addCardToDeck}
              />
              <View style={commonStyles.buttonContainer}>
                <Button
                  title="Submit"
                  color={white}
                  backgroundColor={green}
                  onPress={this.addCardToDeck}
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