Rails.application.routes.draw do
  devise_for :users
  root 'pages#posts'
  authenticated :user do 
    root "pages#post", as: :authenticated_root
  end
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :posts, only: [:index, :show, :create, :update, :destroy]
    end
  end
end
