module ReactWebpackRails
  module ViewHelpers
    # based on https://github.com/reactjs/react-rails/blob/master/lib/react/rails/view_helper.rb
    def react_element(integration_name, payload = {}, options = {}, &block)
      html_options = { data: {} }
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
      react_element('react-component', props, options.merge(name: name))
    end

    def react_router(name)
      react_element('react-router', {}, name: name)
    end
  end
end
