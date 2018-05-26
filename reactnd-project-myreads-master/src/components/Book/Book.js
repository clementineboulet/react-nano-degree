import React from 'react';
import PropTypes from 'prop-types';
import './Book.css';
import locales from '../../locales/en-US';

/**
* @description Represents a book
* @constructor
* @param {string} title - The title of the book
* @param {string} authors - The authors of the book
* @param {object} imageLinks - The image object that contains thumbnails
* @param {string} id - The book id
* @param {string} shelf ?- The shelf on which the book belongs
* @param {function} updateBookToShelf - The function that update the shelf the book should be on
* @param {string} overwriteShelf ?- The shelf on which the book is searched for
*/

const Book = ({
  title,
  authors,
  imageLinks,
  id,
  shelf,
  updateBookToShelf,
  overwriteShelf,
  ...others,
}) => {
  const { bookOption, bookShelf, emptyShelfKey } = locales;
  return (
    title ? <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: `url(${imageLinks && imageLinks.smallThumbnail ?
              imageLinks.smallThumbnail : 'http://via.placeholder.com/128x193'})`
          }}
        />
        <div className="book-shelf-changer">
          <select
            onChange={(e) => updateBookToShelf({ book: {
              title,
              authors,
              imageLinks,
              id,
              shelf,
              ...others,
            }, shelf: e.target.value })}
            value={overwriteShelf || shelf || emptyShelfKey}
          >
            {
              Object.keys(bookOption).map(key => (
                <option value={key} key={key} disabled>{bookOption[key]}</option>
              ))
            }
            {
              Object.keys(bookShelf).map(key => (
                <option value={key} key={key}>{bookShelf[key]}</option>
              ))
            }
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors && authors.map((author, index) => (
          `${author} ${index === authors.length - 1 ? '' : '- '}`
        ))}</div>
    </div> : <div/>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  imageLinks: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  shelf: PropTypes.string,
  overwriteShelf: PropTypes.string,
  updateBookToShelf: PropTypes.func.isRequired,
};

export default Book;
