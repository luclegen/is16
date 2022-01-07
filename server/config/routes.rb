Rails.application.routes.draw do
  resources :chats, only: [:show, :update, :destroy, :index]
  resources :messages, only: [:create, :destroy]
  resources :codes, only: [:create]
  resources :users, only: [:create, :show, :update, :index]
  post 'auth/', to: 'auth#login'
  get 'auth/', to: 'auth#available'
  delete 'auth/', to: 'auth#logout'
end
