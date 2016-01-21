import RWR from 'rwr-integration';
var g = typeof window == 'undefined' ? global : window;
g.RWR = RWR;

import HelloWorld from './components/hello-world';
RWR.registerComponent('HelloWorld', HelloWorld);
