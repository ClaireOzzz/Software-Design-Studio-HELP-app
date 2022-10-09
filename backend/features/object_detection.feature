@sprint_4 
Feature: Auto detection of unexploded ordnance 
    As a User of the help app 
    I want to be able to get the ai model to help detect unexploded ordnance
    so that I can confirm the identity of an unknown object I have found 

Scenario: Navigating to map page
    Given I log in as "OksanaKovalenko"
    Given I am on the map page
    Then I should see "Take a photo or Select one from gallery" 
    And I should see "UPLOAD"

Scenario: Uploading an image
    Given I log in as "OksanaKovalenko"
    Given I am on the map page 
    When I upload an image 
    Then I should see "REUPLOAD"
    And I should see "DETECT" 

Scenario: Loading bar 
    Given I log in as "OksanaKovalenko"
    Given I am on the map page 
    When I upload an image 
    Then I should see "REUPLOAD"
    And I should see "DETECT" 
    When I click "DETECT"
    Then I should see a loading icon 


# Scenario: I take a picture 
#     Given I am on the camera page 
#     When I click the camera icon 
#     And I click the capture icon 
#     Then I should see my picture taken 

# Scenario: Upload an image 
#     Given I am on the camera page 
#     When I click the camera icon 
#     And I click the capture icon 
#     And I click the upload icon 
#     Then I should see my picture uploaded
    
# Scenario: loading message 
#     Given I am on the camera page 
#     When I click the camera icon 
#     And I click the capture icon 
#     Then I should see my picture taken 
#     When I follow "Auto detect image"
#     Then I should see a loading message as the model is performing prediction 

# Scenario: Detecting the type of unexploded ordnance 
#     Given I am on the camera page 
#     When I click the camera icon 
#     And I click the capture icon 
#     Then I should see my picture taken 
#     When I follow "Auto detect image"
#     Then I should see a loading message as the model is performing prediction
#     When the model has finished prediction
#     Then I should see the model 