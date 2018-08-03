import { StyleSheet } from 'react-native'
import { white, black } from './colors'

export default StyleSheet.create({
  deckCard: {
    margin: 15,
    backgroundColor: white,
    paddingTop: 30,
    paddingBottom: 30,
    shadowColor: 'rgba(0, 0, 0, 0.30)',
    shadowOffset: {
      width: 2,
      height: 5
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  deckTitle: {
    color: black,
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10
  },
  deckDescription: {
    color: black,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200
  }
});