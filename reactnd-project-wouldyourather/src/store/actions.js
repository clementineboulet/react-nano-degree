import { _getUsers, _getQuestions } from '../api_data/_DATA';

/*LOGIN ACTIONS*/
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const SET_USERS = 'SET_USERS';

/*POLLS ACTIONS*/
export const SET_POLLS = 'SET_POLLS'; 

/* action creators */

/*LOGIN ACTION CREATORS*/
export const setAllUsers = allUsers => ({ type: SET_USERS, allUsers });
export const logIn = user => ({ type: LOG_IN, user });
export const logOut = () => ({ type: LOG_OUT });


export const getAllUsers = () => dispatch => {
  _getUsers().then(allUsers => {
    dispatch(setAllUsers(allUsers));
  });
};

/*POLLS ACTION CREATORS*/
export const setPolls = questions => ({ type: SET_POLLS, questions });

export const getPolls = () => dispatch => {
  _getQuestions().then(questions => {
    dispatch(setPolls(questions));
  });
};
