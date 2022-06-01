# I. REACT.JS CLIENT
npx create-react-app --use-npm client
cd client; npm i -s node-sass react-router-dom axios bootstrap reactstrap 

# II. RUBY ON RAILS SERVER
# https://rubygems.org/search?query=mongoid
# https://medium.com/@bravemaster619/react-ror-mongodb-how-to-decouple-frontend-and-backend-using-react-and-ruby-on-rails-fc6adf40376b
# https://docs.mongodb.com/mongoid/current/tutorials/getting-started-rails/
# https://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html
gem i rails -v '~> 6.0.0'
sudo npm i -g yarn
rails new server --api --skip-bundle --skip-active-record --skip-test --skip-system-test
# server/Gemfile
# # Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
# gem 'rails', '~> 6.0.4', '>= 6.0.4.1'
# # Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

# # Use dotenv
# gem 'dotenv-rails'

# # Json web token
# gem 'jwt'

# # Use MongoDB database
# gem 'mongoid', '~> 7.0.5'

# group :development, :test do
# ...

cd server; bundle install
# server/config/initializers/cors.rb

# Rails.application.config.middleware.insert_before 0, Rack::Cors do
#   allow do
#     origins ENV['WEB']
#     resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
#   end
# end

rails g mongoid:config is16
# server/config/mongoid.yml

# development:
#   clients:
#     default:
#       uri: <%= ENV['MONGODB'] %>
#       options:
#         server_selection_timeout: 5

rails g scaffold user name:string surname:string email:string
rails g scaffold code email:string passcode:string
rails g scaffold Message body:string
rails g scaffold chat title:String messages:Array _uids:Array _mids:Array
rails g channel chats
rails g mailer code
rake db:migrate
gem update
rails app:update
clear; rails s
