module ReactWebpackRails
  class InstallGenerator < Rails::Generators::Base
    source_root File.expand_path('../templates', __FILE__)
    class_option :example, type: :boolean, default: true, desc: 'Include example component and test files.'
    class_option :router, type: :boolean, default: true, desc: 'Add and expose react-router globally.'
    class_option :redux, type: :boolean, default: false, desc: 'Add redux with directory structure.'

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
      if options.redux
        copy_file 'react/store/configureStore.js', 'app/react/store/configureStore.js'
        copy_file 'react/reducers/index.js', 'app/react/reducers/index.js'
        copy_file 'react/containers/DevTools.js', 'app/react/containers/DevTools.js'
        create_file 'app/react/actions/.keep'
      end
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
