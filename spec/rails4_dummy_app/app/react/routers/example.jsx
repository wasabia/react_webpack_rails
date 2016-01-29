import App from './../components/app';
import Inbox from './../components/inbox';
import About from './../components/about';
import Router, { Route } from 'react-router';
import React from 'react';

export default function(props){
  class AppWrapper extends React.Component {
    render() { return <App {...props} children={this.props.children}/> }
  }

  return (
    <Router>
      <Route path="/" component={AppWrapper} >
        <Route path="about" component={About} />
        <Route path="inbox" component={Inbox} />
      </Route>
    </Router>
  )
}
