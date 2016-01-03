//= require react_webpack_rails/globals

RWR.redux = {
  runningStores: {},
  containers: {},

  registerContainer: function _registerContainer(name, container) {
    RWR.redux.containers[name] = container;
  },

  registerStore: function _registerStore(name, store) {
    RWR.redux.runningStores[name] = store;
  },

  mountStore: function _mountStore(name, props) {
    new (RWR.getStore(name))(props);
  },

  getStore: function _getStore(name) {
    return RWR.redux.runningStores[name];
  },

  getContainer: function _getContainer(name) {
    return RWR.redux.containers[name];
  },

  renderDevtools: function _renderDevtools(name, props, node) {
    var store = (new (RWR.getStore(name))).store;
    var visibleOnLoad = (typeof props.enable_devtools === 'undefined') ? true : props.enable_devtools;
    var devtools = RWR.createContainer('DevTools');
    var container = React.createElement(Provider, {store: store, children: devtools});
    RWR.reactDOM().render(container, node);
  },

  createContainer: function _createContainer(name, props) {
    var constructor = RWR.getContainer(name);
    return React.createElement(constructor, props);
  },

  renderContainer: function _renderContainer (name, props, node) {
    var storeName = Object.keys(RWR.redux.runningStores)[0];
    var store = (new (RWR.getStore(storeName))).store;
    var component = RWR.createContainer(name, props);
    var container = React.createElement(Provider, {store: store, children: component});
    RWR.reactDOM().render(container, node);
  },

  unmountContainer: function _unmountContainer(node) {
    RWR.reactDOM().unmountComponentAtNode(node);
  },
}

RWR.registerStore = RWR.redux.registerStore;
RWR.registerContainer = RWR.redux.registerContainer;
RWR.mountStore = RWR.redux.mountStore;
RWR.getContainer = RWR.redux.getContainer;
RWR.getStore = RWR.redux.getStore;
RWR.createContainer = RWR.redux.createContainer;
RWR.renderContainer = RWR.redux.renderContainer;
RWR.renderDevtools = RWR.redux.renderDevtools;
RWR.unmountContainer = RWR.redux.unmountContainer;

RWR.integrations['redux-store'] = {
  mount: function _mountStoreWrapper (config, options) {
    RWR.mountStore(options.name, config.payload)
    if (options.include_dev_tools != false) {
      RWR.renderDevtools(options.name, options, config.node)
    }
  },
};

RWR.integrations['redux-container'] = {
  mount: function _renderContainerWrapper (config, options) {
    RWR.renderContainer(options.name, config.payload, config.node)
  },

  unmount: function _unmountContainerWrapper(config) {
    RWR.unmountContainer(config.node);
  },
};

function _depricatedReactHelperWarn(helperName) {
  console.warn(RWR._messages.warnings.deprication(helperName, 'Use RWR.' + helperName + ' instead.'));
}

function registerStore() {
  _depricatedReactHelperWarn('registerStore');
  RWR.registerStore.apply(null, arguments);
}

function registerContainer() {
  _depricatedReactHelperWarn('registerContainer');
  RWR.registerContainer.apply(null, arguments);
}

function getContainer() {
  _depricatedReactHelperWarn('getContainer');
  RWR.getContainer.apply(null, arguments);
}

function getStore() {
  _depricatedReactHelperWarn('getStore');
  RWR.getStore.apply(null, arguments);
}

function createContainer() {
  _depricatedReactHelperWarn('createContainer');
  RWR.createContainer.apply(null, arguments);
}

function renderContainer() {
  _depricatedReactHelperWarn('renderContainer');
  RWR.renderContainer.apply(null, arguments);
}

function renderDevtools() {
  _depricatedReactHelperWarn('renderDevtools');
  RWR.renderDevtools.apply(null, arguments);
}

function unmountContainer() {
  _depricatedReactHelperWarn('unmountContainer');
  RWR.unmountContainer.apply(null, arguments);
}
