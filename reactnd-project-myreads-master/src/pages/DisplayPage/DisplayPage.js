import React from 'react';
import { Link } from 'react-router-dom';
// import * as BooksAPI from './API/BooksAPI'
import './DisplayPage.css';
import Bookshelf from '../../components/Bookshelf';
import locales from '../../locales/en-US';

/**
* @description Represents a book
* @constructor
* @param {object} shelves - the shelves object, with their respective books inside
*/

class DisplayPage extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    const { shelves } = this.props;
    const { bookShelf, search } = locales;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              Object.keys(shelves).map(shelfKey => (
                <Bookshelf
                  key={shelfKey}
                  bookList={shelves[shelfKey]}
                  title={bookShelf[shelfKey]}
                />
              ))
            }
          </div>
        </div>
        <div className="open-search">
          <Link to="search">
            {search.open}
          </Link>
        </div>
      </div>
    );
  }
}

export default DisplayPage;
