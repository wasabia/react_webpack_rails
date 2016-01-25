module ReactWebpackRails
  module ApplicationHelper
    def reset_node
      return unless Rails.application.config.react.reset_node_on_every_request
      ReactWebpackRails::NodeResetter.run
    end
  end
end
