# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins "http://localhost:3000", "http://localhost:5000","localhost:5000", "http://127.0.0.1:5000","https://gebirah-help-app.as.r.appspot.com", "https://gebirah-help-app-qdur742kca-as.a.run.app"
  
      resource "*",
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end
  