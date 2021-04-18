Rails.application.routes.draw do
  devise_for :users
  root 'pages#posts'
  authenticated :user do 
    root "pages#posts", as: :authenticated_root
    get '/users', to: 'pages#users'
  end
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :posts, only: [:index, :show, :create, :update, :destroy]
      resources :users
    end
  end
end
