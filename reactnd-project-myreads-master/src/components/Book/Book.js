import React from 'react';
import './Book.css';
import locales from '../../locales/en-US';

/**
* @description Represents a book
* @constructor
* @param {string} title - The title of the book
* @param {string} author - The author of the book
* @param {object} imageLinks - The image object that contains thumbnails
* @param {string} id - The book id
* @param {string} shelf ?- The shelf on which the book belongs
* @param {function} updateBookToShelf - The function that update the shelf the book should be on
*/

const Book = ({
  title,
  author,
  imageLinks,
  id,
  shelf,
  updateBookToShelf,
  ...others,
}) => {
  const { bookOption, bookShelf, emptyShelfKey } = locales;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageLinks.smallThumbnail})`
          }}
        />
        <div className="book-shelf-changer">
          <select
            onChange={(e) => updateBookToShelf({ book: {id}, shelf: e.target.value })}
            value={shelf || emptyShelfKey}
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
      <div className="book-authors">{author}</div>
    </div>
  );
};

export default Book;
