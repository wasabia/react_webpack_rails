# Installation

Add this line to your application's Gemfile:

```ruby
gem 'react_webpack_rails'
```

And execute:

    $ bundle install

Or install it yourself as:

    $ gem install react_webpack_rails

---

Then, run installation:

    $ rails g react_webpack_rails:install

This will create following files:

```
├── app
│   ├── react
│   │   ├── components
│   │   │   ├── hello-world.jsx
│   │   │   └── hello-world-test.jsx
│   │   └── index.js
│   ├── views
│   │   └── layouts
│   │       └── _react_hot_assets.html.erb
│   └── assets
│       └── javascripts
│           └──react_bundle.js
├── webpack
│   ├── dev.config.js
│   ├── hot-dev.config.js
│   ├── production.config.js
│   └── tests.config.js
├── .babelrc
├── karma.conf.js
├── package.json
└── webpack.config.js
```

There are several options available for the generator:

    $ rails g react_webpack_rails:install --skip-example    # bypasses the addition of hello-world example
    $ rails g react_webpack_rails:install --skip-router     # bypasses the react-router integration

You can of course use them in any combination.

---

Establish the node packages (may take a few moments)

    $ npm install    # you may see warnings to consider updating the provided package.json file with license and repository

Make sure you have [webpack](https://webpack.github.io/docs/installation.html) installed globally:

    $ npm install webpack -g

Generate `react_bundle` for first time:

    $ webpack

And require integration and bundle files in `application.js`

```js
//= require react_integration
//= require react_bundle
```

### Babel

By default, `react-webpack-rails` uses Babel Stage 1 - Proposal. If you want to change the stage, you can do so in the `.babelrc` file. It is however not recommended to use Stage 0 in a production app, because the features present there can be dropped, which would break your application.
