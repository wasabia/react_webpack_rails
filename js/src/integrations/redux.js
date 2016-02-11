import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux'

import { isFunction, isReduxStore } from '../utils/validators';

class ReduxIntegration {
  constructor() {
    this.stores = {};
    this.mountedStores = {};
    this.containers = {};

    this.registerStore = this.registerStore.bind(this);
    this.mountStore = this.mountStore.bind(this);
    this.getStore = this.getStore.bind(this);
    this.registerContainer = this.registerContainer.bind(this);
    this.getContainer = this.getContainer.bind(this);
    this.createContainer = this.createContainer.bind(this);
    this.createRootComponent = this.createRootComponent.bind(this);
    this.renderContainer = this.renderContainer.bind(this);
    this.unmountContainer = this.unmountContainer.bind(this);
    this.renderContainerToString = this.renderContainerToString.bind(this);
  }

  registerStore(name, store) {
    isFunction(store, `Error when registering '${name}' store: must be a function.`);
    this.stores[name] = store;
  }

  mountStore(name, props) {
    const store = this.stores[name];
    isFunction(store, `Error when mounting '${name}' store: must be a function.`);

    const storeObject = store(props);
    isReduxStore(storeObject, `Error when mounting '${name}' store: must be a valid Redux store.`);
    this.mountedStores[name] = storeObject;
  }

  getStore(name) {
    return this.mountedStores[name];
  }

  registerContainer(name, container) {
    this.containers[name] = container;
  }

  getContainer(name) {
    return this.containers[name];
  }

  createContainer(name, props) {
    const constructor = this.getContainer(name);
    return React.createElement(constructor, props);
  }

  createRootComponent(name, props, storeName) {
    const container = this.createContainer(name, props);
    return React.createElement(Provider, { store: this.getStore(storeName) }, container);
  }

  renderContainer(name, props, node, storeName) {
    const rootComponent = this.createRootComponent(name, props, storeName);
    render(rootComponent, node);
  }

  unmountContainer(node) {
    unmountComponentAtNode(node);
  }

  renderContainerToString(name, props, storeName) {
    const rootComponent = this.createRootComponent(name, props, storeName);
    renderToString(rootComponent);
  }

  get storeIntegrationWrapper() {
    return {
      mount: function _mount(node, payload) {
        this.mountStore(payload.name, payload.props);
      }.bind(this)
    }
  }

  get containerIntegrationWrapper() {
    return {
      mount: function _mount(node, payload) {
        this.renderContainer(payload.name, payload.props, node, payload.storeName);
      }.bind(this),

      unmount: function _unmount(node) {
        this.unmountContainer(node);
      }.bind(this),

      nodeRun: function _prerender(payload) {
        return this.renderContainerToString(payload.name, payload.props);
      }.bind(this)
    };
  }
}

export default new ReduxIntegration;
