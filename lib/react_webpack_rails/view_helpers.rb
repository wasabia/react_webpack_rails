module ReactWebpackRails
  module ViewHelpers
    # based on https://github.com/reactjs/react-rails/blob/master/lib/react/rails/view_helper.rb
    def react_element(integration_name, payload = {}, options = {}, &block)
      html_options = options.reverse_merge(data: {})
      html_options[:data].tap do |data|
        data[:react_element] = true
        data[:integration_name] = integration_name
        data[:payload] = payload
        data[:options] = options
      end
      html_tag = html_options[:tag] || :div
      html_options.except!(:tag)

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
