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

  componentDidMount = () => {
    const { bookShelf, emptyShelfKey } = locales;
    const shelves = {};
    const bookList = {};
    Object.keys(bookShelf).map((key) => {
      if(key !== emptyShelfKey) shelves[key] = [];
      return null;
    });
    this.getBooksInShelves(shelves, bookList);
  }

  /**
  * @description Push book to shelf
  * @param {object} book
  * @param {array} shelves - the array of shelves with id of books in it
  * @param {array} bookList - the list of books in shelves with details
  */
  pushBookToShelf = ({ book, shelves, bookList }) => {
    shelves[book.shelf].push(book.id);
    bookList[book.id] = book;
  };

  /**
  * @description Add book to List of books in shelves
  * @param {object} book
  * @param {string} id
  * @param {array} bookList - the list of books in shelves with details
  * @returns {array} the new bookList - the list of books in shelves with details
  */
  addBookToList = ({ id, book, bookList }) => {
    bookList[id] = book;
    return bookList;
  };

  /**
  * @description remove book from List of books in shelves
  * @param {object} book
  * @param {string} id - the book id
  * @param {array} bookList - the list of books in shelves with details
  * @returns {array} the new bookList - the list of books in shelves with details
  */
  removeBookToList = ({ id, book, bookList }) => {
    if (bookList[id]) delete bookList[id];
    return bookList;
  };

  /**
  * @description update the list of books and shelves
  * @param {object} book - the book that needs an update
  * @param {string} shelf - the new shelf of the book
  */
  updateBookToShelf = ({ book, shelf }) => {
    const { bookList } = this.state;

    if (!bookList[book.id]) {
      book.shelf = shelf;
      this.addBookToList({ id: book.id, book, bookList });
    } else if (shelf === locales.emptyShelfKey) {
      this.removeBookToList({ id: book.id, book, bookList });
    } else {
      bookList[book.id].shelf = shelf;
    }
    const promise = new Promise((resolve, reject) => (resolve(BooksAPI.update(book, shelf))));
    promise.then(shelves => (this.setState({ shelves, bookList })));
  };

  /**
  * @description get the books that are in shelves
  * @param {array} shelves - list of shelves
  * @param {array} bookList - the list of books in shelves with details
  */
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
              bookList={bookList}
            />)}
        />
      </div>
    );
  }
}

export default BooksApp;
