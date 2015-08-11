module ReactWebpackRails
  module ViewHelpers
    # based on https://github.com/reactjs/react-rails/blob/master/lib/react/rails/view_helper.rb
    def react_component(name, props = {}, options = {}, &block)
      options = { tag: options } if options.is_a?(Symbol)

      html_options = options.reverse_merge(data: {})
      html_options[:data].tap do |data|
        data[:react_class] = name
        data[:react_props] = (props.is_a?(String) ? props : props.to_json)
      end
      html_tag = html_options[:tag] || :div
      html_options.except!(:tag)

      content_tag(html_tag, '', html_options, &block)
    end
  end
end
