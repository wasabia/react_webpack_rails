# Ruby


* ### react_component

  ```ruby
  react_component(String component_name[, Object props])
  ```

  Creates DOM node with props as data attributes in rendered view so ReactRailsUJS can grab it and mount proper  component.

  ##### example:

  ```ruby
  <%= react_component('MyComponentName', MySerializer.new(my_data)) %>
  ```

  **note:** Props Object will be parsed to JSON. Be careful when passing rails models there - all its data accessible after `.to_json` will be exposed as data-attributes. We  recommend using serializers to control it.
