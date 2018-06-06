import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import './PollsPage.css';
import { getPolls, sendPollAnswer, createNewPoll } from '../../store/actions';
import PollCard from '../../components/PollCard';
import locales from '../../locales/en-US';

/**
* @description Error Page
* @constructor
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

  seePoll = () => {
    const { polls, user, getAllPolls } = this.props;
    const { id } = this.state;
    console.log('polls', polls);
    if (id && polls && polls[id]) {
      const answered = user.answers[id] || false;
      return <PollCard poll={polls[id]} pollDetail answered={answered} img={user.avatar} submitPoll={this.submitPoll}/>;
    }

    id && getAllPolls();
    return null;
  }

  createNewPoll = () => (<PollCard createPoll submitPoll={this.submitPoll}/>);

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
    const { createPoll } = this.props;
    const { id, redirect } = this.state;
    const { poll: poll_variables } = locales;

    if (redirect) {
      return <Redirect to='/'/>;
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
  polls: state.polls.allPolls
});

const mapDispatchToProps = dispatch => ({
  getAllPolls: () => dispatch(getPolls()),
  sendAnswer: answer => dispatch(sendPollAnswer(answer)),
  toCreatePoll: poll => dispatch(createNewPoll(poll))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PollsPage));

