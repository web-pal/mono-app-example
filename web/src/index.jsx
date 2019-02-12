// @flow
import '@babel/polyfill';
import React from 'react';
import {
  render as reactRender,
} from 'react-dom';
import {
  Provider,
} from 'react-redux';

import type {
  ComponentType,
} from 'react';

import {
  BrowserRouter,
} from 'react-router-dom';

import store from './store';
import Base from './containers/Base';


const rootEl: HTMLElement = window.document.getElementById('root');

const render: Function = (Component: ComponentType<*>) => (
  reactRender(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    rootEl,
  )
);

render(Base);
