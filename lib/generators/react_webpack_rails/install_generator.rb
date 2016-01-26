module ReactWebpackRails
  class InstallGenerator < Rails::Generators::Base
    desc 'Prepare files necessary to use react-webpack-rails gem in a rails app.'
    source_root File.expand_path('../templates', __FILE__)
    class_option :example, type: :boolean, default: true, desc: 'Include example component and test files.'
    class_option :router, type: :boolean, default: true, desc: 'Add and expose react-router globally.'


    def generate_layout
      copy_file '.babelrc', '.babelrc'
      copy_file 'webpack.config.js', 'webpack.config.js'
      copy_file 'webpack/dev.config.js', 'webpack/dev.config.js'
      copy_file 'webpack/hot-dev.config.js', 'webpack/hot-dev.config.js'
      copy_file 'webpack/production.config.js', 'webpack/production.config.js'
      copy_file 'karma.conf.js', 'karma.conf.js'
      copy_file 'webpack/tests.config.js', 'webpack/tests.config.js'
      copy_file 'partial/_react_hot_assets.html.erb', 'app/views/layouts/_react_hot_assets.html.erb'
      template 'react/index.js.erb', 'app/react/index.js'
      create_file 'app/assets/javascripts/react_bundle.js'
      if options.example
        copy_file 'react/components/hello-world.jsx', 'app/react/components/hello-world.jsx'
        copy_file 'react/components/hello-world-test.jsx', 'app/react/components/hello-world-test.jsx'
      else
        create_file 'app/react/components/.keep'
      end
      template 'package.json.erb', 'package.json'
    end

    private

    def file_name
      layout_name.underscore
    end
  end
end
