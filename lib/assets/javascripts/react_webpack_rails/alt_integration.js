function _checkAlt() {
  if (typeof(Alt) === 'undefined') {
    throw new Error('Alt helpers require Alt instance exposed globally.');
  }
}

function altStore(name, payload) {
  var store;
  _checkAlt();
  store = Alt.stores[name];
  Object.assign(store.state, payload);
  store.emitChange();
}

function _altStoreWrapper(config, options) {
  altStore(options.name, config.payload)
}

RWR.alt = {
  altStore: altStore,
};

RWR.integrations['alt-store'] = {
  mount: _altStoreWrapper,
}
