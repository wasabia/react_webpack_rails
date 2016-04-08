module ReactWebpackRails
  module Services
    class CamelizeKeys
      def self.call(props)
        return props unless props.is_a?(Hash)
        props.inject({}) do |h, (k, v)|
          h[k.to_s.camelize(:lower)] = v.is_a?(Hash) ? self.call(v) : v
          h
        end
      end
    end
  end
end
