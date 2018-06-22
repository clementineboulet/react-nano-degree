import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PollResults from '../PollResults';
import './PollCard.css';
import locales from '../../locales/en-US';

/**
* @description Error Page
* @constructor
*/

class PollCard extends Component {
  state = {
    selected: '',
    option_A: '',
    option_B: '',
  };

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

  onButtonClick = key => {
    const { answered, pollDetail } = this.props;
    return answered || !pollDetail ?
    null :
    this.setState({selected : key});
  }

  submitPoll = () => {
    const { poll: poll_variables } = locales;
    const { createPoll, submitPoll } = this.props;
    const { selected, option_A, option_B } = this.state;

    createPoll ?
      submitPoll({ optionOneText: option_A, optionTwoText: option_B }) :
      submitPoll(poll_variables.options[selected]);
  }

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

  setInput = (e, key) => {
    let stateObj = {};
    stateObj[key] = e.target.value;
    this.setState(stateObj);
  }

  render() {
    const {poll, createPoll, pollDetail, answered, img} = this.props;
    const { poll: poll_variables, default_user } = locales;
    const options = Object.keys(poll_variables.options);

    return (
      <div className="poll-card">
        <div className="poll-title">
          { pollDetail && <img className="" src={`${img ? img : default_user.default_img_url}`} />}
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
              {answered && poll_variables.see_details}
              {!answered && poll_variables.show_poll}
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
  createPoll: PropTypes.bool,
  submitPoll: PropTypes.func,
  pollDetail: PropTypes.object,
  img: PropTypes.string,
};

export default PollCard;
