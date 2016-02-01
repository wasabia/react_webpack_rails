Rails.application.configure do |config|
  config.react.node_server = 'http://localhost:8080/'
  config.react.server_side = false
end
