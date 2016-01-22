module ReactWebpackRails
  class NodeRenderer
    NODE_URI = 'http://localhost:8080/'
    attr_reader :name, :props

    def initialize(component_name, props)
      @name = component_name
      @props = props
    end

    def call
      response = Net::HTTP.start(node_uri.host, node_uri.port) do |http|
        http.request(request)
      end
      if response.code.to_i >= 500
        fail Errors::NodeFailure, "You are retarded: #{response.body}"
      else
        response
      end
    end

    private

    def data_hash
      { name: name, props: props }
    end

    def node_uri
      URI(NODE_URI)
    end

    def request
      request = Net::HTTP::Post.new(node_uri)
      request.body = JSON.generate(data_hash)
      request
    end
  end
end
