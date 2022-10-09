@sprint_3
Feature: I want to be able to filter request by location and category 
    As a donor 
    I want to be able to filter my request by location and category
    So that I can see the most relevant requests

Scenario: Filtering request below 1km 
    Given I log in as "OksanaKovalenko"
    Given I am on the feed page 
    And I am at the latlng location 1.3237998, 103.8592839
    When I select the following filters: < 1km
    Then I should see the requests for: < 1km

Scenario: Filtering request for 10km 
    Given I log in as "OksanaKovalenko"
    Given I am on the feed page 
    And I am at the latlng location 1.3237998, 103.8592839
    When I select the following filters: 10km
    Then I should see the requests for: 10km

Scenario: Filtering request for 50km 
    Given I log in as "OksanaKovalenko"
    Given I am on the feed page 
    And I am at the latlng location 1.3237998, 103.8592839
    When I select the following filters: 50km
    Then I should see the requests for: 50km

Scenario: Filtering requests by food
    Given I log in as "OksanaKovalenko"
    Given I am on the feed page 
    When I select the following filters: Food
    Then I should see the requests for: Food


Scenario: Filtering requests by transport 
    Given I log in as "OksanaKovalenko"
    Given I am on the feed page 
    When I select the following filters: Transport
    Then I should see the requests for: Transport

Scenario: Filtering requests by accommodation 
    Given I log in as "OksanaKovalenko"
    Given I am on the feed page 
    When I select the following filters: Accommodation 
    Then I should see the requests for: Accommodation

Scenario: Filtering requests by food 
    Given I log in as "OksanaKovalenko"
    Given I am on the feed page
    When I select the following filters: Food, Medical
    Then I should see the requests for: Food, Medical 

Scenario: Filtering requests by location and category 
    Given I log in as "OksanaKovalenko"
    Given I am on the feed page 
    And I am at the latlng location 1.3237998, 103.8592839
    When I select the following filters: Transport, 50km
    Then I should see the requests for: Transport, 50km

   