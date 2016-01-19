import RWR from 'rwr-integration';
var g;
if(typeof(window) == 'undefined'){
  g = global;
} else {
  g = window;
};
g.RWR = RWR;

import HelloWorld from './components/hello-world';
RWR.registerComponent('HelloWorld', HelloWorld);
g.comp = HelloWorld;
