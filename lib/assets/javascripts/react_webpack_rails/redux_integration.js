//= require react_webpack_rails/globals

function registerStore(name, store) {
  RWR.redux.runningStores[name] = store;
}

function getStore(name) {
  return RWR.redux.runningStores[name];
}

function renderContainer (name, props, node) {
  var store = (new (getStore('Store'))).store
  var component = RWR.react.createComponent(name, props);
  container = React.createElement(Provider, {store: store, children: component});
  RWR.reactDOM().render(container, node);
}

function unmountContainer(node) {
  RWR.reactDOM().unmountComponentAtNode(node);
}

function _renderContainerWrapper (config, options) {
  renderContainer(options.name, config.payload, config.node)
}

function _unmountContainerWrapper(config) {
  unmountContainer(config.node);
}

function _mountStoreWrapper (config, options) {
  new (getStore(options.name))(config.payload)
}

RWR.redux = {
  runningStores: {},
  registerStore: registerStore,
  getStore: getStore,
  renderContainer: renderContainer,
};

RWR.integrations['redux-store'] = {
  mount: _mountStoreWrapper,
};

RWR.integrations['redux-container'] = {
  mount: _renderContainerWrapper,
  unmount: _unmountContainerWrapper,
};
