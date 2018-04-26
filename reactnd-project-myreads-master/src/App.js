import React from 'react';
import { Route } from 'react-router-dom';
// import * as BooksAPI from './API/BooksAPI'
import './App.css';
import SearchPage from './pages/SearchPage';
import DisplayPage from './pages/DisplayPage';
import locales from './locales/en-US';
import json from './JSON/myReads.json';

class BooksApp extends React.Component {
  state = {
    shelves: {}
  }

  componentWillMount = () => {
    const { bookShelf } = locales;
    const shelves = {};
    Object.keys(bookShelf).map((key) => {
      if(key !== 'none') shelves[key] = json[key] ;
    });
    this.setState({
      shelves
    });
  }

  render() {
    const { shelves } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (<DisplayPage shelves={shelves}/>)}
        />
        <Route
          path="/search"
          render={() => (<SearchPage shelves={shelves}/>)}
        />
      </div>
    )
  }
}

export default BooksApp
