import { combineReducers } from 'redux';
import {
  LOG_IN,
  LOG_OUT,
  SET_USERS,
  SET_POLLS,
  ANSWER_SAVED,
  POLL_SAVED,
  REFRESH_USER,
  LOADING,
  LOADED,
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

const refreshUser = (store) => {
  const userId = store.loggedInUser.id;
  return Object.assign({}, store, {loggedInUser: store.allUsers[userId]});
};

function login(store = initLoginstore, action) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, store, {loggedInUser: action.user});
    case LOG_OUT:
      return Object.assign({}, store, {loggedInUser: null});
    case SET_USERS:
      return Object.assign({}, store, {allUsers: action.allUsers});
    case REFRESH_USER:
      return refreshUser(store);
    default:
      return store;
  }
}

function polls(store = {}, action) {
  switch (action.type) {
    case SET_POLLS:
      return Object.assign({}, store, {allPolls: action.questions, update: false});
    case ANSWER_SAVED:
    case POLL_SAVED :
      return Object.assign({}, store, {update: true});
    default:
      return store;
  }
}

function loading(store = {}, action) {
  switch (action.type) {
    case LOADING:
      return Object.assign({}, store, {loading: true});
    case LOADED:
      return Object.assign({}, store, {loading: false});
    default:
      return store;
  }
}

export default combineReducers({
  login,
  polls,
  loading,
});
