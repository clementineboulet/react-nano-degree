import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Logout.css';
import { logOut } from '../../store/actions';
import locales from '../../locales/en-US';


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

export default connect(mapStateToProps, mapDispatchToProps)(Logout);