function _findDOMNodes(searchSelector) {
  var selector = searchSelector || '[' + RWR.ELEMENT_ATTR + ']';
  return $ ? $(selector) : document.querySelectorAll(selector);
}

function _nodeData(node) {
  var rawPayload = node.getAttribute(RWR.PAYLOAD_ATTR);
  var rawOptions = node.getAttribute(RWR.OPTIONS_ATTR);

  return {
    payload: rawPayload && JSON.parse(rawPayload),
    options: rawOptions && JSON.parse(rawOptions),
    integrationName: node.getAttribute(RWR.INTEGRATION_NAME_ATTR),
  };
}

function _mountNode(node) {
  var data = _nodeData(node);
  var config = {
    node: node,
    payload: data.payload,
  };
  var integration = RWR.integrations[data.integrationName]
  if (typeof(integration.mount) === 'function') {
    integration.mount(config, data.options);
  }
}

function _unmountNode(node) {
  var data = _nodeData(node);
  var config = {
    node: node,
    payload: data.payload,
  };

  var unmountFunction = RWR.integrations[data.integrationName].unmount;
  if (typeof(unmountFunction) === 'function') { unmountFunction(config, data.options); }
}

function mountNodes(searchSelector) {
  var nodes = _findDOMNodes(searchSelector);
  var i;
  for (i = 0; i < nodes.length; ++i) {
    _mountNode(nodes[i]);
  }
}

function unmountNodes(searchSelector) {
  var nodes = window.ReactRailsUJS._findDOMNodes(searchSelector);
  var i;

  for (i = 0; i < nodes.length; ++i) {
    _unmountNode(nodes[i]);
  }
  RWR.routerEnabled = false;
}

RWR.nodes = {
  mountNodes: mountNodes,
  unmountNodes: unmountNodes,
};
