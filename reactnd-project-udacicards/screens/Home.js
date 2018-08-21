import React, { PureComponent } from 'react'
import { FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Deck from '../components/Deck'
import navigationConst from '../utils/navigation'
import commonStyles from '../utils/commonStyles'

class Home extends PureComponent {
  goToDeck = (id) => {
    const { navigation, deckList } = this.props
    navigation.navigate(navigationConst.deckView, {id, name: deckList[id].deckName})
  }

  render() {
    const { deckList } = this.props;
    return (
      <ScrollView style={commonStyles.background}>
        {
          <FlatList
            data={Object.values(deckList)}
            keyExtractor={({deckId}) => deckId}
            style={{flex: 1}}
            renderItem={({item: {deckId, deckName, cards}}) => 
              <Deck
                id={deckId}
                name={deckName}
                cardsLength={cards.length}
                goToDeck={this.goToDeck}/>
            }
          />
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = ({decks}) => ({
  deckList: decks
})

export default connect(mapStateToProps)(Home)