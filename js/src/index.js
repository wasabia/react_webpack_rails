import env from './env';
import nodes from './nodes';
import integrationsManager from './integrations-manager';
import react from './integrations/react';
import reactRouter from './integrations/react-router';
import version from './version';

export { react as react };
export { nodes as nodes };
export { integrationsManager as integrationsManager };
export { env as env };
export { reactRouter as reactRouter };


class RWR {
  constructor() {
    this.version = version;

    this.registerComponent = react.registerComponent;
    this.getComponent = react.getComponent;
    this.createComponent = react.createComponent;
    this.renderComponent = react.renderComponent;
    this.unmountComponent = react.unmountComponent;

    this.renderRouter = reactRouter.renderRouter;
    this.registerRouter = reactRouter.registerRouter;
    this.unmountRouter = reactRouter.unmountRouter;
    this.getRouter = reactRouter.getRouter;

    this.mountNodes = nodes.mountNodes;
    this.unmountNodes = nodes.unmountNodes;
  }

  run() {
    if (typeof(window) !== 'undefined') {
      window.RWR = this;
    } else {
      global.RWR = this;
    }
  }
}

export default new RWR;
