Rails.application.routes.draw do
  devise_for :users
get 'app/assets/images/default_profile.jpg', to: 'users#default', as: :default
  unauthenticated :user do
    devise_scope :user do
      root :to => "devise/sessions#new"
    end
  end

  authenticated :user do 
    root 'pages#posts', as: :authenticated_root
    get '/users', to: 'pages#users'
    get '/user/:id', to: 'pages#users'
  end
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :posts, only: [:index, :show, :create, :update, :destroy] do
        resources :comments
      end
      resources :users do
      member do
      get '/follow', to: 'users#follow', as: :follow
      get '/unfollow', to: 'users#unfollow', as: :unfollow
      end
    end
    end
  end
end
