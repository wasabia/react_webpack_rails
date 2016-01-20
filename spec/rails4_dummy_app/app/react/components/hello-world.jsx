import React from 'react';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {count: 1};
  }

 onClick() {this.setState({count: this.state.count + 1})}

  render() {
    return(
      <div>
        <p>Hello World {this.props.name}</p>
        <button onClick={this.onClick}>Increment</button>
        <span>{this.state.count}</span>
      </div>
    );
  }
}

export default Users;
