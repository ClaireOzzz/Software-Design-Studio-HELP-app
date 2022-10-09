
Feature: User should be notified of responded requests 
    As a donee
    I want to be notified of any response my requests have had 
    So that I can know if my request has been accepted

Scenario: User should be notified of request acceptance
    Given I log in as "OksanaKovalenko"
    Given I am on the feed page 
    When I click on the notification icon 
    Then I should be on the notification page 
    Then I should see a list of requests where donor has reached out
    And I should see the contact details of the offers I accepted  

Scenario: View all notifications 
    Given I log in as "OksanaKovalenko"
    Given I am on the notification page 
    When I press "View All Offers" 
    Then I should see all the requests where donor has reached out 

Scenario: accepted donation 
    Given I log in as "OksanaKovalenko"
    Given I am on the notification page 
    When I accept a donation 
    Then I should be able to see "HELP ACCEPTED!" 
    And I press "OK"
    And I should be able to see the contact details of the donor 

Scenario: reject a donation 
    Given I log in as "OksanaKovalenko"
    Given I am on the notification page 
    And I reject a donation 
    Then I should be able to see "HELP REJECTED!"
    And I press "OK"
    Then the offer should be removed