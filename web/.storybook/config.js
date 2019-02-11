import '@babel/polyfill';
import React from 'react';
import {
  Provider,
} from 'react-redux';

import {
  configure,
  addDecorator,
} from '@storybook/react';

import store from '../src/store';


function loadStories() {
  require('../stories/randomGenerateButton');
  require('../stories/dataTable');
  require('../stories/imageGallery');
  // You can require as many stories as you need.
}


addDecorator((render) =>
  <Provider store={store}>
    {render()}
  </Provider>
);

configure(loadStories, module);
