## (0.0.2)
* using rails like names
* simplifying webpack setup
* making `registerComponent` helper part of ujs,

### migration 0.0.1 -> 0.0.2
* in `application.js` replace:

  ```js
  //= require react-integration
  //= require generated/bundle
  ```

  with:
  ```js
  //= require react_integration
  //= require react_bundle
  ```

## (0.0.1) Initial release
* generators for webpack configuration
* helpers:
  * js - `registerComponent` exposing component for rails
  * rails - `react_component` using component based on https://github.com/reactjs/react-rails/blob/master/lib/react/rails/view_helper.rb
* integration script based on https://github.com/reactjs/react-rails/blob/master/lib/assets/javascripts/react_ujs.js.erb
