RWR.nodes = {
  _findDOMNodes: function _findDOMNodes(searchSelector) {
    var selector = searchSelector || '[' + RWR.ELEMENT_ATTR + ']';
    return $ ? $(selector) : document.querySelectorAll(selector);
  },

  _nodeData: function _nodeData(node) {
    var rawPayload = node.getAttribute(RWR.PAYLOAD_ATTR);
    var rawOptions = node.getAttribute(RWR.OPTIONS_ATTR);

    return {
      payload: rawPayload && JSON.parse(rawPayload),
      options: rawOptions && JSON.parse(rawOptions),
      integrationName: node.getAttribute(RWR.INTEGRATION_NAME_ATTR),
    };
  },

  _mountNode: function _mountNode(node) {
    var data = RWR.nodes._nodeData(node);
    var config = {
      node: node,
      payload: data.payload,
    };
    var integration = RWR.integrations[data.integrationName];
    if (!integration) {
      console.error(RWR._messages.errors.missingIntegration(data.integrationName))
    } else if (typeof(integration.mount) === 'function') {
      integration.mount(config, data.options);
    }
  },

  _unmountNode: function _unmountNode(node) {
    var data = RWR.nodes._nodeData(node);
    var config = {
      node: node,
      payload: data.payload,
    };

    var unmountFunction = RWR.integrations[data.integrationName].unmount;
    if (typeof(unmountFunction) === 'function') { unmountFunction(config, data.options); }
  },

  mountNodes: function mountNodes(searchSelector) {
    var nodes = RWR.nodes._findDOMNodes(searchSelector);
    var i;
    for (i = 0; i < nodes.length; ++i) {
      RWR.nodes._mountNode(nodes[i]);
    }
  },

  unmountNodes: function unmountNodes(searchSelector) {
    var nodes = window.ReactRailsUJS._findDOMNodes(searchSelector);
    var i;

    for (i = 0; i < nodes.length; ++i) {
      RWR.nodes._unmountNode(nodes[i]);
    }
  }
}
