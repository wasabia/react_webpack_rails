require 'react_webpack_rails/view_helpers'

module ReactWebpackRails
  class Railtie < ::Rails::Railtie
    # Sensible defaults. Can be overridden in application.rb.

    # gem related config default:
    config.rwr = ActiveSupport::OrderedOptions.new
    config.rwr.node_server_host = 'http://localhost:8081/'

    # react integration related config default:
    config.react = ActiveSupport::OrderedOptions.new
    config.react.camelize_props = false
    config.react.server_side = false
    config.react.shared = {}

    initializer 'react_webpack_rails.view_helpers' do
      ActionView::Base.send :include, ViewHelpers
    end
  end
end
