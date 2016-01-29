import App from './../components/app';
import Inbox from './../components/inbox';
import About from './../components/about';
import Router, {Route} from 'react-router';
import React from 'react';

export default (
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox} />
    </Route>
  </Router>
)
