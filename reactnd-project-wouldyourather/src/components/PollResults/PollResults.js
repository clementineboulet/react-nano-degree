import React from 'react';
import PropTypes from 'prop-types';
import './PollResults.css';
import locales from '../../locales/en-US';

/**
* @description the Poll answers results component
* @constructor
* @param {object} poll - the current poll
* @param {string} answered - the user's answer to the poll
*/

const PollResults = ({poll, answered}) => {
  const { details, options } = locales.poll;
  const nbPeople = poll[answered].votes.length;
  let totalNbPeople = 0;
  Object.values(options).map(option => totalNbPeople += poll[option].votes.length);

  return (
    <div className="poll-results">
      <div className="title">Poll Details</div>
      <div className="statistics">
        <p><strong>{nbPeople}</strong>{nbPeople > 1 ? details.votedPlr : details.voted}</p>
        <p><strong>{100*nbPeople/totalNbPeople}</strong>{details.percentage}</p>
      </div>
    </div>
  );
};

PollResults.propTypes = {
  poll: PropTypes.object.isRequired,
  answered: PropTypes.string.isRequired,
};

export default PollResults;
