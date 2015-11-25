function registerComponent(name, component) {
  RWR.components[name] = component;
}

function getComponent(name) {
  return RWR.components[name];
}

function createComponent(name, props) {
  var constructor = getComponent(name);
  return React.createElement(constructor, props);
}

function renderComponent(name, props, element) {
  var component = createComponent(name, props);
  RWR.reactDOM().render(component, element);
}

function unmountComponent(node) {
  RWR.reactDOM().unmountComponentAtNode(node);
}

function _findDOMNodes(searchSelector) {
  var selector = searchSelector || '[' + RWR.CLASS_NAME_ATTR + ']';
  return $ ? $(selector) : document.querySelectorAll(selector);
}

function _mountNode(node) {
  var className = node.getAttribute(RWR.CLASS_NAME_ATTR);
  var propsJson = node.getAttribute(RWR.PROPS_ATTR);
  var props = propsJson && JSON.parse(propsJson);
  var elementType = node.getAttribute(RWR.ELEMENT_TYPE_ATTR);

  switch (elementType) {
  case 'router':
    RWR.routerHelpers.renderRouter(className, node);
    break;
  case 'component':
    RWR.reactHelpers.renderComponent(className, props, node);
    break;
  case 'alt_store':
    RWR.altHelpers.altStore(className, props);
    break;
  default:
    throw new Error('Error while rendering' + className + ". \nType '" + elementType + "' not supported.");
  }
}

function mountNodes(searchSelector) {
  var nodes = _findDOMNodes(searchSelector);
  var i;
  for (i = 0; i < nodes.length; ++i) {
    _mountNode(nodes[i]);
  }
}

function unmountNodes(searchSelector) {
  var nodes = _findDOMNodes(searchSelector);
  var i;

  for (i = 0; i < nodes.length; ++i) {
    unmountComponent(nodes[i]);
  }
  RWR.routerEnabled = false;
}

RWR.reactHelpers = {
  registerComponent: registerComponent,
  getComponent: getComponent,
  createComponent: createComponent,
  renderComponent: renderComponent,
  unmountComponent: unmountComponent,
  mountNodes: mountNodes,
  unmountNodes: unmountNodes,
};
