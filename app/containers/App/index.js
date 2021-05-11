/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/';

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Demo App" defaultTitle="Demo App">
        <meta name="description" content="A Demo App application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}
