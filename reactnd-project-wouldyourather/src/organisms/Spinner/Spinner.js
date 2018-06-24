import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Spinner.css';

/**
* @description The Spinner component
* @constructor
*/

const Spinner = ({loading, children}) => (
  <div className={`${loading ? 'container' : ''}`}>
  {
    loading ?
    <div className="spinner"/>
    : children
  }
  </div>
);

const mapStateToProps = state => ({
  loading: state.loading.loading,
});

Spinner.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node,
};

export default connect(mapStateToProps)(Spinner);
