module ReactWebpackRails
  module Install
    class CoreGenerator < Rails::Generators::Base
      desc 'Create basic files structure, prepare package.json and webpack setup'
      source_root File.expand_path('../../templates', __FILE__)

      class_option :tmp_package,
                   type: :boolean,
                   default: false,
                   desc: 'Force update tmp/package.json instead package.json'


      def base
        copy_file '.babelrc', '.babelrc'
        create_file 'app/assets/javascripts/react_bundle.js'
        template 'react/index.js', 'app/react/index.js'
      end

      def structure
        create_file 'app/react/components/.keep'
      end

      def package
        if options.tmp_package
          copy_file 'packages/core.json', 'tmp/package.json', force: true
        else
          copy_file 'packages/core.json', 'package.json'
        end
      end

      def webpack
        copy_file 'webpack.config.js', 'webpack.config.js'
        copy_file 'webpack/dev.config.js', 'webpack/dev.config.js'
        copy_file 'webpack/production.config.js', 'webpack/production.config.js'
      end
    end
  end
end
