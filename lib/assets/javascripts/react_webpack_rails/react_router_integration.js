//= require react_webpack_rails/globals

function registerRouter(name, routes) {
  RWR.reactRouter.routers[name] = routes;
}

function getRouter(name) {
  return RWR.reactRouter.routers[name];
}

function renderRouter(name, element) {
  if (RWR.reactRouter.enabled === true) {
    throw new Error('Error when renering ' + name + "\nrenderRouter: can't render more than one router.");
  }
  RWR.reactRouter.enabled = true;
  RWR.reactDOM().render(getRouter(name), element);
}

function _renderRouterWrapper(config, options) {
  renderRouter(options.name, config.node);
}

function _unmountRouterWrapper(config) {
  RWR.reactDOM().unmountComponentAtNode(config.node);
  RWR.reactRouter.enabled = false;
}

RWR.reactRouter = {
  routers: {},
  registerRouter: registerRouter,
  getRouter: getRouter,
  renderRouter: renderRouter,
};

RWR.integrations['react-router'] = {
  mount: _renderRouterWrapper,
  unmount: _unmountRouterWrapper,
};
