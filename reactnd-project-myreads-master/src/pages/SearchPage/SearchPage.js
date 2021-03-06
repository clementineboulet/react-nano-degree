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
    query: '',
  }

  /**
  * @description search book
  * @param {string} book query - it can be a author or a title
  */
  searchBook = (query) => {
    const promise = new Promise((resolve, reject) => (resolve(BooksAPI.search(query))));
    return promise.then(books => (
      !books || (books && books.error) ?
        !books ?
          this.setState({books: {}, isError: false, query: query}) :
          this.setState({isError: true}) :
        this.setState({ books, isError: false, query: query })
    ));
  };

  render() {
    const { placeholder, close } = locales.search;
    const { books, isError } = this.state;
    const { updateBookToShelf, bookList } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">{close}</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder={placeholder} onChange={e => (this.searchBook(e.target.value))}/>
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
