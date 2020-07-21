import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SET_USER_TOKEN,
  CLEAR_USER_TOKEN,
} from '../config/types';


export const loginRequest = (email, password) => {
  return {
    type: LOGIN_REQUEST,
    email,
    password,
  };
};

export const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    token,
  };
};

export const loginError = () => {
  return {
    type: LOGIN_ERROR,
  };
};


export const logout = () => {
  return {
    type: LOGOUT,
  };
};


export const signUpRequest = (name, email, password, cb) => {
  return {
    type: SIGNUP_REQUEST,
    name,
    email,
    password,
    cb
  };
};

export const signUpSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};

export const signUpError = () => {
  return {
    type: SIGNUP_ERROR,
  };
};


export const setUserToken = (token) => {
  return {
    type: SET_USER_TOKEN,
    token,
  };
};

export const clearUserToken = () => {
  return {
    type: CLEAR_USER_TOKEN,
  };
};