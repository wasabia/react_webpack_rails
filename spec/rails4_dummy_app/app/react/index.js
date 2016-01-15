import RWR from 'rwr-integration';
window.RWR = RWR;

import HelloWorld from './components/hello-world';
RWR.registerComponent('HelloWorld', HelloWorld);
