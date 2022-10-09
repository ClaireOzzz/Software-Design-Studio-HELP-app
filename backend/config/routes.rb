Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :requests
      
      scope '/feed' do
        resources :requests
      end

      resources :users do
        resources :requests
        resources :notifications
        resources :connections
      end

    end
  end

  # Included for Push Notifications
  post 'sendMessage', to: 'users#send_message'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
