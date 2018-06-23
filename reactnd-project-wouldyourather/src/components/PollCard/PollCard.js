import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PollResults from '../PollResults';
import './PollCard.css';
import locales from '../../locales/en-US';

/**
* @description the Poll card - is used in the poll summary, in the poll detail or in create a new poll section
* @constructor
* @param {object} poll - the current poll
* @param {string} answered - the user's answer to the poll
* @param {string} img - the avatar of the user
* @param {bool} pollDetail - is the poll in detail view
* @param {bool} isAnswered - did the user answer the poll
* @param {bool} createPoll - if the user creates a new poll - false means the poll already exists
* @param {func} submitPoll - submit the answer to the poll (new poll or answer to existing poll)
*/

class PollCard extends Component {
  state = {
    selected: '',
    option_A: '',
    option_B: '',
  };

  /**
  * @description set the class of the answer buttons depending of the type of poll card and the current state of the poll
  * @param {string} key - the poll id
  * @returns {string} the final class of the button
  */
  setTypeOfButton = key => {
    const { answered, pollDetail } = this.props;
    const { poll: poll_variables } = locales;
    const { selected } = this.state;
    let className = '';
    if (pollDetail) {
      if (answered) {
        className = 'answered';
        className = answered === poll_variables.options[key] ? 'answer answered' : 'answer';
      } else {
        className = selected === key ? ' button selected' : 'button';
      }
    } else {
      className = 'desactivated';
    }
    return className;
  };

  /**
  * @description sets the behavior of the answer button depending of the type of poll:
  * if the poll needs to be answered set the appropriate state, nothing otherwise
  * @param {string} key - the poll id
  */
  onButtonClick = key => {
    const { answered, pollDetail, isAnswered } = this.props;
    return answered || isAnswered || !pollDetail ?
    null :
    this.setState({selected : key});
  }

  /**
  * @description submit the results of the poll depending of the type of poll -
  * nothing happens if the poll is in the pollSummary
  */
  submitPoll = () => {
    const { poll: poll_variables } = locales;
    const { createPoll, submitPoll } = this.props;
    const { selected, option_A, option_B } = this.state;

    createPoll ?
      submitPoll({ optionOneText: option_A, optionTwoText: option_B }) :
      submitPoll(poll_variables.options[selected]);
  }

  /**
  * @description submit button creation
  */
  createSubmitButtons = () => {
    const { buttons } = locales;
    return (
    <div className="buttons">
      {
        Object.keys(buttons).map(key => (
          <button
            key={key}
            className={`button submit-poll ${key}`}
            onClick={() => key === 'submit' ?
              this.submitPoll() :
              this.props.submitPoll()}
          >
            {buttons[key]}
          </button>
        ))
      }
    </div>);
  }

  /**
  * @description set the inputted value in the state
  * @param {event} e - the event
  * @param {string} key - the option id
  */
  setInput = (e, key) => {
    let stateObj = {};
    stateObj[key] = e.target.value;
    this.setState(stateObj);
  }

  render() {
    const {poll, createPoll, pollDetail, answered, img, isAnswered} = this.props;
    const { poll: poll_variables, default_user } = locales;
    const options = Object.keys(poll_variables.options);

    return (
      <div className="poll-card">
        <div className="poll-title">
          { pollDetail && <img alt="avatar" src={`${img ? img : default_user.default_img_url}`} />}
          {poll_variables.question}
        </div>
        <div className="answers">
          {
            options.map((key, index) => (
              <div key={key}>
                <div className={`option ${key}`}>
                {
                  !createPoll ?
                    <button
                      className={this.setTypeOfButton(key)}
                      onClick={() => this.onButtonClick(key)}
                    >{poll[poll_variables.options[key]].text}</button> :
                    <div>
                      <span>{poll_variables.create[key]}</span>
                      <input className="input" onChange={e => this.setInput(e, key)}/>
                    </div>
                }
                </div>
                {
                  index < options.length-1 &&
                  <div className={poll_variables.or}><span>{poll_variables.or}</span></div>
                }
              </div>
            ))
          }
        </div>
        <div className="specificity">
        {
          pollDetail &&
          <div className="details">
            {
              answered ?
                <PollResults poll={poll} answered={answered}/> :
                this.createSubmitButtons()
            }
          </div>
        }
        { createPoll && this.createSubmitButtons() }
        {
          !createPoll && !pollDetail &&
          <Link
            className="link to-poll-detail"
            to={{pathname: `/question/${poll.id}`, state: {id: poll.id}}}>
            <span>
              {isAnswered && poll_variables.see_details}
              {!isAnswered && poll_variables.show_poll}
            </span>
          </Link>
        }
        </div>
      </div>
    );
  }
}

PollCard.propTypes = {
  poll: PropTypes.object,
  answered: PropTypes.string,
  isAnswered: PropTypes.bool,
  createPoll: PropTypes.bool,
  submitPoll: PropTypes.func,
  pollDetail: PropTypes.bool,
  img: PropTypes.string,
};

export default PollCard;
