module ReactWebpackRails
  class InstallGenerator < Rails::Generators::Base
    source_root File.expand_path('../templates', __FILE__)

    def generate_layout
      copy_file 'webpack.config.js', 'webpack.config.js'
      copy_file 'karma.conf.js', 'karma.conf.js'
      copy_file 'tests.webpack.js', 'tests.webpack.js'
      copy_file 'index.js', 'app/react/index.js'
      copy_file 'hello-world.jsx', 'app/react/components/hello-world.jsx'
      template 'package.json.erb', 'package.json'
    end

    private

    def file_name
      layout_name.underscore
    end
  end
end
