import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PollsPage.css';
import { getPolls, sendPollAnswer, createNewPoll } from '../../store/actions';
import PollCard from '../../components/PollCard';
import ErrorPage from '../ErrorPage';
import locales from '../../locales/en-US';

/**
* @description Polls Page - can be for poll creation or for poll details
* @constructor
* @param {object} user - the active user
* @param {object} polls - the polls list
* @param {object} location - the url route of the page
* @param {boolean} createPoll - if the poll is a type creation
* @param {func} getAllPolls - to get the poll list
* @param {func} sendAnswer - Send the poll answer to the back end
* @param {func} toCreatePoll - Create a new poll by sending params to the back end
*/

class PollsPage extends Component {
  state={
    id: '',
    redirect: false,
  }
  componentDidMount () {
    const { location, createPoll } = this.props;
    !createPoll && this.setState({
      id: location.pathname && location.pathname.match(/(\/(\w)+)/g)[1].replace(/\//g, '')
    });
  }

  /**
  * @description if the poll list exists and the current poll is in that list
  * @returns the poll detail of that poll
  * @description else make a new request to get the poll list
  */
  seePoll = () => {
    const { polls, user, getAllPolls, users } = this.props;
    const { id } = this.state;

    if (id && polls && polls[id]) {
      const answered = user.answers[id];
      const isAnswered = !!user.answers[id];
      return <PollCard
        poll={polls[id]}
        pollDetail
        answered={answered}
        isAnswered={isAnswered}
        img={users[polls[id].author].avatarURL}
        submitPoll={this.submitPoll}
      />;
    }

    id && !polls && getAllPolls();
  }

  /**
  * @description Create a new poll
  * @returns {JSX} JSX react component responsible for the display of the creation of a new poll 
  */
  createNewPoll = () => (<PollCard createPoll submitPoll={this.submitPoll}/>);

  /**
  * @description Submit a poll answer, or the new created poll to the back end
  * @param {object} answer - the answer to the poll in an object
  */
  submitPoll = (answer) => {
    const { createPoll, sendAnswer, user, toCreatePoll } = this.props;
    if (createPoll && answer) {
      toCreatePoll({
        author: user.id,
        optionOneText: answer.optionOneText,
        optionTwoText: answer.optionTwoText
      });
    } else if (answer) {
      sendAnswer({
        authedUser: user.id,
        qid: this.state.id,
        answer
      });
    }
    this.setState({redirect: true});
  }

  render() {
    const { createPoll, polls } = this.props;
    const { id, redirect } = this.state;
    const { poll: poll_variables } = locales;

    if (redirect) {
      return <Redirect to='/'/>;
    }

    if (id && polls && !polls[id]) {
      return <ErrorPage/>;
    }

    return (
      <div className="poll-page">
        <div className="title">
          {createPoll ? poll_variables.create.title : `${poll_variables.details.title}${id}`}
        </div>
        {createPoll ?
          this.createNewPoll() : this.seePoll()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.login.loggedInUser,
  users: state.login.allUsers,
  polls: state.polls.allPolls
});

const mapDispatchToProps = dispatch => ({
  getAllPolls: () => dispatch(getPolls()),
  sendAnswer: answer => dispatch(sendPollAnswer(answer)),
  toCreatePoll: poll => dispatch(createNewPoll(poll))
});

PollsPage.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  polls: PropTypes.object,
  getAllPolls: PropTypes.func.isRequired,
  sendAnswer: PropTypes.func.isRequired,
  toCreatePoll: PropTypes.func.isRequired,
  location: PropTypes.object,
  createPoll: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PollsPage));

