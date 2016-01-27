module ReactWebpackRails
  module NodeHelpers
    def node_uri(path = '')
      URI(Rails.application.config.react.node_server).merge(path)
    end
  end
end
