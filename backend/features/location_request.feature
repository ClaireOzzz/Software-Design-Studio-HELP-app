@sprint_3 @location
Feature: Setting and viewing locations for requests
    As a User
    I want to be able to set my location 
    so that I can view 

Scenario: Setting a location 
    Given I log in as "OksanaKovalenko"
    Given I am on the request form page for: Accommodation
    When I fill in "Kyiv" for "Location"
    And I wait for 2 seconds
    Then I should see the following suggested locations: Kyiv,Kyiv Food Market,Kyiv International Airport (Zhuliany),Kyiv TV Tower,Kyiv Central Station Hostel

Scenario: Using own location 
    Given I log in as "OksanaKovalenko"
    Given I am on the request form page for: Accommodation
    When I check the option "Use Current Location"
    Then the location field should disappear

Scenario: Seeing the proximity of a request
    Given I log in as "OksanaKovalenko"
    Given I am at the named location Targowisko Budomierz
    And I am on the feed page
    Then I should see the proximity of the "Need transport to Jyiv" request being within 1km of my location