import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { devTools, persistState } from 'redux-devtools';
import rootReducer from '../reducers/index';

const finalCreateStoreDev = compose(
  applyMiddleware(thunkMiddleware),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const finalCreateStoreProd = compose(
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
