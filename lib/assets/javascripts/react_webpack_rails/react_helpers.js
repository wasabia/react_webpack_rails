function registerComponent(name, component) {
  RWR.components[name] = component;
}

function getComponent(name) {
  return RWR.components[name];
}

function createComponent(name, props) {
  var constructor = getComponent(name);
  return React.createElement(constructor, props);
}

function renderComponent(name, props, node) {
  var component = createComponent(name, props);
  RWR.reactDOM().render(component, node);
}

function unmountComponent(node) {
  RWR.reactDOM().unmountComponentAtNode(node);
}

function _renderComponentWrapper(config, options) {
  renderComponent(options.name, config.payload, config.node);
}

function _unmountComponentWrapper(config) {
  unmountComponent(config.node);
}

RWR.reactHelpers = {
  registerComponent: registerComponent,
  getComponent: getComponent,
  createComponent: createComponent,
  renderComponent: renderComponent,
  unmountComponent: unmountComponent,
};

RWR.railsIntegrations['react-component'] = {
  mount: _renderComponentWrapper,
  unmount: _unmountComponentWrapper,
};
