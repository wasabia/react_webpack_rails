module ReactWebpackRails
  class NodeRenderer
    NODE_URI = 'http://localhost:8080/'
    attr_reader :name, :props

    def initialize(component_name, props)
      @name = component_name
      @props = props
    end

    def call
      @response = Net::HTTP.start(node_uri.host, node_uri.port) do |http|
        http.request(request)
      end
    rescue => e
      raise Errors::NodeFailure, e.to_s # error_data
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
      request.body = data_hash.to_json
      request
    end

    def error_data
      'error data'
      # JSON.parse(@response.body).slice('error', 'error_description').to_s
    end
  end
end
