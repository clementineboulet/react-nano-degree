import React from 'react';
import PropTypes from 'prop-types';
import './Bookshelf.css';
import Book from '../Book';

/**
* @description Represents a book shelf
* @constructor
* @param {array} bookList - the list of books id in the shelf
* @param {string} title - the name of the shelf
* @param {object} reference - the books detail that are on shelves
* @param {function} updateBookToShelf - The function that update the shelf the book should be on
*/


const BookShelf = ({
  bookList, reference, title, updateBookToShelf,
}) => {
  return (
    <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
          bookList && bookList.map((id, index) => {
            const book = reference[id];
            return (<li key={index}>
              <Book {...book} updateBookToShelf={updateBookToShelf} />
            </li>);
          })
        }
      </ol>
    </div>
  </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  reference: PropTypes.object.isRequired,
  bookList: PropTypes.array.isRequired,
  updateBookToShelf: PropTypes.func.isRequired,
};

export default BookShelf;