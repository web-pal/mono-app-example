import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import {
  rootReducer,
} from 'core';

// const sagaMiddleware = createSagaMiddleware();
const middleware = [
  //  sagaMiddleware,
].filter(Boolean);

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
  );

  // store.close = () => store.dispatch(END);
  return store;
}

export default configureStore;
