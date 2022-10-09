Rails.application.routes.draw do
  

  namespace :api do
    namespace :v1 do
      resources :requests
      resources :users do
        
        nested do
          scope '/feed' do
            resources :requests, only: [:index] do
              post 'accept', on: :member
            end
    
          end
        end


        resources :requests, only: [:index] do
          post 'repost', on: :member
        end
        
        resources :notifications, only: [:index] do
          member do
            post 'accept'
            post 'reject'
          end
        end
        resources :connections, only: [:index]
      end

      resources :notifications
      resources :connections

    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
