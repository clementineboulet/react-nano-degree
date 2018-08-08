import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { addAnswerToQuiz, createQuiz } from '../redux/actions'
import Card from '../components/Card';
import commonStyles from '../utils/commonStyles'

class Quiz extends Component {
  question = 'Q'
  answer = 'A'
  state={
    title: this.question
  }

  restart = (deckId) => {
    this.setState({
      title: this.question
    })
    this.props.startNewQuiz(deckId)
  }
  render() {
    const { quiz, decks, addAnswer, navigation } = this.props
    const { question, answer } = this
    const { deckId, cardNumber, total } = quiz
    const cards = decks[deckId].cards
    const cardLength = cards.length

    return (
      <View style={commonStyles.background}>
        {
          cardNumber !== cardLength
          ? <Card
              title={cards[cardNumber][this.state.title]}
              addAnswer={addAnswer}
              goToTwin={
                () => (this.setState((prevState) => ({
                  title: prevState.title === question ? answer : question
                })))
              }
            />
          : <Card
              title="Your score is"
              result={`${100*total/cardLength}%`}
              goBack={navigation.goBack}
              restart={() => this.restart(deckId)}
            />
        }
      </View>
    )
  }
}

const mapStateToProps = ({quiz, decks}) => ({
  decks,
  quiz
})

const mapDispatchToProps = (dispatch) => ({
  addAnswer: (answer) => dispatch(addAnswerToQuiz(answer)),
  startNewQuiz: (deckId) => dispatch(createQuiz(deckId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

