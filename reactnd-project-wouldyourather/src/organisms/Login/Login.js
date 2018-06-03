import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn, getAllUsers } from '../../store/actions';
import './Login.css';
import locales from '../../locales/en-US';

class Login extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users, userLogIn } = this.props;
    const { login, default_user } = locales;

    return(
      <div className="login">
        <div className="header">{login.login_request}
        </div>
        <div className="user-list">
          {
            users && Object.values(users).length && Object.values(users).map(user => (
              <button
                className="user to-connect"
                key={user.id}
                onClick={() => userLogIn(user)}>
                <img src={user.avatarURL || default_user.default_img_url}/>
                <span>{user.name || default_user.default_name}</span>
              </button>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.login.allUsers,
});

const mapDispatchToProps = dispatch => ({
  userLogIn: user => dispatch(logIn(user)),
  getUsers: () => dispatch(getAllUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);