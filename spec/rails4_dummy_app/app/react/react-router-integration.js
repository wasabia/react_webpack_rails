import ReactDOM from 'react-dom';
import { integrationsManager } from 'react-webpack-rails';

class ReactRouterIntegration {
  constructor() {
    this.routers = {};
    this.enabled = false;
    this.registerRouter = this.registerRouter.bind(this);
    this.getRouter = this.getRouter.bind(this);
    this.renderRouter = this.renderRouter.bind(this);
  }

  registerRouter(name, route) {
    this.routers[name] = route;
  }

  getRouter(name) {
    return this.routers[name];
  }

  renderRouter(name, props, node) {
    if (this.enabled === true) {
      throw new Error(
        `Error when rendering ${name}\n\trenderRouter: can't render more than one router.`
      );
    }
    this.enabled = true;

    let router = this.getRouter(name);
    router = typeof(router) === 'function' ? router(props) : router;
    ReactDOM.render(router, node);
  }

  unmountRouter(node) {
    ReactDOM.unmountComponentAtNode(node);
    this.enabled = false;
  }

  get integrationWrapper() {
    return {
      mount: function _mount(node, payload) {
        this.renderRouter(payload.name, payload.props, node);
      }.bind(this),

      unmount: function _unmount(node) {
        this.unmountRouter(node);
      }.bind(this),
    };
  }

  run() {
    integrationsManager.register('react-router', this.integrationWrapper);
  }
}

export default new ReactRouterIntegration;
