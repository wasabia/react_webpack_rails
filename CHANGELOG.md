## 0.3.1
* show depreciation warning only when integrations/react-router is used
* throw an error when integration is missing

## 0.3.0
* move integration with react-router to external plugin: https://github.com/netguru/rwr-react_router
* add redux integration by external plugin: https://github.com/netguru/rwr-redux
* support haml and coffee script in generator

## 0.2.1
* Fix Readme typo
* Fix json loader in generator
* Fix node module version in core package.json

## 0.2.0
* Added server-side execution of js
  * Updated package.json generator,
    * Added dependencies:
      * http
      * httpdispatcher
      * forever
    * Added npm scripts for running node-server on development/production
  * Added node server generator (`app/react/node_server.js`)
  * Updated `app/react/index.js` generator
  * Added NodeIntegrationRunner service for running JS code on node server.
* Updated React-integration:
  * Added server-side render support to npm package
  * Updated react_component helper
* fixed props processing
* Added react_component render

#### migration 0.1.2 -> 0.2.0
* Make sure you have latest npm package installed. In your package.json:
```js
"react-webpack-rails": "0.2.0"
```
* In `app/react/index.js` replace `window.RWR = RWR;` with `RWR.run();` - it's required by node environment.
* Setup node server by running server_side generator.
```bash
$ rails generate react_webpack_rails:install:server_side
```

  ***note***: *generator will ask you to override existing package.json. Don't worry about its content - generator will merge existing package with the one from gem.*

## 0.1.2 (February 3, 2015)
* fix camelize_props
* allow camelize for AMS objects

## 0.1.1 (February 2, 2015)
* fix for hot-reload mode

## 0.1.0 (January 27, 2015)
* `config.react.camelize_props = true` will camelize `react_component` prop keys
* Babel updated to version 6
* `react-webpack-rails` npm package
  * replacing javascript integrations
  * removing global javascript helpers (registerComponent, getComponent, createComponent, renderComponent, renderRouter, getRouter)

#### migration 0.0.5 -> 0.1.0
1. Install react-webpack-rails package.

  ```
  $ npm install --save react-webpack-rails
  ```

2. Update gem react_webpack_rails

  ```
  $ bundle update react_webpack_rails
  ```
3. Update babel to version 6.x.

  ```
  $ npm i --save-dev babel-core@^6.0.0 babel-loader@^6.0.0 babel-preset-stage-1@^6.0.0 babel-preset-react@^6.0.0 babel-preset-es2015@^6.0.0
  ```

4. Update babel config file (we use stage-1).

  ```
  {
    "presets": ["stage-1", "es2015", "react"]
  }
  ```

5. Import and expose RWR in `react/index.js` file
add on the top:

  ```js
  // app/react/index.js
  import RWR from 'react-webpack-rails';
  window.RWR = RWR;
  ```

6. Use helpers from RWR instead of globals. Example:

  ```
  # old
  registerComponent(...)

  # new
  RWR.registerComponent(...)
  ```

7. You can remove exposed `React` and `ReactDOM` from `react/index.js`. No need to expose them globally.

## 0.0.5 (November 26, 2015)
* Add Hot Reload support
  * Dependencies:
    * webpack-dev-server
    * react-hot-loader
  * Second development server (webpack-dev-server) with hot-auto-reload:
* Setup and add tests

### migration 0.0.4 -> 0.0.5
* make sure your package.json is up-to-date.
* install `react-hot-loader ^1.3.0`
* install `webpack-dev-server" ^1.12.1`
* add to application.html.erb <body>:
  ```erb
  <% if Rails.env.development? %>
    <script src='http://localhost:8080/assets/react_bundle.js'></script>
  <% end %>
  ```
* copy file `hot-dev.config.js` from https://github.com/netguru/react_webpack_rails/tree/master/lib/generators/react_webpack_rails/templates/webpack to your `/webpack` directory.
* make sure that you have `react_bundle.js` in your `/app/assets/javascripts` directory. If not, to use hot-reloading server please create empty `react_bundle.js` in your `/app/assets/javascripts` directory or just run `$ npm start` or `$ npm build` in your terminal.


## 0.0.4 (October 26, 2015)
* Add [react-router [v1]](https://github.com/rackt/react-router) integration:
  * js helpers:
    * `registerRouter`
    * `getRouter`
    * `renderRouter`
  * rails helper:
    * `react_router`
* Add `unmountComponent` js helper.
* Bump package.json.
* Add React 0.14 compatibility.
* Add `.babelrc` file as part of generator.

### migration 0.0.3 -> 0.0.4
* Make sure your package.json is up-to-date.
* install `react-dom 0.14`:
  ```
  $ npm install react-dom --save`
  ```
* Expose `ReactDOM` in app/react/index.js.

  ```js
  import ReactDOM from 'react-dom';
  window.ReactDOM = ReactDOM;
  ```
* Create `.bablerc` in your project directory:

  ```js
  {
    "stage": 1
  }
  ```

## 0.0.3 (September 6, 2015)
* Reorganize config files.
* Add UJS helpers:
  * `getComponent`
  * `createComponent`
  * `renderComponent`
* Add docs.
* Add various Readme fixes.
* Bump dependencies.

## 0.0.2 (August 29, 2015)
* Use rails like names.
* Simplify webpack setup.
* Make `registerComponent` helper part of ujs.

### migration 0.0.1 -> 0.0.2
* In `application.js` replace:

  ```js
  //= require react-integration
  //= require generated/bundle
  ```

  with:
  ```js
  //= require react_integration
  //= require react_bundle
  ```

## 0.0.1 Initial release (August 25, 2015)
* Add generators for webpack configuration.
* Add helpers:
  * js - `registerComponent` exposing component for rails
  * rails - `react_component` using component based on https://github.com/reactjs/react-rails/blob/master/lib/react/rails/view_helper.rb.
* Add integration script based on https://github.com/reactjs/react-rails/blob/master/lib/assets/javascripts/react_ujs.js.erb.
