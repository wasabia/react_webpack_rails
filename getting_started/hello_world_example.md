# Hello World example

The gem comes with a simple Hello World component but here we will create our own totally from scratch.

## Rails setup

First, create a rails project

    $ rails new hello_world
    $ cd hello_world
    
add RWR gem to the `Gemfile`

```ruby
gem 'react_webpack_rails'
```

and execute:

    $ bundle install
    
Now we can generate a basic scaffold inside the project

    $ rails g controller Hello index
    
## React setup

Time to add some React

    $ rails g react_webpack_rails:install --skip-example

Notice `--skip-example` flag - we don't want to see the predefined hello world component this time.

Then, install node packages

    $ npm install

and webpack if you don't have it

    $ npm install webpack -g
    
When it's done, generate `react_bundle`

    $ webpack
    
and add the following to `app/assets/javascripts/application.js`

```js
//= require react_integration
//= require react_bundle
```

## React component

Now, we need a basic React component that we will place inside `app/react/components/` as `hello.jsx`. It will receive a prop from Rails and then display it - that's all.

```js
import React from 'react';

export default class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.Target}</div>;
  }
}
```

In real application remember to extend it with prop validation and tests!

## Integration

First, register the new component in `app/react/index.js`:

```js
import Hello from './components/hello';
registerComponent('HelloComponent', Hello);
```

Then, we need variable that will be passed to the component. Let's place it inside `index` action of `app/controllers/hello_controller.rb`

```ruby
def index
    @target = 'World'
end
```

And now, everything is ready to display the component in Rails view - place

```erb
<%= react_component('HelloComponent', Target: @target) %>
```

in `app/views/hello/index.html.erb`.

Let's also add hot reload to `application.html.erb`:

```erb
<body>
    <%= render 'layouts/react_hot_assets' %>
    <%= yield %>
</body>
```

## Done
Finally, running

    $ rails s
    
and

    $ npm run start-hot-dev

should allow you to open `localhost:3000/hello/index` url and see the created component with the desired `Hello World` text.