// @flow
import React, {
  type Node, type StatelessFunctionalComponent,
} from 'react';

import {
  hot,
} from 'react-hot-loader';

import ExampleContainer from 'web-containers/ExampleContainer';
import ProductsTableContainer from 'web-containers/ProductsTableContainer';

import {
  Route, Router, Switch,
} from 'react-router';

import createHistory from 'history/createBrowserHistory';
import HomeComponent from 'web-components/HomeComponent';
import ErrorComponent from 'web-components/ErrorComponent';


const browserHistory = createHistory();


const Base: StatelessFunctionalComponent<*> = (): Node => (
  <div>
    <Router history={browserHistory}>
      <Switch>
        <Route
          path="/"
          component={HomeComponent}
          exact
        />
        <Route
          path="/products"
          render={() => <ProductsTableContainer browserHistory={browserHistory} />}
        />
        <Route
          path="/generator"
          render={() => <ExampleContainer browserHistory={browserHistory} />}
        />
        <Route component={ErrorComponent} />
      </Switch>
    </Router>
  </div>
);

export default hot(module)(Base);
