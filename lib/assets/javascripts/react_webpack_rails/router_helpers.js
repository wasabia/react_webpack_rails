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

RWR.routerHelpers = {
  registerRouter: registerRouter,
  getRouter: getRouter,
  renderRouter: renderRouter,
};
