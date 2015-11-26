function _mountNodes() {
  RWR.nodes.mountNodes();
}

function _unmountNodes() {
  RWR.nodes.unmountNodes();
}

function handleTurbolinksEvents() {
  var handleEvent;
  var unmountEvent;

  if ($) {
    handleEvent = function handleJqueryEvent(eventName, callback) {
      $(document).on(eventName, callback);
    };
  } else {
    handleEvent = function handleNoJqueryEvent(eventName, callback) {
      document.addEventListener(eventName, callback);
    };
  }

  if (Turbolinks.EVENTS) {
    unmountEvent = Turbolinks.EVENTS.BEFORE_UNLOAD;
  } else {
    unmountEvent = 'page:receive';
    Turbolinks.pagesCached(0);

    if (RWR.RAILS_ENV_DEVELOPMENT) {
      console.warn('The Turbolinks cache has been disabled (Turbolinks >= 2.4.0 is recommended)');
    }
  }
  handleEvent('page:change', _mountNodes);
  handleEvent(unmountEvent, _unmountNodes);
}

function handleNativeEvents() {
  if ($) {
    $(_mountNodes);
  } else {
    document.addEventListener('DOMContentLoaded', _mountNodes);
  }
}

RWR.handlers = {
  handleTurbolinksEvents: handleTurbolinksEvents,
  handleNativeEvents: handleNativeEvents,
};
