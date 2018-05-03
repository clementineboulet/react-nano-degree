import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './DisplayPage.css';
import Bookshelf from '../../components/Bookshelf';
import locales from '../../locales/en-US';

/**
* @description Main Page Skeleton
* @constructor
* @param {object} shelves - the shelves object, with their respective books inside
* @param {object} bookList - the list of books that are on shelves
* @param {function} updateBookToShelf - The function that update the shelf the book should be on
*/

const DisplayPage = ({
  shelves,
  bookList,
  updateBookToShelf,
}) => {
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
                reference={bookList}
                title={bookShelf[shelfKey]}
                updateBookToShelf={updateBookToShelf}
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
};

DisplayPage.propTypes = {
  shelves: PropTypes.object.isRequired,
  bookList: PropTypes.object.isRequired,
  updateBookToShelf: PropTypes.func.isRequired,
};

export default DisplayPage;
