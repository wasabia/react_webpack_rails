## UNRELEASED
* `config.react.camelize_props = true` will camelize `react_component` prop keys #409

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
