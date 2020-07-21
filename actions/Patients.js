import {
  START_PATIENT_BACKGROUND_JOB,
  STOP_PATIENT_BACKGROUND_JOB,
  PATIENTS_REQUEST,
  PATIENTS_SUCCESS,
  PATIENTS_ERROR,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_ERROR,
  DELETE_PATIENT_REQUEST,
  DELETE_PATIENT_SUCCESS,
  DELETE_PATIENT_ERROR,
  UPDATE_PATIENT_REQUEST,
  UPDATE_PATIENT_SUCCESS,
  UPDATE_PATIENT_ERROR,
} from '../config/Types';


export const startPatientBackgroundJob = () => {
  return {
    type: START_PATIENT_BACKGROUND_JOB,
  };
};

export const stopPatientBackgroundJob = () => {
  return {
    type: STOP_PATIENT_BACKGROUND_JOB,
  };
};


export const getPatientRequest = () => {
  return {
    type: PATIENTS_REQUEST,
  };
};

export const getPatientSuccess = (patients) => {
  return {
    type: PATIENTS_SUCCESS,
    patients,
  };
};

export const getPatientError = () => {
  return {
    type: PATIENTS_ERROR,
  };
};


export const addPatientRequest = (body) => {
  return {
    type: ADD_PATIENT_REQUEST,
    body,
  };
};

export const addPatientSuccess = () => {
  return {
    type: ADD_PATIENT_SUCCESS,
  };
};

export const addPatientError = () => {
  return {
    type: ADD_PATIENT_ERROR,
  };
};


export const deletePatientRequest = (doctorId) => {
  return {
    type: DELETE_PATIENT_REQUEST,
    doctorId,
  };
};

export const deletePatientSuccess = () => {
  return {
    type: DELETE_PATIENT_SUCCESS,
  };
};

export const deletePatientError = () => {
  return {
    type: DELETE_PATIENT_ERROR,
  };
};


export const updatePatientRequest = (body) => {
  return {
    type: UPDATE_PATIENT_REQUEST,
    body,
  };
};

export const updatePatientSuccess = () => {
  return {
    type: UPDATE_PATIENT_SUCCESS,
  };
};

export const updatePatientError = () => {
  return {
    type: UPDATE_PATIENT_ERROR,
  };
};
