import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './HomePage.css';
import { updatePollResults, getPolls } from '../../store/actions';
import locales from '../../locales/en-US';
import PollSummary from '../../components/PollSummary/PollSummary';

/**
* @description Main Page Skeleton
* @constructor
* @param {object} user - the active user
* @param {object} polls - the poll list
* @param {boolean} update - if the poll list needs to be updated
* @param {func} getPollCards - to get the poll list
* @param {func} updateResults - refresh the users details and the poll list
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
    }

    if (!update && updated){
      this.setState({updated: false});
    }
  }

  render() {
    const { user, polls, update } = this.props;
    const { homepage } = locales;

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

HomePage.propTypes = {
  user: PropTypes.object.isRequired,
  polls: PropTypes.object,
  update: PropTypes.bool,
  getPollCards: PropTypes.func.isRequired,
  updateResults: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
