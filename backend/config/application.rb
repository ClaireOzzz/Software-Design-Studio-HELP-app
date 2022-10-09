require 'webpush' # Included for Push Notifications (Apparently must be on the Head of File)

require_relative "boot"

require "rails/all"

# The following are included for Push Notifications
# # One-time, on the server
# vapid_key = Webpush.generate_key

# # Save these in your application server settings
# puts "****** VAPID_PUBLIC_KEY *******"
# puts vapid_key.public_key
# puts "****** VAPID_PRIVATE_KEY *******"
# puts vapid_key.private_key



# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    config.before_configuration do
      env_file = File.join(Rails.root, 'config', 'webpush.yml')
      YAML.load(File.open(env_file)).each do |key, value|
        ENV[key.to_s] = value
      end if File.exists?(env_file)
    end

  end
end