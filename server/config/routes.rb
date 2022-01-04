Rails.application.routes.draw do
  resources :chats
  resources :codes
  resources :users
  resources :profiles
  post 'auth/login', to: 'auth#login'
  delete 'auth/logout', to: 'auth#logout'
end
