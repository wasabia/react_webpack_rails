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
        Hello World {this.props.name}
        <button onClick={this.onClick}>count up</button>
        {this.state.count}
      </div>
    );
  }
}

export default Users;
