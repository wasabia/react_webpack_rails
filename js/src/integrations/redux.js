import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux'

class ReduxIntegration {
  constructor() {
    this.store = null;
    this.mountedStore = null;
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

  registerStore(store) {
    this.store = store;
  }

  mountStore(props) {
    this.mountedStore = this.store(props);
  }

  getStore() {
    return this.mountedStore;
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

  createRootComponent(name, props) {
    const container = this.createContainer(name, props);
    return React.createElement(Provider, { store: this.getStore() }, container);
  }

  renderContainer(name, props, node) {
    const rootComponent = this.createRootComponent(name, props);
    render(rootComponent, node);
  }

  unmountContainer(node) {
    unmountComponentAtNode(node);
  }

  renderContainerToString(name, props) {
    const rootComponent = this.createRootComponent(name, props);
    renderToString(rootComponent);
  }

  get storeIntegrationWrapper() {
    return {
      mount: function _mount(node, payload) {
        this.mountStore(payload.props);
      }.bind(this)
    }
  }

  get containerIntegrationWrapper() {
    return {
      mount: function _mount(node, payload) {
        this.renderContainer(payload.name, payload.props, node);
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
