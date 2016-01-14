# Passing props

#### Format

You can pass multiple props of different types:

**example:**  
```ruby
<%= react_component('Veggies',
        Endpoint: vegetables_path,
        Placeholder: 'Choose vegetable',
        User: MySerializer.new(@user)
        Store: @store,
        Address: @store_location.to_json
        Rating: 4) %>
```

However, all variables that are not strings (or in JSON  format in particular) will be automatically parsed `.to_json`.

**note:**  
Be careful when passing rails models there - all its data accessible after `.to_json` will be exposed as data-attributes and you don't want to show sensitive data like password hashes in there.  
We  recommend using serializers to control it - [ActiveModelSerializers](https://github.com/rails-api/active_model_serializers) or [Jbuilder](https://github.com/rails/jbuilder) are a few of the possibilities.

#### Naming

By default variable name is passed unchanged, but you can set `camelize_props` option to `true` and pass a variable with e.g. underscored name from Rails and then get a camelized version in React: 

```ruby
config.react.camelize_props = true # default is false
```