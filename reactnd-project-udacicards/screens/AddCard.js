import React, { PureComponent } from 'react'
import { Text, View, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { green, white, beige } from '../utils/colors'
import commonStyles from '../utils/commonStyles'
import Button from '../components/Button'

class AddCard extends PureComponent {
  render() {
    const { deck } = this.props
    return (
      <View style={{backgroundColor: beige, flex: 1}}>
        <KeyboardAvoidingView behavior="padding" enabled style={[{backgroundColor: white, flex: 1}, commonStyles.deckCard]}>
          <Text style={commonStyles.deckTitle}>Add a card</Text>
          <Text style={commonStyles.deckDescription}>Question</Text>
          <TextInput style={styles.textInput}/>
          <Text style={commonStyles.deckDescription}>Answer</Text>
          <TextInput style={styles.textInput}/>
          <View style={commonStyles.buttonContainer}>
            <Button title="Submit" color={white} backgroundColor={green}/>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200
  }
})

const mapStateToProps = ({decks}, {navigation}) => ({
  deck: decks.deckList[navigation.state.params.id],
})

export default connect(mapStateToProps)(AddCard)