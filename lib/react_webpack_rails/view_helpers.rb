module ReactWebpackRails
  module ViewHelpers
    def react_element(integration_name, payload = {}, options = {}, html_options = {}, &block)
      payload = camelize_props_key(payload) if Rails.application.config.react.camelize_props
      data = {
        integration_name: integration_name,
        options: options,
        payload: (payload.is_a?(String) ? payload : payload.to_json),
        react_element: true
      }
      html_options = html_options.merge(data: data)
      html_tag = html_options.delete(:tag) || :div
      content_tag(html_tag, '', html_options, &block)
    end

    def react_component(name, props = {}, options = {})
      if server_side(options.delete(:server_side))
        result = NodeRenderer.new('react-component', props: props, name: name).run
        react_element('react-component', props, { name: name }, options) do
          result.body.html_safe
        end
      else
        react_element('react-component', props, { name: name }, options)
      end
    end

    def react_router(name)
      react_element('react-router', {}, name: name)
    end

    private

    def camelize_props_key(props)
      return props unless props.is_a?(Hash)
      props.each_with_object({}) do |h, (k, v)|
        h[k.to_s.camelize(:lower)] = v.is_a?(Hash) ? camelize_props_key(v) : v
        h
      end
    end

    def server_side(server_side)
      server_side.nil? ? Rails.application.config.react.server_side : server_side
    end
  end
end
