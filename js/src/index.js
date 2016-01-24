import env from './env';
import nodes from './nodes';
import integrationsManager from './integrations-manager';
import react from './integrations/react';
import reactRouter from './integrations/react-router';

export { react as react };
export { nodes as nodes };
export { integrationsManager as integrationsManager };
export { env as env };
export { reactRouter as reactRouter };

export default {
  registerComponent: react.registerComponent,
  getComponent: react.getComponent,
  createComponent: react.createComponent,
  renderComponent: react.renderComponent,
  unmountComponent: react.unmountComponent,

  renderRouter: reactRouter.renderRouter,
  registerRouter: reactRouter.registerRouter,
  unmountRouter: reactRouter.unmountRouter,
  getRouter: reactRouter.getRouter,

  mountNodes: nodes.mountNodes,
  unmountNodes: nodes.unmountNodes,
};
