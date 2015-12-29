//= require react_webpack_rails/globals

RWR.reactRouter = {
  routers: {},
  registerRouter: function _registerRouter(name, routes) {
    RWR.reactRouter.routers[name] = routes;
  },

  getRouter: function _getRouter(name) {
    return RWR.reactRouter.routers[name];
  },

  renderRouter: function _renderRouter(name, element) {
    if (RWR.reactRouter.enabled === true) {
      throw new Error('Error when renering ' + name + "\nrenderRouter: can't render more than one router.");
    }
    RWR.reactRouter.enabled = true;
    RWR.reactDOM().render(RWR.reactRouter.getRouter(name), element);
  },
};

RWR.integrations['react-router'] = {

  mount: function _renderRouterWrapper(config, options) {
    RWR.reactRouter.renderRouter(options.name, config.node);
  },

  unmount: function _unmountRouterWrapper(config) {
    RWR.reactDOM().unmountComponentAtNode(config.node);
    RWR.reactRouter.enabled = false;
  },
};

function _routerDeprecationError(helperName) {
  console.warn(
    RWR._messages.warnings.deprecation(helperName, 'Use `RWR.reactRouter.' + helperName + '` instead')
  );
}

function registerRouter() {
  _routerDeprecationError('registerRouter');
  RWR.reactRouter.registerRouter.apply(null, arguments);
}

function getRouter() {
  _routerDeprecationError('getRouter');
  RWR.reactRouter.getRouter.apply(null, arguments);
}

function renderRouter() {
  _routerDeprecationError('renderRouter');
  RWR.reactRouter.renderRouter.apply(null, arguments);
}
