import React, { Component} from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons'
import Home from './screens/Home'
import NewDeck from './screens/NewDeck'
import DeckView from './screens/DeckView'
import AddCard from './screens/AddCard'
import Quiz from './screens/Quiz'
import { purple, white, black } from './utils/colors'
import reducer from './redux/reducers'
import middleware from './redux/middlewares'
import { setLocalNotification } from './utils/notifications'

const createTabs = Platform.OS === 'ios' ? createBottomTabNavigator : createMaterialTopTabNavigator
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    height: Platform.OS === 'ios' ? 56 : 60,
    backgroundColor: Platform.OS === 'ios' ? purple: white,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  }
});

const tabsOptions = {
  ios: {
    activeTintColor: white,
    inactiveTintColor: purple,
    activeBackgroundColor: purple,
    inactiveBackgroundColor: white,
    style: styles.tabs
  },
  android: {
    activeTintColor: purple,
    inactiveTintColor: black,
    showIcon: true,
    indicatorStyle: {
      backgroundColor: purple
    },
    iconStyle: {
      width: 60
    },
    style: styles.tabs
  }
}

const Tabs = createTabs({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => Platform.OS === 'ios'
        ? <Ionicons name="ios-home" size={30} color={tintColor} />
        : <MaterialIcons name="home" size={30} color={tintColor} />
    }
  },
  Deck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name="add-to-list" size={30} color={tintColor} />
    }
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: tabsOptions[Platform.OS]
})

const MainNavigation = createStackNavigator({
  Home: {
    screen: Tabs,
    initialRouteName: 'Home',
    navigationOptions: {
      header: null
    },
  },
  DeckView: {
    screen: DeckView,
    initialRouteName: 'DeckView',
    initialRouteParams: 'id',
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      },
      headerTitleContainerStyle: {
        padding: 0
      },
      title: `${navigation.state.params.name}`
    })
  },
  AddCard: {
    screen: AddCard,
    initialRouteName: 'AddCard',
    initialRouteParams: 'id',
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      },
      headerTitleContainerStyle: {
        padding: 0
      },
      title: `Add card to ${navigation.state.params.name}`
    })
  },
  Quiz: {
    screen: Quiz,
    initialRouteName: 'Quiz',
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      },
      headerTitleContainerStyle: {
        padding: 0
      },
      title: 'Quiz'
    })
  }
})

export default class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={styles.container}>
          <View style={{height: Expo.Constants.statusBarHeight}}/>
          <MainNavigation/>  
        </View>
      </Provider>
    );
  }
}
