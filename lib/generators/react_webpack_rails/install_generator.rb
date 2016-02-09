module ReactWebpackRails
  class InstallGenerator < Rails::Generators::Base
    desc 'Prepare files necessary to use react-webpack-rails gem in a rails app.'
    source_root File.expand_path('../templates', __FILE__)
    class_option :example, type: :boolean, default: true, desc: 'Add example'
    class_option :server_side, type: :boolean, default: true, desc: 'Add node server setup.'
    class_option :hot_reload, type: :boolean, default: true, desc: 'Add hot relaod setup generation.'
    class_option :karma_setup, type: :boolean, default: true, desc: 'Add karma setup generation.'
    class_option :react_router, type: :boolean, default: false, desc: 'Install react router'

    def generate_core
      generate 'react_webpack_rails:install:core --tmp_package'
    end

    def generate_hot_reload
      return unless options.hot_reload
      generate 'react_webpack_rails:install:hot_reload --tmp_package'
    end

    def generate_server_side
      return unless options.server_side
      generate 'react_webpack_rails:install:server_side --tmp_package'
    end

    def generate_karma_setup
      return unless options.karma_setup
      generate 'react_webpack_rails:install:karma_setup --tmp_package'
    end

    def generate_example
      return unless options.example
      example_generator = 'react_webpack_rails:install:example'
      example_generator += ' --no_server_side' if options.no_server_side
      generate example_generator
    end

    def generate_react_router
      return unless options.react_router
      generate 'react_webpack_rails:install:react_router --tmp_package'
    end

    def copy_package
      create_file 'package.json', File.read(Rails.root.join('tmp/package.json'))
    end

    def cleanup
      remove_file('tmp/package.json')
    end
  end
end
