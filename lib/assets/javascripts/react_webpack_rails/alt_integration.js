function _checkAlt() {
  if (typeof(Alt) === 'undefined') {
    throw new Error('Alt helpers require Alt instance exposed globally.');
  }
}

function altStore(name, data) {
  var store;
  _checkAlt();
  store = Alt.stores[name];
  Object.assign(store.state, data);
  store.emitChange();
}

RWR.altHelpers = {
  altStore: altStore,
};
