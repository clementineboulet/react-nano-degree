import React from 'react';
import './PollSummary.css';
import PollCard from '../PollCard';
import locales from '../../locales/en-US';

/**
* @description Error Page
* @constructor
*/

const PollSummary = ({polls, answeredPollId}) => {
  const {homepage} = locales;
  const pollsList = polls ? Object.values(polls) : [];

  const filterFunction = ({result, key}) => {
    if(key === 'answered') {
      return result;
    }
    return !result;
  };

  return (
    <div className="summary">
      {
        Object.keys(homepage.poll_tab).map(key => (
          <div key={key} className={key}>
            <div className="title">
              {homepage.poll_tab[key]}
            </div>
            <div className="results">
              {
                pollsList
                  .filter(poll => (filterFunction({result: answeredPollId.includes(poll.id), key})))
                  .map(poll => (
                    <PollCard key={poll.id} poll={poll}/>
                  ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default PollSummary;
