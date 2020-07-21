
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(saga);


export {store};