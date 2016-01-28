# Hello World example

The gem comes with a simple Hello World component.

First, follow the steps from [Setup](setup.md) guide.

## React component

Now, we need a basic React component that we will place inside `app/react/components/` as `hello-world.jsx`. It will receive a prop from Rails and then display it - that's all.

```js
import React, { PropTypes } from 'react';

export default class HelloWorld extends React.Component {
  static propTypes() {
    return {username: PropTypes.string.isRequired};
  }
  
  render() {
    return <div>Hello {this.props.username}</div>;
  }
}
```

We also added `props` validations - in this case we require that `props` should contain `username` as a string variable.

See [passing props](passing_props.md) for details.

## Integration

We have our component in place, let's register `HelloWorld` component in `app/react/index.js`:

```js
import HelloWorld from './components/hello-world';
RWR.registerComponent('HelloWorldComponent', HelloWorld);
```

Then, we need a variable that will be passed to the component. Let's place it inside `index` action of `app/controllers/hello_controller.rb`

```ruby
def index
  @username = 'testUser'
end
```

We prepared data for components, let's render it in `app/views/hello/index.html.erb`.

```erb
<%= react_component('HelloWorldComponent', username: @username) %>
```



## Done
Finally, start rails server

```bash
$ bundle exec rails s
```

Remember about recompiling `react_bundle.js` file! In new terminal session run:

```bash
$ npm start # it's a shorthand for webpack -w --config webpack/dev.config.js
```

This will keep webpack running in watch mode, it will recompile any changes.

---

#### You can use hot reload (you won't need to reload page to see changes).

You need to add hot reload to `application.html.erb`:

```erb
<body>
    <%= render 'layouts/react_hot_assets' %>
    <%= yield %>
</body>
```

Then, instead of `npm start` run webpack with hot reload config
```bash
$ npm run start-hot-dev
```

Above steps should allow you to open `localhost:3000/hello/index` url and see the created component with the desired `Hello World` text.