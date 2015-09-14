module ReactWebpackRails
  module ViewHelpers
    # based on https://github.com/reactjs/react-rails/blob/master/lib/react/rails/view_helper.rb
    def react_component(name, props = {}, options = {}, &block)
      html_options = options.reverse_merge(data: {})
      html_options[:data].tap do |data|
        data[:react_class] = name
        data[:react_props] = (props.is_a?(String) ? props : props.to_json)
        data[:react_router] = options.delete(:react_router)
      end
      html_tag = html_options[:tag] || :div
      html_options.except!(:tag)

      content_tag(html_tag, '', html_options, &block)
    end

    def react_router(name, props = {})
      react_component(name, props, react_router: true)
    end
  end
end
