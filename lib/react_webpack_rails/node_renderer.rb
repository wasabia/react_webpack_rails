module ReactWebpackRails
  class NodeRenderer
    NODE_URI = 'http://localhost:8080/'
    attr_reader :name, :props

    def initialize(component_name, props)
      @name = component_name
      @props = props
    end

    def call
      Net::HTTP.start(node_uri.host, node_uri.port) do |http|
        http.request(request)
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
      request.body = data_hash.to_json
      request
    end
  end
end
