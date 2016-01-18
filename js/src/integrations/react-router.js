import ReactDOM from 'react-dom';

class ReactRouterIntegration {
  constructor() {
    this.routers = {};
    this.enabled = false;
    this.registerRouter = this.registerRouter.bind(this);
    this.getRouter = this.getRouter.bind(this);
    this.renderRouter = this.renderRouter.bind(this);
  }

  registerRouter(name, routes) {
    this.routers[name] = routes;
  }

  getRouter(name) {
    return this.routers[name];
  }

  renderRouter(name, element) {
    debugger;
    if (this.enabled === true) {
      throw new Error(
        `Error when renering ${name}\n\trenderRouter: can't render more than one router.`
      );
    }
    this.enabled = true;
    ReactDOM.render(this.getRouter(name), element);
  }

  unmountRouter(element) {
    ReactDOM.unmountComponentAtNode(element);
    this.enabled = false;
  }

  get integrationWrapper() {
    return {
      mount: function _mount(config, options) {
        this.renderRouter(options.name, config.node);
      }.bind(this),

      unmount: function _unmount(config) {
        this.unmountRouter(config.node);
      }.bind(this),
    };
  }
}

export default new ReactRouterIntegration;
