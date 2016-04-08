module ReactWebpackRails
  module Install
    require 'generators/react_webpack_rails/merge_helpers'

    class HotReloadGenerator < Rails::Generators::Base
      include MergeHelpers
      desc 'Add hot reload setup'
      source_root File.expand_path('../../templates', __FILE__)

      class_option :tmp_package,
                   type: :boolean,
                   default: false,
                   desc: 'Force update tmp/package.json instead package.json'

      def package
        merge_options = options.tmp_package ? { package_file: 'tmp/package.json', force: true } : {}
        merge_into_package 'packages/hot-reload.json', merge_options
      end

      def hot_dev_config
        copy_file 'webpack/hot-dev.config.js', 'webpack/hot-dev.config.js'
      end

      def partial
        copy_file 'partial/_react_hot_assets.html.erb', 'app/views/layouts/_react_hot_assets.html.erb'
        settings = template_language_settings("render 'layouts/react_hot_assets'")

        inject_into_file settings[:layout_file], settings[:parsed_command], after: "#{settings[:body_tag]}\n"
      end

      private

      def template_language_settings(command)
        layout_file = Dir.glob('app/views/layouts/application.*').first

        case File.extname(layout_file)
        when '.slim'
          return { layout_file: layout_file, body_tag: 'body', parsed_command: "  = #{command}\n" }
        when '.haml'
          return { layout_file: layout_file, body_tag: '%body', parsed_command: "  = #{command}\n" }
        else
          return { layout_file: layout_file, body_tag: '<body>', parsed_command: "<%= #{command} %>\n" }
        end
      end
    end
  end
end
