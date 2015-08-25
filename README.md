# ReactWebpackRails
Rails - webpack integration with react setup.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'react_webpack_rails'
```

Execute:

    $ bundle

Or install it yourself as:

    $ gem install react_webpack_rails

And then:

1. run installation

    ```
    $ rails g react_webpack_rails:install
    ```
    
2. add react-integration and bundle files to application.js

    ```js
    //= require react-integration
    //= require generated/bundle
    ```


## Usage
1. Register component in index.js

```js
import Component from 'some-component';

registerComponent('customComponentName', Component)
```

2. Use it in view

```erb
<%= react_component('customComponentName', { user: User.last })
```

#### Development
Run webpack in watch mode so it will react on any file change.

    webpack -w

#### Production
Run webpack in production mode before compiling assets

    webpack -p

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake rspec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/netguru/react_webpack_rails.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
