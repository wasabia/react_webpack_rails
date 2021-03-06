require "bundler/gem_tasks"
require "rspec/core/rake_task"

namespace :test do
  desc 'Run all tests'
  task all: [:node, :gem, :rails3, :rails4] do
    puts 'Finished all tests, yay!'
  end

  desc 'Run node package tests'
  task :node do
    sh %Q(npm test)
  end

  desc 'Run gem tests'
  task :gem do
    sh %Q(bundle exec rspec spec/react_webpack_rails_spec.rb spec/react_webpack_rails)
  end

  desc 'Run rspec for rails3 application'
  task :rails3 do
    Bundler.with_clean_env do
      sh %Q(cd spec/rails3_dummy_app && npm run build && bundle exec rspec && npm test)
    end
  end

  desc 'Run rspec for rails4 application'
  task :rails4 do
    Bundler.with_clean_env do
      sh %Q(cd spec/rails4_dummy_app && npm run build && bundle exec rspec && npm test)
    end
  end
end

task default: 'test:all'

namespace :setup do
  desc 'Prepare every environment'
  task all: [:node, :gem, :rails3, :rails4] do
    puts 'Prepared all, yay!'
  end

  desc 'Prepare node module dependencies'
  task :node do
    sh %Q(npm install)
  end

  desc 'Prepare gem dependencies'
  task :gem do
    sh %Q(bundle install)
  end

  desc 'Prepare rails3 test app dependencies'
  task :rails3 do
    sh %Q(npm install && cd spec/rails3_dummy_app && npm install && bundle install)
  end

  desc 'Prepare rails4 test app dependencies'
  task :rails4 do
    sh %Q(npm install && cd spec/rails4_dummy_app && npm install && bundle install)
  end
end
