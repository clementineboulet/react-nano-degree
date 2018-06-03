import { combineReducers } from 'redux';
import {
  LOG_IN,
  LOG_OUT,
  SET_USERS,
  SET_POLLS
} from './actions';

// {
//   const promise = _getUsers();
//   return promise.then(allUsers => {
//     console.log(allUsers);
//     return store.mergeDeep({allUsers});
//   });
// }

const initLoginstore = {
  allUsers: {}
};

function login(store = initLoginstore, action) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, store, {loggedInUser: action.user});
    case LOG_OUT:
      return Object.assign({}, store, {loggedInUser: null});
    case SET_USERS:
      return Object.assign({}, store, {allUsers: action.allUsers});
    default:
      return store;
  }
}

function polls(store = {}, action) {
  switch (action.type) {
    case SET_POLLS:
      return Object.assign({}, store, {allPolls: action.questions});
    default:
      return store;
  }
}

export default combineReducers({
  login,
  polls
});
