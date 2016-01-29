import App from './../components/app';
import Inbox from './../components/inbox';
import About from './../components/about';
import Router, { hashHistory, Route } from 'react-router';
import React from 'react';

export default function(props){
  class AppWrapper extends React.Component {
    render() { return <App {...props} children={this.props.children}/> }
  }

  return (
    <Router history={hashHistory}>
      <Route path="/" component={AppWrapper} >
        <Route path="about" component={About} />
        <Route path="inbox" component={Inbox} />
      </Route>
    </Router>
  )
}
