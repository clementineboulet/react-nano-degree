import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import HomePage from './pages/HomePage';
import LeaderBoard from './pages/LeaderBoard';
import PollsPage from './pages/PollsPage';
import ErrorPage from './pages/ErrorPage';
import Login from './organisms/Login';
import Navigation from './organisms/Navigation';
import { getAllUsers } from './store/actions';

/**
* @description Represents a structure of the App with the different Routes
* @constructor
* @param {object} user - The logged in user
* @param {func} getUsers - to get all of the possible users
*/

class PollApp extends Component {
  render() {
    const { user } = this.props;
    return (
      <Router>
        <div className="app">
        {
          user ?
          <div className="authenticated">
            <Navigation/>
            <Switch>
              <Route
                exact
                path="/"
                component={HomePage}
              />
              <Route
                path="/add"
                render={() => (
                  <PollsPage
                    createPoll
                  />)}
              />
              <Route
                path="/question/:question_id"
                render={() => (
                  <PollsPage
                    seeDetails
                  />)}
              />
              <Route
                path="/leaderboard"
                component={LeaderBoard}
              />
              <Route
                component={ErrorPage}
              />
              </Switch>
            </div> :
            <Login/>
        }
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.loggedInUser,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getAllUsers())
});

PollApp.propTypes = {
  user: PropTypes.object,
  getUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PollApp);
