require 'react_webpack_rails/view_helpers'

module ReactWebpackRails
  class Railtie < ::Rails::Railtie
    config.react = ActiveSupport::OrderedOptions.new
    # Sensible defaults. Can be overridden in application.rb
    config.react.camelize_props = false # pass in an underscored hash but get a camelized hash

    initializer 'react_webpack_rails.view_helpers' do
      ActionView::Base.send :include, ViewHelpers
    end
  end
end
