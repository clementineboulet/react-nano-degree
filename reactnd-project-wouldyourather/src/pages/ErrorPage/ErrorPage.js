import React from 'react';
import './ErrorPage.css';
import locales from '../../locales/en-US';

/**
* @description Error Page
* @constructor
*/

const ErrorPage = () => {
  const { main_error, detail_error } = locales.error;
  return (
    <div className="error">
      <p>{main_error}</p>
      <p>{detail_error}</p>
    </div>
  );
};

export default ErrorPage;
