import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/index';
import rootSaga from './actions/index';


/* dev redux logger setting */
let log = [];
const initialState = {};
if(
  window.location &&
  window.location.host &&
  window.location.host.indexOf('localhost') !== -1){
  const { logger } = require("redux-logger");
  log.push(logger);
}
/* dev redux logger setting */

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(sagaMiddleware, ...log)
);
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
