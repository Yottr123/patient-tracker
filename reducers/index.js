
import {combineReducers} from 'redux';
import Auth from './seperate/Auth';
import Patients from './seperate/Patients';

export default combineReducers({
  Auth,
  Patients
});