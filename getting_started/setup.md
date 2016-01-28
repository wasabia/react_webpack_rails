# Setup

### Rails part

Add gem to your application's Gemfile:

```ruby
gem 'react_webpack_rails'
```

Install gem:

```bash
$ bundle install
```

Then, run gem installator:

```bash
$ rails g react_webpack_rails:install
```

This will create the following files:

```bash
├── app
│   ├── react
│   │   ├── components # place for your components
│   │   │   ├── hello-world.jsx # example component with test file
│   │   │   └── hello-world-test.jsx
│   │   └── index.js # you register your components here
│   ├── views
│   │   └── layouts
│   │       └── _react_hot_assets.html.erb # for hot reloading, check below
│   └── assets
│       └── javascripts
│           └──react_bundle.js # output file from webpack
├── webpack
│   ├── dev.config.js
│   ├── hot-dev.config.js
│   ├── production.config.js
│   └── tests.config.js
├── .babelrc # babel config
├── karma.conf.js # config for tests
├── package.json # every node modules are specified in this file
└── webpack.config.js # basic webpack config, rest inherits from it
```

There are two options available for the generator:

```bash
$ rails g react_webpack_rails:install --skip-example    # bypasses the addition of hello-world example
$ rails g react_webpack_rails:install --skip-router     # bypasses the react-router integration
```

You can of course use them in any combination.

### Lets install node part

Establish the node packages (may take a few moments)

```bash
$ npm install    # you may see warnings to consider updating the provided package.json file with license and repository
```

Make sure you have [webpack](https://webpack.github.io/docs/installation.html) installed globally:

    $ npm install webpack -g

Generate `react_bundle.js` file for first time:

    $ webpack

Then append following lines to `app/assets/javascript/application.js`

```js
//= require react_integration
//= require react_bundle
```

Now you can start your rails server. Keep in mind that you need to recompile `react_bundle` file after every change in `app/react` directory.

You can use webpack in watch mode, start webpack proces in separate terminal session:

```bash
$ webpack -w
```
