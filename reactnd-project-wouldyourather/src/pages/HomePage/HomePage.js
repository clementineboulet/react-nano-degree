import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.css';
import { updatePollResults, getPolls } from '../../store/actions';
import locales from '../../locales/en-US';
import PollSummary from '../../components/PollSummary/PollSummary';

/**
* @description Main Page Skeleton
* @constructor
* @param {object} user - the active user
*/

class HomePage extends Component {
  state = {
    updated: false
  }
  componentDidMount() {
    this.props.getPollCards();
  }

  componentDidUpdate () {
    const { update, updateResults } = this.props;
    const { updated } = this.state;
    if (update && !updated) {
      updateResults();
      this.setState({updated: true});
      console.log('update', 'getPollCards');
    }

    if (!update && updated){
      this.setState({updated: false});
      console.log('!update', 'updated');
    }
  }

  render() {
    const { user, polls, update } = this.props;
    const { homepage } = locales;
    console.log('home user', user);
    return (
      <div className="home">
        <div className="greetings">
          {`${homepage.greetings} ${user.name}!`}
        </div>
        <div className="pollSummary">
          <PollSummary resetResults={update && !this.state.updated} polls={polls} answeredPollId={Object.keys(user.answers)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.loggedInUser,
  polls: state.polls.allPolls,
  update: state.polls.update
});

const mapDispatchToProps = dispatch => ({
  getPollCards: () => dispatch(getPolls()),
  updateResults: () => dispatch(updatePollResults())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
