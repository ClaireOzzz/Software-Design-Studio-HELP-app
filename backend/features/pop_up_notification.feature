# bundle exec cucumber features/pop_up_notification.feature
@sprint_3
Feature: User should be notified with a pop-up warning when accepting a request
    As a donor
    I want to be notified of my liabilities and responsibilities for my own safety
    So that I can take the necessary steps to verify the authenticity of the request for help and avoid being deceived.

Scenario: User should be notified of liabilities and responsibilities for safety
    Given I log in as "OksanaKovalenko"
    Given I am on the request details page
    When I press "Click to Help"
    Then I should see "Your safety comes first."

Scenario: User should be able to view tips regarding fraud and safety
    Given I log in as "OksanaKovalenko"
    Given I am on the request details page
    When I press "Click to Help"
    And I follow "here"
    Then I should be brought to "https://tonytangebirah.wixsite.com/help/fraud-and-safety-policy"

Scenario: User cancels the pop-up warning
    Given I log in as "OksanaKovalenko"
    Given I am on the request details page
    When I press "Click to Help"
    And I press "Cancel"
    Then I should be on the request details page

Scenario: User accepts the pop-up warning
    Given I log in as "OksanaKovalenko"
    Given I am on the request details page
    When I press "Click to Help"
    And I press "Continue"
    Then I should be on the reach out success page
    # Then I am on the profile page 
    # When I press "Help Offered" 
    # And I select the dropdown menu
    # And I select category: Pending
    # Then I should see a list of offers for category: Pending
    # And I should be able to see the request I accepted 


