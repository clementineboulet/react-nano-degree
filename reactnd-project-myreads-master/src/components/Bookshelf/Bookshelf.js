import React from 'react'
import './Bookshelf.css'
import Book from '../Book';

/**
* @description Represents a book
* @constructor
* @param {array} bookList - the list of books
* @param {string} title - the name of the shelf
*/

class BookShelf extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

  render() {
    const { bookList, title } = this.props;
    return (
      <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            bookList && bookList.map((book, index) => (
              <li key={index}>
                <Book {...book} />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
    )
  }
}

export default BookShelf