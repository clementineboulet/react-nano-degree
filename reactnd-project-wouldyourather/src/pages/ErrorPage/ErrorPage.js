import React from 'react';
import './ErrorPage.css';
import locales from '../../locales/en-US';

/**
* @description Error Page
* @constructor
*/

const ErrorPage = () => {
  return (
    <div className="error">
      {locales.error.main_error}
    </div>
  );
};

export default ErrorPage;
