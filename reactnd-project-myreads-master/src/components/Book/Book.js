import React from 'react'
import './Book.css'
import locales from '../../locales/en-US'

/**
* @description Represents a book
* @constructor
* @param {string} title - The title of the book
* @param {string} author - The author of the book
* @param {string} imageUrl - The image url of the book
*/

const Book = ({
  title, author, imageUrl, ...others
}) => {
  const { bookOption, bookShelf } = locales
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageUrl})`
          }}
        />
        <div className="book-shelf-changer">
          <select>
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
  )
}

export default Book
