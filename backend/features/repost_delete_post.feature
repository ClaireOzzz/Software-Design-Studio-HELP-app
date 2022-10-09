@sprint_4
Feature: I want to be able to repost and delete posts that I have made 
    As a User of the help app 
    I want to be able to repost and delete my previous post 
    So I can manage what requests I have that are pending and visible for others to accept.

Scenario: Delete a post 
    Given I log in as "OksanaKovalenko"
    Given I am on the profile page 
    When I press "Help Requested"
    And I click on the delete icon for post: "Relatives require place to stay"
    And I press "Delete"
    Then I should not see the post: "Relatives require place to stay"


Scenario: Repost a post 
    Given I log in as "OksanaKovalenko"
    Given I am on the profile page 
    When I press "Help Requested" 
    And I select the dropdown menu
    And I select category: Expired
    When I click on the repost icon for post: "Require painkillers"
    And I accept the alert with text "Request posted!"
    Then I should not see the post: "Require painkillers"

    When I select the dropdown menu
    And I select category: Pending
    Then I should see "Require painkillers"
    