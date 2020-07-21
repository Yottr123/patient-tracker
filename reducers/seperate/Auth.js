import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SET_USER_TOKEN,
  CLEAR_USER_TOKEN
} from '../../config/types';

const INITIAL_STATE = {
  userToken: null,
  loading: {
    login: false,
    signup: false
  }
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, { loading: { login: true } });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        userToken: action.token,
        loading: { login: false },
      });

    case LOGIN_ERROR:
      return Object.assign({}, state, { loading: { login: false } });

    case SIGNUP_REQUEST:
      return Object.assign({}, state, { loading: { signup: true } });

    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        loading: { signup: false },
      });

    case SIGNUP_ERROR:
      return Object.assign({}, state, { loading: { signup: false } });

    case SET_USER_TOKEN:
      return Object.assign({}, state, { userToken: action.token });

    case CLEAR_USER_TOKEN:
      return Object.assign({}, state, { userToken: null });

    default: {
      return state;
    }
  }
};