// @flow
import rR from './reducers';
import rS from './sagas';

export const rootReducer = rR;
export const rootSaga = rS;

// We cant export rootReducer from './reducers';
// We have to use such import because of flow
// https://github.com/facebook/flow/issues/940
