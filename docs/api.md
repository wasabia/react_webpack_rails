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
    createComponent(String componentName[, Object props])
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
