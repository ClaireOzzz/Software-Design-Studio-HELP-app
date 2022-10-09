Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :chatbots do 
        collection do
          post "text_input"
          post "audio_input"
        end
      end 
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
