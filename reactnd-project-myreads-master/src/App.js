import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './API/BooksAPI';
import './App.css';
import SearchPage from './pages/SearchPage';
import DisplayPage from './pages/DisplayPage';
import locales from './locales/en-US';

class BooksApp extends React.Component {
  state = {
    shelves: {},
    bookList: {},
  }

  componentWillMount = () => {
    const { bookShelf, emptyShelfKey } = locales;
    const shelves = {};
    const bookList = {};
    Object.keys(bookShelf).map((key) => {
      if(key !== emptyShelfKey) shelves[key] = [];
      return null;
    });
    this.getBooksInShelves(shelves, bookList);
  }

  pushBookToShelf = ({ book, shelves, bookList }) => {
    shelves[book.shelf].push(book.id);
    bookList[book.id] = book;
  };

  addBookToList = ({ id, book }) => {
    const { bookList } = this.state;
    bookList[id] = book;
    this.setState({ bookList });
  };

  updateBookToShelf = ({ book, shelf }) => {
    const { bookList } = this.state;
    if (bookList[book.id]) this.addBookToList({ id: book.id, book });
    const promise = new Promise((resolve, reject) => (resolve(BooksAPI.update(book, shelf))));
    return promise.then(shelves => (this.setState({ shelves })));
  };

  getBooksInShelves = (shelves, bookList) => {
    const promise = new Promise((resolve, reject) => (resolve(BooksAPI.getAll())));
    return promise.then(books => {
      books.map(book => (this.pushBookToShelf({ book, shelves, bookList })));
      this.setState({
        shelves,
        bookList,
      });
    });
  };

  render() {
    const { shelves, bookList } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <DisplayPage
              shelves={shelves}
              bookList={bookList}
              updateBookToShelf={this.updateBookToShelf}
            />)}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              updateBookToShelf={this.updateBookToShelf}
            />)}
        />
      </div>
    );
  }
}

export default BooksApp;
