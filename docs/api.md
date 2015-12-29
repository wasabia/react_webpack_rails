# RWR api

## React

  * #### registerComponent [js]
    ```js
    registerComponent(String componentName, class|function component)
    ```

    Register component so it's globally accessible.

    ##### example:

    ```js
    import MyComponent from 'my-component';

    registerComponent('MyComponentName', MyComponent);
    ```

    **note:** Registered components are accessible in globally exposed `RWR.react` under `components` property.

  * #### getComponent [js]

    ```js
    getComponent(String componentName)
    ```

    Shortcut for accessing registered component.

    ##### example:

    ```js
    getComponent('MyComponentName');
    ```

  * #### createComponent [js]

    ```js
    createComponent(String componentName, [Object props])
    ```

    Wrapper over React.createElement that creates ready to render component with props.

    ##### example:

    ```js
    createComponent('MyComponentName', {foo: 'bar'});
    ```

  * #### renderComponent [js]

    ```js
    renderComponent(String componentName, Object props, DOMElement container)
    ```

    Wrapper over `React.render` and `React.createElement`. Renders component with given props into specified DOM element.

    ##### example:

    ```js
    var element = document.getElementById('my-element');
    renderComponent('MyComponentName', {ųfoo: 'bar'}, element);
    ```

  * #### unmountComponent [js]

    ```js
    unmountComponent(DOMElement container)
    ```

    Wrapper over `React.unmountComponentAtNode`. It will unmount component from given DOM node.

    ##### example:

    ```js
    var element = document.getElementById('my-element');
    unmountComponent(element);
    ```


  * ### react_component [ruby]

    ```ruby
    react_component(String component_name[, Object props])
    ```

    Creates DOM node with props as data attributes in rendered view so RWR can grab it and mount proper component.

    ##### example:

    ```ruby
    <%= react_component('MyComponentName', MySerializer.new(my_data)) %>
    ```

    **note:** Props Object will be parsed to JSON. Be careful when passing rails models there - all its data accessible after `.to_json` will be exposed as data-attributes. We  recommend using serializers to control it.


## ReactRouter
  * #### registerRouter [js]
    ```js
    registerRouter(String routerName, class|function component)
    ```

    Register router so it's globally accessible.

    ##### example:

    ```js
    import MyComponent from 'my-component';

    registerComponent('MyComponentName', MyComponent);
    ```

    **note:** Registered components are accessible in globally exposed `RWR.reactRouter` under `routers` property.

  * #### getRouter [js]

    ```js
    getRouter(String routerName)
    ```

    Shortcut for accessing registered router.

    ##### example:

    ```js
    getRouter('MyRouterName');
    ```

  * #### renderRouter [js]

    ```js
    renderRouter(String routerName, Object props, DOMElement container)
    ```

    Wrapper over `React.render`. Search and render given router into specified DOM element.

    ##### example:

    ```js
    var element = document.getElementById('my-element');
    renderComponent('MyComponentName', {foo: 'bar'}, element);
    ```

  * #### react_router [ruby]

    ```ruby
    react_router(String router_name)
    ```

    ##### example:

    ```ruby
    <%= react_router('MyRouterName') %>
    ```

## Redux

  * #### registerContainer [js]
    ```js
    registerContainer(String containerName, class|function container)
    ```

    Register container so it's globally accessible.

    ##### example:

    ```js
    import MyContainer from 'my-container';

    registerContainer('MyContainerName', MyContainer);
    ```

    **note:** Registered containers are accessible in globally exposed `RWR.redux` under `containers` property.

  * #### getContainer [js]

    ```js
    getContainer(String containerName)
    ```

    Shortcut for accessing registered container.

    ##### example:

    ```js
    getContainer('MyContainertName');
    ```

  * #### createContainer [js]

    ```js
    createContainer(String containerName, [Object props])
    ```

    Wrapper over React.createElement that creates ready to render container with props.

    ##### example:

    ```js
    createContainer('MyContainerName', {foo: 'bar'});
    ```

  * #### renderContainer [js]

    ```js
    renderContainer(String containerName, Object props, DOMElement container)
    ```

    Wrapper over `React.render` and `React.createElement`. Renders container with given props into specified DOM element.

    ##### example:

    ```js
    var element = document.getElementById('my-element');
    renderContainer('MyContainerName', {foo: 'bar'}, element);
    ```

  * #### unmountContainer [js]

    ```js
    unmountContainer(DOMElement container)
    ```

    Wrapper over `React.unmountContainerAtNode`. It will unmount container from given DOM node.

    ##### example:

    ```js
    var element = document.getElementById('my-element');
    unmountContainer(element);
    ```

  * ### redux_container [ruby]

    ```ruby
    redux_container(String container_name)
    ```

    Creates DOM node with initial state from Store as data attributes in rendered view so RWR can grab it and mount proper container.

    ##### example:

    ```ruby
    <%= redux_container('MyComponentName') %>
    ```

  * #### registerStore [js]
    ```js
    registerStore(String storeName, class|function store)
    ```

    Register store so it's globally accessible.

    ##### example:

    ```js
    import Store from './store/store';

    registerStore('StoreName', Store);
    ```

    **note:** Registered stores are accessible in globally exposed `RWR.redux` under `runningStores` property.

  * #### mountStore [js]

    ```js
    mountStore(String storeName, [object props])
    ```

  * #### getStore [js]

    ```js
    getStore(String storeName)
    ```

    Shortcut for accessing registered store.

    ##### example:

    ```js
    getStore('StoretName');
    ```

  * #### renderDevtools [js]

    ```js
    renderDevtools(String storeName, Object props, DOMElement container)
    ```

    Wrapper over `React.render` and `React.createElement`. Renders redux devtools with given props into specified DOM element.

    ##### example:

    ```js
    var element = document.getElementById('my-element');
    renderDevtools('StoreName', {foo: 'bar'}, element);
    ```

  * ### redux_store [ruby]

    ```ruby
    redux_store(String store_name, object initialState, object options)
    ```

    Mounts store and optional renders devtools.

    ##### example:

    ```ruby
    <%= redux_store('StoreName', { counter: 3 }, { include_dev_tools: true, enable_devtools: true }) %>
