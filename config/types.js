// Auth
  // Login
  export const LOGIN_REQUEST = 'LOGIN_REQUEST';
  export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  export const LOGIN_ERROR = 'LOGIN_ERROR';

  // Logout
  export const LOGOUT = 'LOGOUT';

  // Signup
  export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
  export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
  export const SIGNUP_ERROR = 'SIGNUP_ERROR';

  // User Token
  export const SET_USER_TOKEN = 'SET_USER_TOKEN';
  export const CLEAR_USER_TOKEN = 'CLEAR_USER_TOKEN';

// Dashboard
  // Patients
    // Get Patients
    export const START_PATIENT_BACKGROUND_JOB = 'START_PATIENT_BACKGROUND_JOB';
    export const STOP_PATIENT_BACKGROUND_JOB = 'STOP_PATIENT_BACKGROUND_JOB';
    export const PATIENTS_REQUEST = 'PATIENTS_REQUEST';
    export const PATIENTS_SUCCESS = 'PATIENTS_SUCCESS';
    export const PATIENTS_ERROR = 'PATIENTS_ERROR';

    // Add Patient
    export const ADD_PATIENT_REQUEST = 'ADD_PATIENT_REQUEST';
    export const ADD_PATIENT_SUCCESS = 'ADD_PATIENT_SUCCESS';
    export const ADD_PATIENT_ERROR = 'ADD_PATIENT_ERROR';

    // Delete Patient
    export const DELETE_PATIENT_REQUEST = 'DELETE_PATIENT_REQUEST';
    export const DELETE_PATIENT_SUCCESS = 'DELETE_PATIENT_SUCCESS';
    export const DELETE_PATIENT_ERROR = 'DELETE_PATIENT_ERROR';

    // Update Patient
    export const UPDATE_PATIENT_REQUEST = 'UPDATE_PATIENT_REQUEST';
    export const UPDATE_PATIENT_SUCCESS = 'UPDATE_PATIENT_SUCCESS';
    export const UPDATE_PATIENT_ERROR = 'UPDATE_PATIENT_ERROR';