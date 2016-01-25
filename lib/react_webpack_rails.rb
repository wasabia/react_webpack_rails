require 'react_webpack_rails/version'
if defined?(Rails)
  require 'react_webpack_rails/engine'
  require 'react_webpack_rails/railtie'
  require 'react_webpack_rails/node_helpers'
  require 'react_webpack_rails/node_renderer'
  require 'react_webpack_rails/node_resetter'
  require 'react_webpack_rails/errors/base'
  require 'react_webpack_rails/errors/node_failure'
  require 'react_webpack_rails/application_helper'

  if defined? ActionController::Base
    ActionController::Base.class_eval do
      include ReactWebpackRails::ApplicationHelper
    end
  end
end