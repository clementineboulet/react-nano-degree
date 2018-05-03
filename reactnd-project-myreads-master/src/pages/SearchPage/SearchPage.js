import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../../API/BooksAPI';
import Book from '../../components/Book';
import locales from '../../locales/en-US';
import './SearchPage.css';

/**
* @description Search Page Skeleton
* @constructor
* @param {function} updateBookToShelf - The function that update the shelf the book should be on
* @param {object} bookList - the list of books id
*/
class SearchPage extends React.Component {
  state = {
    books: {},
    isError: false,
  }

  searchBook = (query) => {
    const promise = new Promise((resolve, reject) => (resolve(BooksAPI.search(query))));
    return promise.then(books => (
      books && books.error ?
        this.setState({isError: true}) :
        this.setState({ books, isError: false })
    ));
  };

  findShelf = (book) => {
    const { bookList } = this.props;
    return book && bookList[book.id] ? book.shelf = bookList[book.id].shelf : null;
  }

  render() {
    const { placeholder, close } = locales.search;
    const { books, isError } = this.state;
    const { updateBookToShelf, bookList } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">{close}</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder={placeholder} onChange={e => (e.target.value && this.searchBook(e.target.value))}/>
          </div>
        </div>
        <div className="search-books-results">
          { isError ?
          <div className="search-error">No results found. Please search for another term</div> :
          <ol className="books-grid">
            {
              books.length && books.map((book, index) => {
                const shelf = book && bookList[book.id] && bookList[book.id].shelf;
                return (
                  <li key={index}>
                    <Book {...book} updateBookToShelf={updateBookToShelf} overwriteShelf={shelf}/>
                  </li>
                );
              })
            }
          </ol>}
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  bookList: PropTypes.object.isRequired,
  updateBookToShelf: PropTypes.func.isRequired,
};

export default SearchPage;
