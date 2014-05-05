require 'bundler/capistrano'

set :application, "furtively"
set :repository,  "git@github.com:loganhasson/furtively.git"
set :user, "root"
set :branch, "master"
set :deploy_to, "/home/#{ user }/#{ application }"
set :use_sudo, false
# set :bundle_cmd, "rvmsudo bundle"
set :scm, :git
set :rvm_type, :system
set :app_ip, '107.170.93.147'

role :app, "#{app_ip}"
default_run_options[:pty] = true

namespace :deploy do
  # task :source_rvm do
  #   run "source /etc/profile.d/rvm.sh && rvm reload"
  # end

  task :kill_unicorn do
    run "if sudo kill -0 `cat #{shared_path}/pids/unicorn.pid`> /dev/null 2>&1; then sudo kill -9 `cat #{shared_path}/pids/unicorn.pid`; else echo 'Unicorn is not running'; fi"
  end

  task :symlink_api_credentials, :roles => :app do
    run "ln -nfs #{shared_path}/application.yml #{release_path}/config/application.yml"
  end

  task :migrate, :roles => :app do
    run "cd #{current_path} && rake db:migrate RAILS_ENV=development"
  end
 
  task :start do ; end
  task :stop do ; end
  task :restart do
    run "cd #{current_path} && rvmsudo unicorn_rails -c config/unicorn.rb -D -E development"
  end
end

# before "deploy:update", "deploy:source_rvm"
after "deploy:finalize_update", "deploy:kill_unicorn"
before "deploy:restart", "deploy:symlink_api_credentials", "deploy:migrate"