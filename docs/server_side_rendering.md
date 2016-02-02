Server-Side Rendering
=======
Server-side processing enables executing any JavaScript code server side. The React integration we have prepared allows you to render React components to string on the server side. The integration accepts component name and props and returns valid HTML ([see API](https://github.com/netguru/react_webpack_rails/blob/master/docs/api.md#react_component-ruby)). This happens using node server provided. After running RWR install generator, you will find the server code in `app/react/` directory: `node_server.js`. You must ensure it is up and running if you want to use SSR (and any other server-side processing of JavaScript). For running we use [forever](https://github.com/foreverjs/forever). It handles wath/reload and allows to run and track process in background. If using up-to-date package.json there are prepared scripts prepared:  
  * running on development:
    ```bash
    npm run rwr-node-dev-server
    ```
  * running on production (foregroud):
  ```bash
    npm run rwr-node-server
  ```
  
To set the node server address, override this option to a string of your choice:
```ruby
  Rails.application.config.rwr.node_server_host
```

### How to use SSR:

```erb
<%# A view in erb %>
<%= react_component('HelloWorld', { name: @name }, server_side: true) %>
```
`HelloWorld` is the name of the react component, which has to be `import`ed and `registered`ed in your `app/react/index.js` like so:
```js
import HelloWorld from './components/hello-world';
RWR.registerComponent('HelloWorld', HelloWorld);
```
`{ name: @name }` is the component's props, and the option `server_side: true` turns SSR on. By default it is set to `false`. You can change it globally by setting the following config option to a Boolean value of your choice:
```ruby
Rails.application.config.react.server_side
```
This global config may be overridden by passing the `server_side` option to a specific `react_component` invocation.
