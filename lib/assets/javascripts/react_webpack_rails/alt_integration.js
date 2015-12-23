//= require react_webpack_rails/globals

RWR.alt = {
  _checkAlt: function _checkAlt() {
    if (typeof(Alt) === 'undefined') {
      throw new Error('Alt helpers require Alt instance exposed globally.');
    }
  },

  initStore: function altStore(name, payload) {
    var store;
    RWR.alt._checkAlt();
    store = Alt.stores[name];
    Object.assign(store.state, payload);
    store.emitChange();
  }
};

RWR.integrations['alt-store'] = {
  mount: function _altStoreWrapper(config, options) {
    RWR.alt.initStore(options.name, config.payload)
  }
};
