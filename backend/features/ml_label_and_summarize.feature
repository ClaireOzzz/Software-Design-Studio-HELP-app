@sprint_3 @ml
Feature: Auto predict catogory and title for user filled description 
    As a donee 
    I want the AI to help me predict my category and title 
    so that I can make a request more easily and accurately

Scenario: going to the add request page 
    Given I log in as "OksanaKovalenko"
    Given I am on the new request page 
    Then I should see the form for: Description, Category, Title 

Scenario: Description with less than 10 words 
    Given I log in as "OksanaKovalenko"
    Given I am on the new request page 
    When I fill in "Description" with "I need help giving my son a ride"
    Then I should see "AI Autodetection in place, type at least 10 words for detection"
    And I should see "Pending AI suggestion..."

Scenario: Auto predict category and title 
    Given I log in as "OksanaKovalenko"
    Given I am on the new request page 
    When I fill in "Description" with "My son needs a ride from Kyiv to Lviv, he is only 8 years old and I am very worried for his safety. Please help me!"
    Then the following category should be selected: Transport 
    And I should see "My son needs a ride from Kyiv to Lviv."

Scenario: Auto predict category and title second example
    Given I log in as "OksanaKovalenko"
    Given I am on the new request page 
    When I fill in "Description" with "I need somewhere to stay for my elderly parents, I also have two children, one daughter and one son"
    Then the following category should be selected: Accommodation
    And I should see "I need somewhere to stay for my parents and children."
    
Scenario: Proceeding to the form page 
    Given I log in as "OksanaKovalenko"
    Given I am on the new request page 
    When I fill in "Description" with "My son needs a ride from Kyiv to Lviv, he is only 8 years old and I am very worried for his safety. Please help me!"
    Then the following category should be selected: Transport 
    And I should see "My son needs a ride from Kyiv to Lviv."
    When I press "Next"
    Then I should be on the request form page for: Transport
    And I should see "My son needs a ride from Kyiv to Lviv, he is only 8 years old and I am very worried for his safety. Please help me!"
    And I should see "My son needs a ride from Kyiv to Lviv."

Scenario: Choosing my own category
    Given I log in as "OksanaKovalenko"
    Given I am on the new request page 
    When I fill in "Description" with "My son needs a ride from Kyiv to Lviv, he is only 8 years old and I am very worried for his safety. Please help me!"
    Then the following category should be selected: Transport 
    And I should see "My son needs a ride from Kyiv to Lviv."
    When I click on the accommodation icon
    Then the following category should be selected: Accommodation