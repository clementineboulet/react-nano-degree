import React from 'react';
import locales from '../../locales/en-US';

/**
* @description Error Page
* @constructor
*/

const PollCard = ({poll}) => {
  const { poll: poll_variables } = locales;
  return (
    <div className="poll-card">
      <div className="poll-title">
        {poll_variables.question}
      </div>
      <div className="answers">
        <div className="option">
          <span>{poll.optionOne.text}</span>
        </div>
        <div className="option">
        <span>{poll.optionTwo.text}</span>
        </div>
      </div>
    </div>
  );
};

export default PollCard;
