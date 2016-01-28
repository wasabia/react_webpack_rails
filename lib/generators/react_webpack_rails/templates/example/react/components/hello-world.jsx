import React from 'react';

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {count: 1};
  }

 onClick() {this.setState({count: this.state.count + 1})}

  render() {
    return(
      <div>
        <p>Hello World</p>
      </div>
    );
  }
}

export default HelloWorld;
