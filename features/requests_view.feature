Feature: Sorting requests by proximity 
    As a donor
    So that I can identify people close to me which will make it easier to offer aid
    I want to be able to view the requests by proximity

@happy_path 
Scenario: I see a list of all the requests
Given I am on the feed page 
Then I should see the open requests
