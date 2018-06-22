import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PollSummary.css';
import PollCard from '../PollCard';
import locales from '../../locales/en-US';

/**
* @description Error Page
* @constructor
*/

class PollSummary extends Component {
  state={
    results: {},
    selected: ''
  };

  componentDidMount () {
    this.setState({selected: locales.homepage.default});
  }

  componentDidUpdate ({polls: prev_polls, answeredPollId : prev_answeredPollId}) {
    const {homepage} = locales;
    const { polls, answeredPollId, resetResults } = this.props;
    const pollsList = polls ? Object.values(polls) : [];
    if (pollsList.length &&
      (!prev_polls ||
        !Object.values(this.state.results).length ||
        Object.values(prev_polls).length !== pollsList.length ||
        answeredPollId.length !== prev_answeredPollId.length)) {
      const results = {};
      Object.keys(homepage.poll_tab).map(key => (
        results[key] = pollsList
          .filter(poll => (
            this.filterFunction({result: answeredPollId.includes(poll.id), key})
          ))
      ));
      this.setState({results});
    }

    if (resetResults && Object.values(this.state.results).length) {
      this.setState({results: {}});
    }
  }

  filterFunction = ({result, key}) => {
    if(key === 'answered') {
      return result;
    }
    return !result;
  };

  setSelected = (selected) => {
    this.setState({selected});
  }

  showSelected = (key) => (key === this.state.selected ? ' show' :'');

  render() {
    const { results } = this.state;
    const {homepage} = locales;

    return (
      <div className="summary">
        <div className="poll-tab">
          <div className="title">{
            Object.keys(homepage.poll_tab).map(key => (
              <div
                key={key}
                className={`${key}${this.showSelected(key)}`}
                onClick={() => this.setSelected(key)}
              >
                {homepage.poll_tab[key]}
              </div>
            ))
          }</div>
          <div className="results">{
            Object.keys(results).map(key => (
              <div
                key={key}
                className={`${key} poll-list${this.showSelected(key)}`}
              >
                {
                  results[key]
                    .sort((a, b) => (b.timestamp - a.timestamp))
                    .map(poll => (
                      <PollCard key={poll.id} poll={poll} answered={this.filterFunction({result: true, key})}/>
                    ))
                }
              </div>
            ))
          }</div>
        </div>
      </div>
    );
  }
}

PollSummary.propTypes = {
  polls: PropTypes.object.isRequired,
  answeredPollId: PropTypes.string.isRequired,
  resetResults: PropTypes.bool
};

export default PollSummary;
