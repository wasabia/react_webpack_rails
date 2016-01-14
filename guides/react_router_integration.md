# React Router integration

First, follow the [Installation instructions](../../README.md#installation) to create base react project with Hello World example.

Make sure you run

    $ rails g react_webpack_rails:install

generator without `--skip-router` flag to add `react-router` to `package.json` by default.

When you're done, remove

```js
import HelloWorld from './components/hello-world';
registerComponent('HelloWorld', HelloWorld);
```

from `app/react/index.js` as we want to manage components through the router.

Next, let's create a basic parent component `app.jsx` for Hello World example component

```js
import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
  static get propTypes() {
    return {
      children: React.PropTypes.node,
    };
  }

  render() {
    return (
      <div>
        <Link to="/hello_world">Show Hello World</Link>
        {this.props.children}
      </div>
    );
  }
}
```

and `router.jsx` that will match them to URLs

```js
import React from 'react';
import { Route, Router } from 'react-router';

import App from './app';
import HelloWorld from './hello-world';

export default (
  <Router>
    <Route component={App} path="/" >
      <Route component={HelloWorld} path="hello_world" />
    </Route>
  </Router>
);
```

Now, integrating the above using RWR gem is as simple as registering the router in `index.js`

```js
import Router from './components/router';
registerRouter('Router', Router);
```

and placing

```erb
<%= react_router('Router') %>
```

in your Rails view.

Or if you prefer js, then

```js
const element = $('#my-element');
renderRouter('Router', element);
```
in a Javascript file.
