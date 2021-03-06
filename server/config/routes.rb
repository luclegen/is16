Rails.application.routes.draw do
  get '*path', to: 'application#index', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }

  namespace :api do
    resources :chats, only: [:show, :update, :destroy, :index]
    post 'chats/:id', to: 'chats#view'
    resources :messages, only: [:create, :destroy]
    resources :codes, only: [:create]
    resources :users, only: [:create, :show, :update, :index]
    post 'auth/', to: 'auth#login'
    get 'auth/', to: 'auth#available'
    delete 'auth/', to: 'auth#logout'
  end
end
