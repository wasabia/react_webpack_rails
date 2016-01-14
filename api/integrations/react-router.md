# RWR.reactRouter

* Ruby:
    *  [react_router](#ruby-reactrouter)
* Javascript:
    *  [registerRouter](#js-registerrouter)
    *  [getRouter](#js-getrouter)
    *  [renderRouter](#js-renderrouter)

---

## Ruby
* #### [ruby] react_router

  ```ruby
  react_router(String router_name)
  ```

  ##### example:

  ```ruby
  <%= react_router('MyRouterName') %>
  ```

## Javascript

* #### [js] registerRouter
  ```js
  registerRouter(String routerName, class|function component)
  ```

  Register router so it's globally accessible.

  ##### example:

  ```js
  import MyRouter from 'my-router';

  RWR.reactRouter.registerRouter('MyRouterName', MyRouter);
  ```

  **note:** Registered routers are accessible in globally exposed `ReactRailsUJS` under `reactRouters` property.

* #### [js] getRouter

  ```js
  getRouter(String routerName)
  ```

  Shortcut for accessing registered router.

  ##### example:

  ```js
  RWR.reactRouter.getRouter('MyRouterName');
  ```

* #### [js] renderRouter

  ```js
  renderRouter(String routerName, DOMElement container)
  ```

  Renders router into specified DOM element.

  ##### example:

  ```js
  var element = document.getElementById('my-element');
  RWR.renderRouter('MyRouterName', element);
  ```
