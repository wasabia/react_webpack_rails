import React from 'react';
import {Link} from 'react-router';

class App extends React.Component {
  render() {
    return(
      <div>
        App Component:
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.test}
        {this.props.children}
      </div>
    );
  }
}

export default App;
