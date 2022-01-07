Rails.application.routes.draw do
  resources :chats, only: [:show, :update, :destroy, :index]
  resources :messages
  resources :codes
  resources :users
  resources :profiles
  post 'auth/', to: 'auth#login'
  get 'auth/', to: 'auth#available'
  delete 'auth/', to: 'auth#logout'
end
