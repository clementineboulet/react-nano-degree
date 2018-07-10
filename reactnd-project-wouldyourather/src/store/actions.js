import { _getUsers, _getQuestions, _saveQuestionAnswer, _saveQuestion } from '../api_data/_DATA';

/*LOGIN ACTIONS*/
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const SET_USERS = 'SET_USERS';
export const REFRESH_USER = 'REFRESH_USER';

/*POLLS ACTIONS*/
export const SET_POLLS = 'SET_POLLS';
export const ANSWER_SAVED = 'ANSWER_SAVED';
export const POLL_SAVED = 'POLL_SAVED';

/*LOADING ACTION */
export const LOADING = 'LOADING';
export const LOADED = 'LOADED';

/* action creators */

/*LOGIN ACTION CREATORS*/
export const setAllUsers = allUsers => ({ type: SET_USERS, allUsers });
export const logIn = user => ({ type: LOG_IN, user });
export const logOut = () => ({ type: LOG_OUT });
export const refreshUser = () => ({ type: REFRESH_USER });


export const getAllUsers = () => dispatch => {
  dispatch(loading());
  return _getUsers().then(allUsers => {
    dispatch(setAllUsers(allUsers));
    dispatch(loaded());
  });
};

/*POLLS ACTION CREATORS*/
export const setPolls = questions => ({ type: SET_POLLS, questions });
export const answerSaved = saved => ({ type: ANSWER_SAVED, saved });
export const pollSaved = saved => ({ type: POLL_SAVED, saved });


export const getPolls = () => dispatch => {
  dispatch(loading());
  _getQuestions().then(questions => {
    dispatch(setPolls(questions));
    dispatch(loaded());
  });
};

export const sendPollAnswer = answer => dispatch => (
  _saveQuestionAnswer(answer).then(saved => {
    dispatch(answerSaved(saved));
  })
);

export const createNewPoll = poll => dispatch => (
  _saveQuestion(poll).then(saved => {
    dispatch(pollSaved(saved));
  })
);

export const updatePollResults = () => dispatch => {
  dispatch(getPolls());
  dispatch(getAllUsers()).then(() =>
    dispatch(refreshUser())
  );
};

/*LOADING ACTION CREATORS*/
export const loading = () => ({ type: LOADING });
export const loaded = () => ({ type: LOADED });

