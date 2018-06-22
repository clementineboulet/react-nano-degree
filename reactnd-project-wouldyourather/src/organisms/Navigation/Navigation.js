import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import Logout from '../Logout';
import locales from '../../locales/en-US';

/**
* @description Navigation bar
* @constructor
*/

const Navigation = () => {
  const { navigation } = locales;
  return (
    <div className="navigation">
      <Link className="link to-homepage" to="/">
        <span>{navigation.homepage}</span>
      </Link>
      <Link className="link to-create-poll" to="/add">
        <span>{navigation.create_poll}</span>
      </Link>
      <Link className="link to-leaderboard" to="/leaderboard">
        <span>{navigation.leaderboard}</span>
      </Link>
      <Logout />
    </div>
  );
};

export default Navigation;