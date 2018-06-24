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
  const { details, options, reverse_options, create } = locales.poll;
  let totalNbPeople = 0;
  Object.values(options).map(option => totalNbPeople += poll[option].votes.length);

  return (
    <div className="poll-results">
      <div className="title">Poll Details</div>
      <div className="statistics">
      {
        Object.values(options).map(option => {
          const nbPeople = poll[option].votes.length;
          return (
            <div key={option} className={answered === option ? 'answered-option' : ''}>
              <p className="title">{create[reverse_options[option]]}</p>
              <p><strong>{nbPeople}</strong>{nbPeople > 1 ? details.votedPlr : details.voted}</p>
              <p><strong>{(100*nbPeople/totalNbPeople).toFixed(0)}</strong>{details.percentage}</p>
            </div>
          );
        })
      }
      </div>
    </div>
  );
};

PollResults.propTypes = {
  poll: PropTypes.object.isRequired,
  answered: PropTypes.string.isRequired,
};

export default PollResults;
