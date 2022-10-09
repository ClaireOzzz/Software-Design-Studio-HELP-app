Feature: I can view a history of all requests I have made 
    As a user of the HELP application
    I want to view a history of all requests I have made
    So that I can see what I have done

Scenario: Viewing your requests in profile page 
    Given I am on the profile page 
    When I press "Help Requested" 
    Then I should see a list of requests for category: Pending

Scenario: Options for types of requests 
    Given I am on the profile page 
    When I press "Help Requested" 
    And I select the dropdown menu 
    Then I should see the following categories: Pending,Accepted,Expired 
    
Scenario: Filtering types of request 
    Given I am on the profile page 
    When I press "Help Requested"
    And I select the dropdown menu
    And I select category: Expired
    Then I should see a list of requests for category: Expired

Scenario: Viewing your offers in profile page 
    Given I am on the profile page 
    When I press "Help Offered"
    Then I should see a list of offers for category: Pending

Scenario: Options for types of offers 
    Given I am on the profile page 
    When I press "Help Offered" 
    And I select the dropdown menu
    Then I should see the following categories: Pending,Completed,Expired

Scenario: Filtering pending offers 
    Given I am on the profile page 
    When I press "Help Offered" 
    And I select the dropdown menu
    And I select category: Pending
    Then I should see a list of offers for category: Pending

Scenario: Filtering completed offers 
    Given I am on the profile page 
    When I press "Help Offered" 
    And I select the dropdown menu
    And I select category: Completed
    Then I should see a list of offers for category: Completed

Scenario: Filtering expired offers 
    Given I am on the profile page 
    When I press "Help Offered" 
    And I select the dropdown menu
    And I select category: Expired
    Then I should see a list of offers for category: Expired

# Scenario: No requests 
#     Given I am on the profile page 
#     When I press "Help Requested" 
#     And I select the dropdown menu
#     And I select category: Expired
#     And there are no requests for category: Expired 
#     Then I should see "It's empty!"

Scenario: No offers 
    Given I am on the profile page 
    When I press "Help Offered" 
    And I select the dropdown menu
    And I select category: Expired 
    And there are no offers for category: Expired
    Then I should see "It's empty!"
