import RWR from 'react-webpack-rails';
import ReactRouterIntegration from './react-router-integration';
window.RWR = RWR;

import HelloWorld from './components/hello-world';
import exampleRouter from './routers/example';

RWR.registerComponent('HelloWorld', HelloWorld);
ReactRouterIntegration.registerRouter('MainRouter', exampleRouter);
ReactRouterIntegration.run();
