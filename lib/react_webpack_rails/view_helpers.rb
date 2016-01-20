module ReactWebpackRails
  module ViewHelpers
    # based on https://github.com/reactjs/react-rails/blob/master/lib/react/rails/view_helper.rb
    def react_element(integration_name, payload = {}, options = {}, &block)
      html_options = { data: {} }
      payload = camelize_props_key(payload) if Rails.application.config.react.camelize_props
      html_options[:data].tap do |data|
        data[:integration_name] = integration_name
        data[:options] = options.except(:tag)
        data[:payload] = (payload.is_a?(String) ? payload : payload.to_json)
        data[:react_element] = true
      end
      html_tag = options[:tag] || :div

      content_tag(html_tag, '', html_options, &block)
    end

    def react_component(name, props = {}, options = {})
      NodeRenderer.new(name, props).call
      react_element('react-component', props, options.merge(name: name))
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
  end
end
