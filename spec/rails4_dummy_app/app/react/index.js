import RWR from 'react-webpack-rails';
window.RWR = RWR;

import HelloWorld from './components/hello-world';
RWR.registerComponent('HelloWorld', HelloWorld);

