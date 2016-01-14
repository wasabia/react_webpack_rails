# Usage

## Setup

#### Register component

In order to expose a React component to Rails place the following in `app/react/index.js` which is the entry point for your React application.

```js
import Component from './components/some-component';
registerComponent('customComponentName', Component);
```

#### Use it in Rails view

```erb
<%= react_component('customComponentName', { user: User.last }) %>
```

See [passing props](passing_props.md) for details. 

#### Use it in Javascript file

```js
const element = $('#my-element');
renderComponent('customComponentName', {user_id: 1}, element);
```

## Execution

### Development
Run webpack in watch mode using script:

    $ npm start

or manually:

    $ webpack -w --config YOUR_CONFIG
    
You can also run webpack in [hot-auto-reloading mode](hot_reload_mode.md).

## Production
Run webpack in production mode before compiling assets using script:

    $ npm run build

or manually:

    $ webpack -p --config YOUR_CONFIG