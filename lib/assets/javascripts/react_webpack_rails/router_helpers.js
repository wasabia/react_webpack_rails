function registerRouter(name, routes) {
  RWR.reactRouters[name] = routes;
}

function getRouter(name) {
  return RWR.reactRouters[name];
}

function renderRouter(name, element) {
  if (RWR.routerEnabled === true) {
    throw new Error('Error when renering ' + name + "\nrenderRouter: can't render more than one router.");
  }
  RWR.routerEnabled = true;
  RWR.reactDOM().render(getRouter(name), element);
}

function _renderRouterWrapper(config, options) {
  renderRouter(options.name, config.node);
}

function _unmountRouterWrapper(config) {
  RWR.reactDOM().unmountComponentAtNode(config.node);
}

RWR.routerHelpers = {
  registerRouter: registerRouter,
  getRouter: getRouter,
  renderRouter: renderRouter,
};

RWR.railsIntegrations['react-router'] = {
  mount: _renderRouterWrapper,
  unmount: _unmountRouterWrapper,
};
