import {
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
} from '../../config/types';

const INITIAL_STATE = {
  patients: [],
  loading: {
    patients: false,
    addPatient: false,
    updatePatient: false,
    deletePatient: false
  }
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PATIENTS_REQUEST:
      return Object.assign({}, state, { loading: { patients: true }} );

    case PATIENTS_SUCCESS:
      return Object.assign({}, state, {
        patients: action.patients,
        loading: { patients: false },
      });

    case PATIENTS_ERROR:
      return Object.assign({}, state, { loading: { patients: false } });

    case ADD_PATIENT_REQUEST:
      return Object.assign({}, state, { loading: { addPatient: true } });

    case ADD_PATIENT_SUCCESS:
      return Object.assign({}, state, {
        loading: { addPatient: false },
      });

    case ADD_PATIENT_ERROR:
      return Object.assign({}, state, { loading: { addPatient: false } } );

    case DELETE_PATIENT_REQUEST:
      return Object.assign({}, state, { loading: { deletePatient: true } });

    case DELETE_PATIENT_SUCCESS:
      return Object.assign({}, state, { loading: { deletePatient: false } });

    case DELETE_PATIENT_ERROR:
      return Object.assign({}, state, { loading: { deletePatient: false } });

    case UPDATE_PATIENT_REQUEST:
      return Object.assign({}, state, { loading: { updatePatient: true } });

    case UPDATE_PATIENT_SUCCESS:
      return Object.assign({}, state, {
        loading: { updatePatient: false },
      });

    case UPDATE_PATIENT_ERROR:
      return Object.assign({}, state, {loading: { updatePatient: false } });

    default: {
      return state;
    }
  }
};