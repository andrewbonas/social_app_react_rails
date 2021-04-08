Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  authenticated :user do 
    root "pages#post", as:authenticated_root
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
