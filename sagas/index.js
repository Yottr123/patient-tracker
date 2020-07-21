import {all} from 'redux-saga/effects';
import {watchAuthActions} from './seperate/Auth';
//import {watchPatientSagas} from './Patient';

export default function* rootSaga() {
  yield all([watchAuthActions()]);
}
