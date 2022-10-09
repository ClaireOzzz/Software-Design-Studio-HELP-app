@sprint_4
Feature: I want to build a chatbot to guide users around the app 
    As a User of the Help App 
    I want to be able to interact with a chatbot 
    so that I can find my way around the application 

Scenario: See the chatbot icon
    Given I log in as "OksanaKovalenko"

    Given I am on the feed page 
    When I click on the chatbot icon  
    Then I should see the chatbot

    Given I am on the profile page 
    When I click on the chatbot icon  
    Then I should see the chatbot

    Given I am on the map page 
    When I click on the chatbot icon  
    Then I should see the chatbot

Scenario: Open the chatbot and see the welcome message 
    Given I log in as "OksanaKovalenko"
    Given I am on the feed page 
    When I click on the chatbot icon 
    Then I should see the chatbot
    And I wait for 4 seconds
    And I should see "Hello, I am Tony, your friendly chatbot assistant, I would like to guide you around the Gebirah HELP app" 

Scenario: Get suggestions 
    Given I log in as "OksanaKovalenko"

    Given I am on the chatbot page
    When I say "hi"
    And I wait for 4 seconds
    Then I should see "Hello, I am Tony, your friendly chatbot assistant, I would like to guide you around the Gebirah HELP app"
    And I should see 6 suggested options


    When I say "I need help"
    And I wait for 4 seconds
    Then I should see "Hello, I am Tony, your friendly chatbot assistant, I would like to guide you around the Gebirah HELP app"
    And I should see 6 suggested options

Scenario: Seeking help to change language 
    Given I log in as "OksanaKovalenko"
    Given I am on the feed page 
    When I click on the chatbot icon  
    And I say "Ukranian"
    And I wait for 4 seconds
    Then I should see "Click here to go to settings!" 
    When I follow "Click here to go to settings!"
    Then I should be on the settings page

# Scenario: 
