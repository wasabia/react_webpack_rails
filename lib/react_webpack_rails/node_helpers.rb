module ReactWebpackRails
  module NodeHelpers
    NODE_URI = 'http://localhost:8080/'

    def node_uri
      URI(NODE_URI)
    end
  end
end
