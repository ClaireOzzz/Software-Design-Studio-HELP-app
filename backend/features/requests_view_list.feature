# Sprint 1 Feature

Feature: Viewing list of all requests 
    As a donor 
    So that I can quickly identify people who matches the type of aid I can offer
    I want to see a list of all the requests 

Background: 
    Given the following requests exist:
    # # | request id | user id  | username          | title                                     | expiry     | preferred_mode_of_contact | location         | description                                                              | request_type | family_size | tags | status | timestamp  | 
    # # | 00000001   | 00000002 | Oksana Kovalenko  | I need 10 bandages                        | 3478292045 | Telegram, Whatsapp        | 48.3794, 31.1656 | I am running low on medical supplies and I need to care for the wounded  | Medical      | 5           |      | Open   | 3472398478 |
    # # | 00000002   | 00000003 | Ivan              | I need a box of panadol                   | 3467589345 | Telegram,                 | 48.3594, 31.1756 | My son is sick and need medication urgently                              | Medical      | 2           |      | Open   | 3493847329 | 
    # # | 00000003   | 00000001 | Kateryna          | Need transport from Lviv to Polish border | 3239479234 | Phone, Whatsapp           | 48.3894, 31.1056 | I have an elderly mother who is trying to evacuate and I dont have a car | Transport    | 2           |      | Open   | 3984892045 |
    | user_id  | username          | title                                     | expiry     | description                                                              | request_type | status | timestamp  | 
    | 00000002 | Oksana Kovalenko  | I need 10 bandages                        | 3478292045 | I am running low on medical supplies and I need to care for the wounded  | medical      | open   | 3472398478 |
    | 00000003 | Ivan              | I need a box of panadol                   | 3467589345 | My son is sick and need medication urgently                              | medical      | open   | 3493847329 | 
    | 00000001 | Kateryna          | Need transport from Lviv to Polish border | 3239479234 | I have an elderly mother who is trying to evacuate and I dont have a car | transport    | open   | 3984892045 |
    | 00000004 | Olivar Anatasiya  | Can I have some more?                     | 3251247628 | My family is running out of food                                         | food         | open   | 3998242840 |
    And Ludwik Gorny is on the feed page 
    Then 4 seed requests should exist 

@happy_path 
Scenario: I see a list of all the requests
Given I am on the feed page 
Then I should see the open requests

@happy_path 
Scenario: I click in and see the details 
Given Ludwig Gorny is on the feed page
When he clicks on the first request 
Then details for the first request is visible 

@happy_path
Scenario: Accepting a request 
Given Ludwig Gorny clicks on the first request
And details for the first request is visible 
And the first request is open 
When he clicks the accept button 
Then he should see "REQUEST ACCEPTED!"

@happy_path 
Scenario: Closing a request 
Given Ludwig Gorny clicks on the first request
And details for the first request is visible 
When he clicks the close request button 
Then details for the first request is not visible 

# When he clicks on the first request 
# Then he should see details on the request details page 
# When he clicks on the"Accept Request" button 
# Then he should see an alert that says "You have accepted the request"

@sad_path 
Scenario: There are no requests 
Given there are no requests 
And Ludwig Gorny is on the feed page 
Then he should see "There are no requests"








