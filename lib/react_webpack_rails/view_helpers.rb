require_relative 'services/camelize_keys'

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
      props = Services::CamelizeKeys.call(props) if Rails.application.config.react.camelize_props
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
      deprecation_warning
      react_element('react-router', name: name)
    end

    private

    def server_side(server_side)
      server_side.nil? ? Rails.application.config.react.server_side : server_side
    end

    def deprecation_warning
      message = [
        "\nDEPRECATION WARNING - since v0.3.0:",
        "current integration with react-router was extracted and moved to external plugin.",
        "Use https://github.com/netguru/rwr-react_router instead.\n\n",
      ]

      warn message.join("\n")
    end
  end
end
