import {put, takeLatest, call} from 'redux-saga/effects';
import {firebase} from '../../config/firebase';
import {AsyncStorage, ToastAndroid} from 'react-native';
import {
  LOGIN_REQUEST,
  LOGOUT,
  SIGNUP_REQUEST,
  //SET_USER_TOKEN,
  //REMOVE_USER_TOKEN,
} from '../../config/types';
import {
  loginSuccess,
  loginError,
  signUpSuccess,
  signUpError,
  setUserToken,
} from '../../actions/Auth';

// Login
function* login(action) {
  let res;
  console.log("IN LOGIN SAGA", action)
  try {
    res = yield firebase.auth().signInWithEmailAndPassword(action.email, action.password);
    console.log("FIREBASE LOGIN RESPONSE", res);
    yield AsyncStorage.setItem('userToken', JSON.stringify(res.user));
    yield put(loginSuccess(res.user));
  } catch (e) {
    yield put(loginError())
    alert(e);
  }
}


// Logout
function* logout() {
  try {
    yield firebase.auth().signOut();
    yield AsyncStorage.removeItem('userToken');
    yield put(setUserToken(null));
  } catch (e) {
    console.log('logOutSaga',e);
  }
}


// Signup
function* signUpSaga(action) {
  let res;
  // let userAdd;
  console.log('IN SIGNUP SAGA', action);

  try {
    res = yield firebase
      .auth()
      .createUserWithEmailAndPassword(action.email, action.password);
    // console.log('Sign up Saga', res.user.uid);

    let user = {
      name: action.name,
      email: action.email,
      password: action.password,
      uid: res.user.uid,
    };

    console.log('IN SIGNUP SAGA', res);

    res = yield firebase
      .database()
      .ref(`users/${user.uid}`)
      // .child()
      .set(user);

    console.log('IN SIGNUP SAGA', res);
    //yield put(setUser(userObj));
    alert("User created")
    yield put(signUpSuccess());

    if(action.cb)
      action.cb();
  } catch (e) {
    console.log("SIGNUP ERROR", e)
    yield put(signUpError())
    alert(e.message ? e.message : "Error");
    //ToastAndroid.show(e.message ? e.message : "Error", ToastAndroid.SHORT);
  }
}


export function* watchAuthActions() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(SIGNUP_REQUEST, signUpSaga);
}