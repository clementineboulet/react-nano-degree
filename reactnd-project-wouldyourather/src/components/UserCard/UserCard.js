import React from 'react';
import PropTypes from 'prop-types';
import './UserCard.css';
import locales from '../../locales/en-US';

/**
* @description The user card component
* @constructor
* @param {object} user - the user
* @param {bool} isUser - if the user displayed is the current user
*/

const UserCard = ({user, isUser}) => {
  const { nb_asked, nb_answered } = locales.leaderBoard;
  const { default_user } = locales;

  return (
    <div className={`user-card${isUser ? ' is-user' : ''}`}>
      <div className="title"><img className="" src={`${user.avatarURL ? user.avatarURL : default_user.default_img_url}`} />{user.name}</div>
      <div className="statistics">
        <p>{nb_asked}<strong>{user.questions.length}</strong></p>
        <p>{nb_answered}<strong>{Object.keys(user.answers).length}</strong></p>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  isUser: PropTypes.bool,
};

export default UserCard;
