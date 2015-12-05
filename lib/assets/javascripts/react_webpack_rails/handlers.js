RWR.handlers = {
  _mountNodes: function _mountNodes() {
    RWR.nodes.mountNodes();
  },

  _unmountNodes: function _unmountNodes() {
    RWR.nodes.unmountNodes();
  },

  handleTurbolinksEvents: function handleTurbolinksEvents() {
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

      if (RWR.RAILS_ENV === 'development') {
        console.warn(RWR._messages.warnings.turbolinksVersion);
      }
    }
    handleEvent('page:change', RWR.handlers._mountNodes);
    handleEvent(unmountEvent, RWR.handlers_unmountNodes);
  },

  handleNativeEvents: function handleNativeEvents() {
    if ($) {
      $(RWR.handlers._mountNodes);
    } else {
      document.addEventListener('DOMContentLoaded', RWR.handlers._mountNodes);
    }
  },
};
