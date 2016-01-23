module ReactWebpackRails
  class NodeRenderer
    NODE_URI = 'http://localhost:8080/'

    def initialize(integration_name, payload)
      @integration_name = integration_name
      @payload = payload
    end

    def run
      response = Net::HTTP.start(node_uri.host, node_uri.port) do |http|
        http.request(request)
      end
      if response.code.to_i >= 500
        fail Errors::NodeFailure, response.body
      else
        response
      end
    end


    def reset
      response = Net::HTTP.start(node_uri.host, node_uri.port) do |http|
        http.request(Net::HTTP::Post.new(URI(NODE_URI + 'reset')))
      end
      if response.code.to_i >= 500
        fail Errors::NodeFailure, response.body
      else
        response
      end
    end

    private

    attr_reader :integration_name, :payload

    def data_hash
      { integrationName: integration_name, payload: payload }
    end

    def node_uri
      URI(NODE_URI)
    end

    def request
      request = Net::HTTP::Post.new(URI(NODE_URI + 'run'))
      request.body = JSON.generate(data_hash)
      request
    end
  end
end
