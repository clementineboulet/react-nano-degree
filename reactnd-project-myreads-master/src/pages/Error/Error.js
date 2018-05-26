import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';
import locales from '../../locales/en-US';

/**
* @description Error Page
* @constructor
*/

const Error = () => {
  const { error } = locales;
  return (
    <div className="error">
      <div className="error-title">
        <h1>{error.title}</h1>
      </div>
      <div className="error-body">
        <div>{error.body}</div>
        <div className="redirect-home">
          <p>{error.redirect.home}</p>
          <Link className="home" to="/">{error.homeButton}</Link>
        </div>
        <div className="redirect-search">
          <p>{error.redirect.search}</p>
          <Link className="search" to="/search">{error.searchButton}</Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
