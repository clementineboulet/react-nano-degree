import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../API/BooksAPI';
import Book from '../../components/Book';
import locales from '../../locales/en-US';
import './SearchPage.css';

/**
* @description Represents a book
* @constructor
* @param {function} updateBookToShelf - The function that update the shelf the book should be on
*/
class SearchPage extends React.Component {
  state = {
    books: {},
  }

  searchBook = (query) => {
    const promise = new Promise((resolve, reject) => (resolve(BooksAPI.search(query))));
    return promise.then(books => (this.setState({ books })));
  };

  render() {
    const { placeholder, close } = locales.search;
    const { updateBookToShelf } = this.props;
    const { books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">{close}</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder={placeholder} onChange={e => (this.searchBook(e.target.value))}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              books.length && books.map((book, index) => (
                <li key={index}>
                  <Book {...book} updateBookToShelf={updateBookToShelf} />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
