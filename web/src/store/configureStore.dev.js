import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware, {
  END,
} from 'redux-saga';
import {
  createLogger,
} from 'redux-logger';
import {
  rootReducer,
} from 'core';

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  sagaMiddleware,
  logger,
].filter(Boolean);

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
    ),
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}

export default configureStore;
