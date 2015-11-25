module ReactWebpackRails
  module ViewHelpers
    # based on https://github.com/reactjs/react-rails/blob/master/lib/react/rails/view_helper.rb
    def react_element(name, element_type, props = {}, options = {}, &block)
      html_options = options.reverse_merge(data: {})
      html_options[:data].tap do |data|
        data[:react_class] = name
        data[:react_props] = (props.is_a?(String) ? props : props.to_json)
        data[:element_type] = element_type
      end
      html_tag = html_options[:tag] || :div
      html_options.except!(:tag)

      content_tag(html_tag, '', html_options, &block)
    end

    def react_component(name, props = {}, options = {})
      react_element(name, :component, props, options)
    end

    def react_router(name)
      react_element(name, :router)
    end

    def alt_store(name, data)
      react_element(name, :alt_store, data)
    end
  end
end
