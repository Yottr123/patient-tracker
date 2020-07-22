import {
  put,
  cancel,
  takeLatest,
  take,
  call,
  race,
  fork,
  delay,
  select
} from 'redux-saga/effects';
import {
  START_PATIENT_BACKGROUND_JOB,
  STOP_PATIENT_BACKGROUND_JOB,
  ADD_PATIENT_REQUEST,
  DELETE_PATIENT_REQUEST,
  UPDATE_PATIENT_REQUEST,
} from '../../config/types';
//import {firebase} from '../../config/firebase';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {
  addPatientSuccess,
  addPatientError,
  patientsRequest,
  patientsSuccess,
  patientsError,
  deletePatientSuccess,
  deletePatientError,
  updatePatientSuccess,
  updatePatientError,
} from '../../actions/Patients';
import moment from 'moment';
import {eventChannel} from 'redux-saga';

// Patient background job
const createEventChannel = () => {
  const listener = eventChannel((emit) => {
    let userId = auth().currentUser.uid;

    console.log("DOCTOR ID", userId);

    database()
      .ref(`users/${userId}/patients`)
      //.child('doctor').equalTo("Gg9k61o71lPjMcmzDQ8hEnNcfMm2")
      .on('value', data => {
        //let userId = auth().currentUser.uid;

        console.log("FB", data.val(), userId);

        let allPatients = data.val();
        let patients = [];

        if(!allPatients){
          emit(patients);
          return;
        }

        for (let [id, patient] of Object.entries(allPatients)) {
          //if (patient.doctor === userId) {
            //console.log(id, patient)
            patients = [{...patient, id}, ...patients];
          //}
        }

        emit(patients);
      });
    return () => database().ref(`users/${userId}/patients`).off('value');
  });

  return listener;
};

function* patientBackgroundJob() {
  console.log('IN BACKGROUND JOB');
  let res;
  let channel;
  try {
    channel = createEventChannel();

    while (true) {
      try {
        res = yield take(channel);
        yield put(patientsSuccess(res));
      } catch (e) {
        console.log("PATIENTS ERROR", e)
        yield put(patientsError());
      }
    }
  } catch (e) {
    yield put(patientsError());
  } finally {
    yield put(patientsError());
    if (channel) {
      channel.close();
    }
  }
}

function* watchPatientBackgroundJob() {
  while (yield take(START_PATIENT_BACKGROUND_JOB)) {
    yield put(patientsRequest());
    const backgroundTask = yield fork(patientBackgroundJob);

    yield take(STOP_PATIENT_BACKGROUND_JOB);

    yield cancel(backgroundTask);
  }
}

// Add patient
function* addPatient(action) {
  console.log('ADD PATIENT SAGA');
  let res;
  try {
    let doctor = yield auth().currentUser.uid;
    //OR
    //let doctor = yield select(state => state.Auth.userToken);

    res = yield database()
      .ref(`users/${doctor}/patients`)
      .push({
        ...action.body,
        //doctor,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
      });

    console.log('ADD PATIENT RESPONSE', res);

    yield put(addPatientSuccess());
    alert('Patient added');

    if(action.cb)
      action.cb();
  } catch (e) {
    alert(e.message ? e.message : 'Error');
    console.log('ADD PATIENT ERROR');
    yield put(addPatientError());
  }
}

// Delete patient
function* deletePatient(action) {
  console.log('DELETE PATIENT SAGA', res);
  let res;
  try {
    let doctor = yield auth().currentUser.uid;

    res = yield database().ref(`users/${doctor}/patients/${action.id}`).remove();
    console.log('DELETE PATIENT RESPONSE', res);

    yield put(deletePatientSuccess());
    alert('Patient deleted');

    if(action.cb)
      action.cb();
  } catch (e) {
    console.log('DELETE PATIENT ERROR', e);
    alert(e.message ? e.message : 'Error');
    yield put(deletePatientError());
  }
}

// Update patient
function* updatePatient(action) {
  console.log('UPDATE PATIENT SAGA', action);
  let res;
  try {
    let {id, ...rest} = action.body;

    let doctor = yield auth().currentUser.uid;

    res = yield database().ref(`users/${doctor}/patients/${id}`).update(rest);
    console.log('UPDATE PATIENT RESPONSE', res, `users/${doctor}/patients/${id}`);

    yield put(updatePatientSuccess());
    alert('Patient updated');

    if(action.cb)
      action.cb();
  } catch (e) {
    console.log('UPDATE PATIENT ERROR', e);
    yield put(updatePatientError());
  }
}

export function* watchPatientActions() {
  yield fork(watchPatientBackgroundJob);
  yield takeLatest(ADD_PATIENT_REQUEST, addPatient);
  yield takeLatest(DELETE_PATIENT_REQUEST, deletePatient);
  yield takeLatest(UPDATE_PATIENT_REQUEST, updatePatient);
}
