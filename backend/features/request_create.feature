Feature: I am able to create new Requests 
    As a donee
    So that I can quickly identify people who matches the type of aid I can offer
    I want to see a list of all the requests 

Scenario: Adding new request 
    Given I log in as "OksanaKovalenko"
    Given I am on the feed page 
    When I click on the add icon
    Then I should be on the new request page 
    And I should see the following types: Food,Accommodation,Transport,Medical  

Scenario: Choosing request type 
    Given I log in as "OksanaKovalenko"
    Given I am on the new request page 
    When I click on type: Accommodation 
    And I fill in "description-input" with "What a descriptive description"
    And I fill in "title-input" with "What a consise title"
    And I press "Next"
    Then I should be on the request form page for: Accommodation

Scenario: Filling the form for food 
    Given I log in as "OksanaKovalenko"
    Given I am on the request form page for: Food 
    When I fill in the form for: Food 
    And I press "Submit" 
    Then I should see "REQUEST SUCCESSFUL!"
    When I press "Return to Feed"
    # Then I should be alerted with "Request created successfully" 
    # When I accept the alert with text "Request created successfully" 
    Then I should be on the feed page

Scenario: Filling the form for accommodation 
    Given I log in as "OksanaKovalenko"
    Given I am on the request form page for: Accommodation 
    When I fill in the form for: Accommodation 
    And I press "Submit" 
    Then I should see "REQUEST SUCCESSFUL!"
    When I press "Return to Feed"
    # Then  I should be alerted with "Request created successfully" 
    # When I accept the alert with text "Request created successfully" 
    Then I should be on the feed page

Scenario: Filling the form for transport 
    Given I log in as "OksanaKovalenko"
    Given I am on the request form page for: Transport
    When I fill in the form for: Transport
    And I press "Submit" 
    Then I should see "REQUEST SUCCESSFUL!"
    When I press "Return to Feed"
    # Then  I should be alerted with "Request created successfully" 
    # When I accept the alert with text "Request created successfully" 
    Then I should be on the feed page

Scenario: Filling the form for medical 
    Given I log in as "OksanaKovalenko"
    Given I am on the request form page for: Medical
    When I fill in the form for: Medical
    And I press "Submit" 
    Then I should see "REQUEST SUCCESSFUL!"
    When I press "Return to Feed"
    # Then  I should be alerted with "Request created successfully" 
    # When I accept the alert with text "Request created successfully" 
    Then I should be on the feed page