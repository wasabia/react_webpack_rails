require 'react_webpack_rails/view_helpers'
require 'react_webpack_rails/application_helper'

module ReactWebpackRails
  class Railtie < ::Rails::Railtie
    config.react = ActiveSupport::OrderedOptions.new
    # Sensible defaults. Can be overridden in application.rb.
    # Pass in an underscored hash but get a camelized hash:
    config.react.camelize_props = false
    config.react.shared = {}
    config.react.reset_node_on_every_request = true

    initializer 'react_webpack_rails.view_helpers' do
      ActionView::Base.send :include, ViewHelpers
    end
  end
end
