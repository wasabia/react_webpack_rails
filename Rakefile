require "bundler/gem_tasks"
require "rspec/core/rake_task"

namespace :spec do
  desc 'Run all tests'
  task all: [:gem, :rails3, :rails4] do
    puts 'Finished all tests, yay!'
  end

  desc 'Run gem tests'
  task :gem do
    sh %Q(bundle exec rspec spec/react_webpack_rails_spec.rb)
  end

  desc 'Run rspec for rails3 application'
  task :rails3 do
    sh %Q(cd spec/rails3_dummy_app && npm run build && bundle exec rspec)
  end

  desc 'Run rspec for rails4 application'
  task :rails4 do
    sh %Q(cd spec/rails4_dummy_app && npm run build && bundle exec rspec)
  end
end

task default: 'spec:all'
