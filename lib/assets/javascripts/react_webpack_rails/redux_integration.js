//= require react_webpack_rails/globals

function registerStore(name, store) {
  RWR.redux.runningStores[name] = store;
}

function getStore(name) {
  return RWR.redux.runningStores[name];
}

RWR.redux = {
  runningStores: {},
  registerStore: registerStore,
  getStore: getStore,
};

function renderContainer (name, props, node) {
  var store = new (getStore('Store')).store
  var component = RWR.react.createComponent(name, props);
  container = React.createElement(Provider, {store: store, children: component}); //-> 2x uruchomić -
  RWR.reactDOM().render(container, node);
}

function _renderContainerWrapper (config, options) {
  renderContainer(options.name, config.payload, config.node)
}

function _unmountContainerWrapper (config, options) {
  debugger;
}

function _mountStoreWrapper (config, options) {
  // debugger;
  // var store = RWR.react.createComponent(options.name, config.payload);
  // RWR.reactDOM().render(store, config.node);
  // createStore(options.name, config.payload, config.node)
  // debugger; wyciągnąć nazwę stora i initial state componentu (z payload, options itp) -> globalny provider -> sprawdzić
  // przypisać do RWR.runningStores ->
  new (getStore('Store'))(config.payload)
}


RWR.integrations['redux-store'] = {
  mount: _mountStoreWrapper,
};

RWR.integrations['redux-container'] = {
  mount: _renderContainerWrapper,
  unmount: _unmountContainerWrapper,
};
