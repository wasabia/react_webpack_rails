import reactIntegration from './integrations/react';
import ReactRouterIntegration from './integrations/react-router';

class IntegrationsManager {
  constructor() {
    this.integrations = {
      'react-component': reactIntegration.integrationWrapper,
      'react-router': ReactRouterIntegration.integrationWrapper,
    };
  }

  get(name) {
    // handle missing one here;
    return this.integrations[name];
  }

  register(name, integration) {
    this.integrations[name] = integration;
  }
}

export default new IntegrationsManager;
