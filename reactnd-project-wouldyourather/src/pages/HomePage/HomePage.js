import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.css';
import { getPolls } from '../../store/actions';
import locales from '../../locales/en-US';
import PollSummary from '../../components/PollSummary/PollSummary';

/**
* @description Main Page Skeleton
* @constructor
* @param {object} user - the active user
*/

class HomePage extends Component {
  componentDidMount() {
    this.props.getPollCards();
  }

  render() {
    const { user, polls } = this.props;
    const { homepage } = locales;
    return (
      <div className="home">
        <div className="greetings">
          {`${homepage.greetings} ${user.name}!`}
        </div>
        <div className="pollSummary">
          <PollSummary polls={polls} answeredPollId={Object.keys(user.answers)}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.loggedInUser,
  polls: state.polls.allPolls
});

const mapDispatchToProps = dispatch => ({
  getPollCards: () => dispatch(getPolls())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
