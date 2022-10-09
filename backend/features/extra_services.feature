# bundle exec cucumber features/extra_services.feature
@sprint_3
Feature: I can view a list of services 
    As a user of the HELP application 
    I want to view a consolidated list of external services 
    so that I can easily find the services I need

Scenario: Navigating to extra services page
    Given I log in as "OksanaKovalenko"
    Given I am on the extra services page
    Then I should see the following types: Education,Volunteer,Donate,Employment,Counselling & Coaching
    And I should see their icon and name

Scenario: Seeing more details of the application 
    Given I log in as "OksanaKovalenko"
    Given I am on the extra services page
    When I follow "Education"
    Then I should be brought to "https://tonytangebirah.wixsite.com/help/education"


Scenario: Seeing more details of the application 
    Given I log in as "OksanaKovalenko"
    Given I am on the extra services page
    When I follow "Volunteer"
    Then I should be brought to "https://tonytangebirah.wixsite.com/help/volunteer"

Scenario: Seeing more details of the application 
    Given I log in as "OksanaKovalenko"
    Given I am on the extra services page
    When I follow "Donate"
    Then I should be brought to "https://tonytangebirah.wixsite.com/help/donate"

Scenario: Seeing more details of the application 
    Given I log in as "OksanaKovalenko"
    Given I am on the extra services page
    When I follow "Employment"
    Then I should be brought to "https://tonytangebirah.wixsite.com/help/employment"

Scenario: Seeing more details of the application 
    Given I log in as "OksanaKovalenko"
    Given I am on the extra services page
    When I follow "Counselling & coaching"
    Then I should be brought to "https://tonytangebirah.wixsite.com/help/counseling-coaching"
