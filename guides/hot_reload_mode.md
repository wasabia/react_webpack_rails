# Hot Reload Mode

The [installation](installation.md) generator creates `app/views/layouts/_react_hot_assets.html.erb` partial that allows webpack to be run in hot-auto-reload mode.

In order to make use of it simply render the partial before your React components in `application.html.erb` inside `<body>` tag.

```erb
<%= render 'layouts/react_hot_assets' %>
```

Now, instead of watch mode you can run webpack as follows:

    $ npm run start-hot-dev

or manually

    $ webpack-dev-server --hot --inline --config YOUR_CONFIG
