import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './LeaderBoard.css';
import UserCard from '../../components/UserCard';
import locales from '../../locales/en-US';

/**
* @description Leaderboard Page
* @constructor
* @param {object} user - the active user
* @param {object} users - the users list
*/

const LeaderBoard = ({users, user}) => {
  const id = user.id;
  const reorderedUsers = [];
  Object.keys(users).map(someUserKey => {
    const thisUser = users[someUserKey];
    const points = thisUser.questions.length + Object.keys(thisUser.answers).length;
    reorderedUsers.push({key: someUserKey, value: points});
  });
  reorderedUsers.sort((userA, userB) => (userB.value - userA.value));

  return (
    <div className="leaderBoard">
      <div className="greetings">
        {locales.leaderBoard.title}
      </div>
      <div className="user-cards">{
        reorderedUsers.map(({key: someUserKey}) => (
          <UserCard key={someUserKey} user={users[someUserKey]} isUser={someUserKey === id} />
        ))
      }
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  user: state.login.loggedInUser,
  users: state.login.allUsers,
});

LeaderBoard.propTypes = {
  users: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withRouter(LeaderBoard));
