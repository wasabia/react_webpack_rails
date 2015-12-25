//= require react_webpack_rails/globals

function registerStore(name, store) {
  RWR.redux.runningStores[name] = store;
}

function mountStore(name, props) {
  new (getStore(name))(props)
}

function getStore(name) {
  return RWR.redux.runningStores[name];
}

function renderDevtools(name, props, node) {
  var store = (new (getStore(name))).store
  var visibleOnLoad = (typeof props.enable_devtools === 'undefined') ? true : props.enable_devtools
  var devtools = React.createElement(DevTools, {store: store, monitor: LogMonitor, visibleOnLoad: visibleOnLoad});
  var container = React.createElement(DebugPanel, {top: true, bottom: true, right: true, children: devtools});
  RWR.reactDOM().render(container, node);
}

function renderContainer (name, props, node) {
  var storeName = Object.keys(RWR.redux.runningStores)[0]
  var store = (new (getStore(storeName))).store
  var component = RWR.react.createComponent(name, props);
  var container = React.createElement(Provider, {store: store, children: component});
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
  mountStore(options.name, config.payload)
  if (options.include_dev_tools != false) {
    renderDevtools(options.name, options, config.node)
  }
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
