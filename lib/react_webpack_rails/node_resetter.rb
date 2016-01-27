module ReactWebpackRails
  class NodeResetter
    class << self
      include NodeHelpers

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

      private

      def request
        Net::HTTP::Post.new(reset_endpoint)
      end

      def reset_endpoint
        node_uri('reset')
      end
    end
  end
end
