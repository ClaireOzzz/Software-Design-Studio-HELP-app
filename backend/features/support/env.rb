# # IMPORTANT: This file is generated by cucumber-rails - edit at your own peril.
# # It is recommended to regenerate this file in the future when you upgrade to a
# # newer version of cucumber-rails. Consider adding your own code to a new file
# # instead of editing this one. Cucumber will automatically load all features/**/*.rb
# # files.

# require 'cucumber/rails'
# require 'capybara/cucumber'

# # frozen_string_literal: true

# # Capybara defaults to CSS3 selectors rather than XPath.
# # If you'd prefer to use XPath, just uncomment this line and adjust any
# # selectors in your step definitions to use the XPath syntax.
# # Capybara.default_selector = :xpath

# # By default, any exception happening in your Rails application will bubble up
# # to Cucumber so that your scenario will fail. This is a different from how
# # your application behaves in the production environment, where an error page will
# # be rendered instead.
# #
# # Sometimes we want to override this default behaviour and allow Rails to rescue
# # exceptions and display an error page (just like when the app is running in production).
# # Typical scenarios where you want to do this is when you test your error pages.
# # There are two ways to allow Rails to rescue exceptions:
# #
# # 1) Tag your scenario (or feature) with @allow-rescue
# #
# # 2) Set the value below to true. Beware that doing this globally is not
# # recommended as it will mask a lot of errors for you!
# #
# ActionController::Base.allow_rescue = false

# # Remove/comment out the lines below if your app doesn't have a database.
# # For some databases (like MongoDB and CouchDB) you may need to use :truncation instead.
# begin
#   DatabaseCleaner.strategy = :transaction
# rescue NameError
#   raise "You need to add database_cleaner to your Gemfile (in the :test group) if you wish to use it."
# end

# # You may also want to configure DatabaseCleaner to use different strategies for certain features and scenarios.
# # See the DatabaseCleaner documentation for details. Example:
# #
# #   Before('@no-txn,@selenium,@culerity,@celerity,@javascript') do
# #     # { except: [:widgets] } may not do what you expect here
# #     # as Cucumber::Rails::Database.javascript_strategy overrides
# #     # this setting.
# #     DatabaseCleaner.strategy = :truncation
# #   end
# #
# #   Before('not @no-txn', 'not @selenium', 'not @culerity', 'not @celerity', 'not @javascript') do
# #     DatabaseCleaner.strategy = :transaction
# #   end
# #

# # Possible values are :truncation and :transaction
# # The :transaction strategy is faster, but might give you threading problems.
# # See https://github.com/cucumber/cucumber-rails/blob/master/features/choose_javascript_database_strategy.feature
# Cucumber::Rails::Database.javascript_strategy = :truncation

# # Capybara.default_driver = :selenium_headless
# # Capybara.javascript_driver = :selenium_chrome

# # # Capybara.configure do |config|
# # #   config.always_include_port = true
# # # end

# # Capybara.run_server = true 
# # Capybara.default_host = 'http://127.0.0.1:3000'
# # Capybara.register_driver :selenium_chrome do |app|
# #   Capybara::Selenium::Driver.new(app, browser: :chrome, options: Selenium::WebDriver::Chrome::Options.new(args: ['--window-size=1920,1080'])) end

# # require 'capybara/rspec'
# # require 'selenium-webdriver'

# # # Capybara.app = MyRackApp

# # Capybara.default_driver = :selenium_chrome_headless
# # # Capybara.javascript_driver = :selenium_chrome_headless

# # Capybara.server = :puma
# # Capybara.app_host = "http://localhost:3000"
# # Capybara.run_server = true
# # Capybara.server_port = 8200
# # # Capybara.server_host = '127.0.0.1'

# require 'rubygems'
# require 'capybara'
# require 'capybara/dsl'
# require 'rspec-rails'
# require 'webdrivers'
# require 'capybara/rails'
# require 'capybara/rspec'


# Capybara.javascript_driver = :selenium_chrome

# Capybara.register_driver :chrome do |app|
#   Capybara::Selenium::Driver.new(app, :browser => :chrome)
#  end
 
# Capybara.current_driver = :selenium_chrome

# #Set default driver as Selenium
# Capybara.default_driver = :selenium_chrome
# Capybara.use_default_driver
# # Capybara.
# #Set default selector as css
# Capybara.default_selector = :css

# Capybara.server = :puma

# Capybara.run_server = true
# Capybara.app_host = "http://localhost:3000"
# # Capybara.default_max_wait_time = 30
# # Capybara.server_host = "localhost"
# Capybara.server_port = 3000
# Capybara.always_include_port = true

# # #Syncronization related settings
# # module Helpers
# #   def without_resynchronize
# #     page.driver.options[:resynchronize] = false
# #     yield
# #     page.driver.options[:resynchronize] = true
# #   end
# # end
# # World(Capybara::DSL, Helpers)

# IMPORTANT: This file is generated by cucumber-rails - edit at your own peril.
# It is recommended to regenerate this file in the future when you upgrade to a
# newer version of cucumber-rails. Consider adding your own code to a new file
# instead of editing this one. Cucumber will automatically load all features/**/*.rb
# files.

require 'cucumber/rails'
require 'capybara'
Capybara.default_driver = :selenium_chrome

# frozen_string_literal: true

# Capybara defaults to CSS3 selectors rather than XPath.
# If you'd prefer to use XPath, just uncomment this line and adjust any
# selectors in your step definitions to use the XPath syntax.
# Capybara.default_selector = :xpath

# By default, any exception happening in your Rails application will bubble up
# to Cucumber so that your scenario will fail. This is a different from how
# your application behaves in the production environment, where an error page will
# be rendered instead.
#
# Sometimes we want to override this default behaviour and allow Rails to rescue
# exceptions and display an error page (just like when the app is running in production).
# Typical scenarios where you want to do this is when you test your error pages.
# There are two ways to allow Rails to rescue exceptions:
#
# 1) Tag your scenario (or feature) with @allow-rescue
#
# 2) Set the value below to true. Beware that doing this globally is not
# recommended as it will mask a lot of errors for you!
#
ActionController::Base.allow_rescue = false
Capybara.run_server = false
Capybara.app_host = "http://localhost:5000"
Capybara.server_host = "http://127.0.0.1"
Capybara.server_port = "3000"

# Remove/comment out the lines below if your app doesn't have a database.
# For some databases (like MongoDB and CouchDB) you may need to use :truncation instead.
begin
  DatabaseCleaner.strategy = :transaction
rescue NameError
  raise "You need to add database_cleaner to your Gemfile (in the :test group) if you wish to use it."
end

# You may also want to configure DatabaseCleaner to use different strategies for certain features and scenarios.
# See the DatabaseCleaner documentation for details. Example:
#
#   Before('@no-txn,@selenium,@culerity,@celerity,@javascript') do
#     # { except: [:widgets] } may not do what you expect here
#     # as Cucumber::Rails::Database.javascript_strategy overrides
#     # this setting.
#     DatabaseCleaner.strategy = :truncation
#   end
#
#   Before('not @no-txn', 'not @selenium', 'not @culerity', 'not @celerity', 'not @javascript') do
#     DatabaseCleaner.strategy = :transaction
#   end
#

# Possible values are :truncation and :transaction
# The :transaction strategy is faster, but might give you threading problems.
# See https://github.com/cucumber/cucumber-rails/blob/master/features/choose_javascript_database_strategy.feature
Cucumber::Rails::Database.javascript_strategy = :truncation

# Capybara.threadsafe = true
Capybara.default_max_wait_time = 2 # will not change the default_max_wait in my_session