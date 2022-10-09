Rails.application.routes.draw do
  

  namespace :api do
    namespace :v1 do
      resources :requests
      scope '/feed' do
        resources :requests do
          post 'accept', on: :member
        end

      end

      resources :users do
        resources :requests do
          post 'accept', on: :member
          post 'repost', on: :member
        end
        resources :notifications do
          member do
            post 'accept'
            post 'reject'
          end
        end
        resources :connections
      end

      resources :notifications
      resources :connections

    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
