import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Logout.css';
import { logOut } from '../../store/actions';
import locales from '../../locales/en-US';

/**
* @description Log out organism
* @constructor
* @param {object} user - the active user
* @param {func} userLogOut - to log out
*/

const Logout = ({
  user, userLogOut
}) => {
  const { default_user, logout } = locales;
  return (
    <div className="logout">
        <img src={user.avatarURL || default_user.default_img_url}/>
        <span>{user.name || default_user.default_name}</span>
        <button
          className="user to-disconnect"
          key={user.id}
          onClick={() => userLogOut(user)}
        >
          {logout.logout_request}
        </button>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.login.loggedInUser,
});

const mapDispatchToProps = dispatch => ({
  userLogOut: () => dispatch(logOut()),
});

Logout.propTypes = {
  user: PropTypes.object.isRequired,
  userLogOut: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);