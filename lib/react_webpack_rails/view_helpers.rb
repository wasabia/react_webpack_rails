module ReactWebpackRails
  module ViewHelpers
    def react_element(integration_name, payload = {}, html_options = {}, &block)
      data = {
        integration_name: integration_name,
        payload: payload,
        react_element: true
      }
      html_options = html_options.merge(data: data)
      html_tag = html_options.delete(:tag) || :div
      content_tag(html_tag, '', html_options, &block)
    end

    def react_component(name, raw_props = {}, options = {})
      props = raw_props.as_json
      props = camelize_props_key(props) if Rails.application.config.react.camelize_props
      if server_side(options.delete(:server_side))
        result = NodeIntegrationRunner.new('react-component', props: props, name: name).run
        react_element('react-component', { props: props, name: name }, options) do
          result.html_safe
        end
      else
        react_element('react-component', { props: props, name: name }, options)
      end
    end

    def react_router(name)
      react_element('react-router', name: name)
    end

    def redux_store(name, raw_props = {}, options = {})
      props = raw_props.as_json
      props = camelize_props_key(props) if Rails.application.config.react.camelize_props
      react_element('redux-store', { name: name, props: props }, options)
    end

    def redux_container(name, options = {})
      store_name = options.delete(:store_name)
      react_element('redux-container', { name: name, storeName: store_name }, options)
    end

    private

    def camelize_props_key(props)
      return props unless props.is_a?(Hash)
      props.inject({}) do |h, (k, v)|
        h[k.to_s.camelize(:lower)] = v.is_a?(Hash) ? camelize_props_key(v) : v
        h
      end
    end

    def server_side(server_side)
      server_side.nil? ? Rails.application.config.react.server_side : server_side
    end
  end
end
