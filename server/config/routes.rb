Rails.application.routes.draw do
  resources :chats
  resources :messages
  resources :codes
  resources :users
  resources :profiles
  post 'auth/login', to: 'auth#login'
  get 'auth/*email', to: 'auth#available'
  delete 'auth/logout', to: 'auth#logout'
end
