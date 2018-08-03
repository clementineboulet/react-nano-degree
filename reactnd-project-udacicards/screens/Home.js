import React, { PureComponent } from 'react'
import { Text, View, FlatList, ScrollView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import Deck from '../components/Deck'
import { beige } from '../utils/colors'

class Home extends PureComponent {
  goToDeck = (id) => {
    const { navigation, deckList } = this.props
    navigation.navigate('DeckView', {id, name: deckList[id].deckName})
  }

  render() {
    const { deckList, refreshDeck } = this.props;
    console.log(Object.values(deckList));
    return (
      <ScrollView style={{flex: 1, backgroundColor: beige}}>
        {
          <FlatList
            data={Object.values(deckList)}
            style={{flex: 1}}
            renderItem={({item: {deckId, deckName, cards}}) => 
            <Deck
              key={deckId}
              id={deckId}
              name={deckName}
              cardsLength={cards.length}
              goToDeck={this.goToDeck}/>}
            extraData={refreshDeck}
          />
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = ({decks}) => ({
  deckList: decks.deckList,
  refreshDeck: decks.refreshDeck
})

export default connect(mapStateToProps)(Home)