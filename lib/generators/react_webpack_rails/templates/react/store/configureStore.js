import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const finalCreateStoreDev = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunkMiddleware),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
)(createStore);

const finalCreateStoreProd = compose(
  // Middleware you want to use in production:
  applyMiddleware(thunkMiddleware)
)(createStore);

function configureStore(initialState) {
  var store
  if (RWR.RAILS_ENV  == 'development') {
    store = finalCreateStoreDev(rootReducer, initialState);

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers/index');
        store.replaceReducer(nextRootReducer);
      });
    }
  } else {
    store = finalCreateStoreProd(rootReducer, initialState);
  }

  return store;
}

let instance = null;

export default class Store {
  constructor(initial) {
    if (!instance) {
      instance = this;

      this.store = configureStore(initial)
    }

    return instance;
  }
}
