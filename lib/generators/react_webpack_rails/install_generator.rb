module ReactWebpackRails
  class InstallGenerator < Rails::Generators::Base
    desc 'Prepare files necessary to use react-webpack-rails gem in a rails app.'
    source_root File.expand_path('../templates', __FILE__)
    class_option :no_example, type: :boolean, default: false, desc: 'Skip generating example.'
    class_option :no_server_side, type: :boolean, default: false, desc: 'Skip node server setup.'
    class_option :no_hot_reload, type: :boolean, default: false, desc: 'Skip hot relaod setup generation.'
    class_option :no_karma_setup, type: :boolean, default: false, desc: 'Skip karma setup generation.'

    def generate_core
      generate 'react_webpack_rails:install:core --tmp_package'
    end

    def generate_hot_reload
      return if options.no_hot_reload
      generate 'react_webpack_rails:install:hot_reload --tmp_package'
    end

    def generate_server_side
      return if options.no_hot_reload
      generate 'react_webpack_rails:install:server_side --tmp_package'
    end

    def generate_karma_setup
      return if options.no_karma_setup
      generate 'react_webpack_rails:install:karma_setup --tmp_package'
    end

    def generate_example
      return if options.no_example
      example_generator = 'react_webpack_rails:install:example'
      example_generator += ' --no_server_side' if options.no_server_side
      generate example_generator
    end

    def copy_package
      create_file 'package.json', File.read(Rails.root.join('tmp/package.json'))
    end

    def cleanup
      remove_file('tmp/package.json')
    end
  end
end
