import {
  rootSaga,
} from 'core';

import configureStore from './configureStore';


const store = configureStore();

export const sagaTask = store.runSaga(rootSaga);
export default store;
