# ReactWebpackRails
[![Travis CI](https://travis-ci.org/netguru/react_webpack_rails.svg?branch=master)](https://travis-ci.org/netguru/react_webpack_rails)

#### Rails - Webpack setup with React integration.
Inspired and partially based on https://github.com/reactjs/react-rails/ this gem provides generators and helpers that makes react-webpack-rails integration easy.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'react_webpack_rails'
```

Execute:

    $ bundle

Then run installation:

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


You probably also want to add the compiled react javascript to your `.gitignore`

```bash
# React bundle
app/assets/javascripts/react_bundle.js
```


### Babel

By default, `react-webpack-rails` uses Babel Stage 1 - Proposal. If you want to change the stage, you can do so in the `.babelrc` file. It is however not recommended to use Stage 0 in a production app, because the features present there can be dropped, which would break your application.

## Usage
##### Check [docs](https://github.com/netguru/react_webpack_rails/tree/master/docs) for detailed api description.
#### to use hot-reloading add partial in your application.html.erb to `<body>`:
(it's not needed when you want to use just webpack in watch mode without hot-reloading)
```erb
<%= render 'layouts/react_hot_assets' %>
```

#### Register component in index.js

```js
import Component from './components/some-component';
registerComponent('customComponentName', Component);
```

#### Use it in rails view

```erb
<%= react_component('customComponentName', { user: User.last }) %>
```

#### Use it in javascript file

```js
const element = $('#my-element');
renderComponent('customComponentName', {user_id: 1}, element);
```

#### Render component in controller

```ruby
def action_name
  render react_component 'customComponentName', props: { user_id: 1 }
end
```

### Development environment
Run webpack in watch mode using script:

    $ npm start

Run webpack in hot-auto-reloading mode using script (to use it you have to add `react_hot_assets` partial as mentioned before):

    $ npm run start-hot-dev

Or manually:

    $ webpack -w --config YOUR_CONFIG


### Production environment
Run webpack in production mode before compiling assets using script:

    $ npm run build

or manually:

    $ webpack -p --config YOUR_CONFIG

#### Deployment
Check [docs/deployment.md](docs/deployment.md)

## Gem development

After checking out the repo, run `bundle exec rake setup:all` to install dependencies. Then, run `rake` to run the tests (includes gem, test app and node module).
Run `bundle exec rake -T` to check available development commands.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/netguru/react_webpack_rails.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
