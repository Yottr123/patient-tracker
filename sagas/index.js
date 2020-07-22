import {all} from 'redux-saga/effects';
import {watchAuthActions} from './seperate/Auth';
import {watchPatientActions} from './seperate/Patients';

export default function* rootSaga() {
  yield all([watchAuthActions(), watchPatientActions()]);
}
