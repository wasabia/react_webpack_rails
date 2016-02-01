module ReactWebpackRails
  class InstallGenerator < Rails::Generators::Base
    desc 'Prepare files necessary to use react-webpack-rails gem in a rails app.'
    source_root File.expand_path('../templates', __FILE__)
    class_option :example, type: :boolean, default: true, desc: 'Include example component and test files'
    class_option :hot_reload, type: :boolean, default: false, desc: 'Activate hot reload'
    class_option :router, type: :boolean, default: true, desc: 'Add and expose react-router globally'
    class_option :server_side, type: :boolean, default: false, desc: 'Set server_side global option'
    class_option :server_side_example, type: :boolean, default: false, desc: 'Include fully functional server side rendering example'

    def generate_layout
      copy_file '.babelrc', '.babelrc'
      copy_file 'karma.conf.js', 'karma.conf.js'
      copy_file 'react/node_server.js', 'app/react/node_server.js'
      copy_file 'partial/_react_hot_assets.html.erb', 'app/views/layouts/_react_hot_assets.html.erb'

      copy_file 'forever/development.json', 'forever/development.json'
      copy_file 'forever/production.json', 'forever/production.json'

      copy_file 'webpack.config.js', 'webpack.config.js'
      copy_file 'webpack/dev.config.js', 'webpack/dev.config.js'
      copy_file 'webpack/hot-dev.config.js', 'webpack/hot-dev.config.js'
      copy_file 'webpack/production.config.js', 'webpack/production.config.js'
      copy_file 'webpack/tests.config.js', 'webpack/tests.config.js'

      create_file 'app/assets/javascripts/react_bundle.js'

      template 'package.json.erb', 'package.json'
      template 'react/index.js.erb', 'app/react/index.js'

      if options.example
        copy_file 'react/components/hello-world-test.jsx', 'app/react/components/hello-world-test.jsx'
        copy_file 'react/components/hello-world.jsx', 'app/react/components/hello-world.jsx'
      else
        create_file 'app/react/components/.keep'
      end

      if options.server_side
      end
    end

    private

    def file_name
      layout_name.underscore
    end
  end
end
