# Javascript

* [registerComponent](#registercomponent)
* [getComponent](#getcomponent)
* [createComponent](#createcomponent)
* [renderComponent](#rendercomponent)
* [unmountComponent](#unmountcomponent)

---

* #### registerComponent
  ```js
  registerComponent(String componentName, class|function component)
  ```

  Register component so it's globally accessible.

  ##### example:

  ```js
  import MyComponent from 'my-component';

  RWR.registerComponent('MyComponentName', MyComponent);
  ```

  **note:** Registered components are accessible in globally exposed `ReactRailsUJS` under `reactComponents` property.

* #### getComponent

  ```js
  getComponent(String componentName)
  ```

  Shortcut for accessing registered component.

  ##### example:

  ```js
  RWR.getComponent('MyComponentName');
  ```

* #### createComponent

  ```js
  createComponent(String componentName[, Object props])
  ```

  Wrapper over React.createElement that creates ready to render component with props.

  ##### example:

  ```js
  RWR.createComponent('MyComponentName', {foo: 'bar'});
  ```

* #### renderComponent

  ```js
  renderComponent(String componentName, Object props, DOMElement container)
  ```

  Wrapper over `React.render` and `React.createElement`. Renders component with given props into specified DOM element.

  ##### example:

  ```js
  var element = document.getElementById('my-element');
  RWR.renderComponent('MyComponentName', {foo: 'bar'}, element);
  ```

* #### unmountComponent

  ```js
  unmountComponent(DOMElement container)
  ```

  Wrapper over `React.unmountComponentAtNode`. It will unmount component from given DOM node.

  ##### example:

  ```js
  var element = document.getElementById('my-element');
  RWR.unmountComponent(element);
  ```
