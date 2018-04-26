import React from 'react'
import { Link } from 'react-router-dom'
// import * as BooksAPI from './API/BooksAPI'
import locales from '../../locales/en-US'
import './SearchPage.css'

class SearchPage extends React.Component {
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
    const { placeholder, close } = locales.search;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">{close}</Link>
          <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" placeholder={placeholder}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
