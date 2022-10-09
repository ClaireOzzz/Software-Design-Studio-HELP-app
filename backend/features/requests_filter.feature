# Feature: Filtering requests by Type category and Search parameters

#     # To refactor 
#     Background: 
#         Given the following requests exist: 
#         | request_id | user_id  | username          | title                                     | expiry     | preferred_mode_of_contact | location         | description                                                              | request_type | family_size | tags | status | timestamp  | 
#         | 00000001   | 00000002 | Oksana Kovalenko  | I need 10 bandages                        | 3478292045 | Telegram, Whatsapp        | 48.3794, 31.1656 | I am running low on medical supplies and I need to care for the wounded  | Medical      | 5           |      | Open   | 3472398478 |
#         | 00000002   | 00000003 | Ivan              | I need a box of panadol                   | 3467589345 | Telegram,                 | 48.3594, 31.1756 | My son is sick and need medication urgently                              | Medical      | 2           |      | Open   | 3493847329 | 
#         | 00000003   | 00000001 | Kateryna          | Need transport from Lviv to Polish border | 3239479234 | Phone, Whatsapp           | 48.3894, 31.1056 | I have an elderly mother who is trying to evacuate and I dont have a car | Transport    | 2           |      | Open   | 3984892045 |
#         | 00000004   | 00000004 | Olivar Twist      | Can I have some more?                     | 3251247628 | Phone,                    | 48.5121, 31.1094 | My family is running out of food                                         | Food         | 4           |      | Open   | 3998242840 |
#         | 00000005   | 00000005 | Anastasiya        | Can I have some more?                     | 3323512516 | Phone, Whatsapp           | 48.3625, 31.1849 | I need to travel further to Matiropol to find my family                  | Transport    | 1           |      | Open   | 4125824629 |
#         | 00000006   | 00000004 | Olivar Twist      | Can I have some more?                     | 3323512516 | Phone,                    | 48.5121, 31.1094 | My ill mother is running out of her prescription                         | Medical      | 1           |      | Open   | 4203581469 |        
#         And Ludwik Gorny is on the feed page 
#         Then 6 seed requests should exist 

#     @happy_path
#     Scenario: No filter parameters
#     Given Ludwig Gorny is on the feed page
#     When he unapplies the following filters: Food, Medical, Transport, Accomodation
#     Then he should see the open requests

    
#     @happy_path
#     Scenario: Filtering by a single category
#     Given Ludwig Gorny is on the feed page
#     When he applies the following filter: Medical
#     When he unapplies the following filters: Food, Transport, Accomodation
#     Then he should see the open Medical requests: I need a box of panadol, I need 10 bandages


#     @happy_path
#     Scenario: Filtering by multiple categories
#     Given Ludwig Gorny is on the feed page
#     When he applies the following filters: Medical, Food
#     When he unapplies the following filters: Transport, Accomodation
#     Then he should see the Medical requests: I need a box of panadol, I need 10 bandages
#     Then he should see the Food request: Can I have some more?


#     @happy_path
#     Scenario: Filtering by Search parameter
#     Given Ludwig Gorny is on the feed page 
#     When he searches for the following: Can I have some more? 
#     Then he should see the Transport request: Can I have some more?
#     Then he should see the Food request: Can I have some more?


#     @happy_path
#     Scenario: Filtering by Search parameter and single category
#     Given Ludwig Gorny is on the feed page 
#     When he applies the following filter: Food
#     When he unapplies the following filters: Medical, Transport, Accomodation
#     When he searches for the following: Can I have some more?
#     Then he should see the Food request: Can I have some more?
#     Then he should not see the Transport request: Can I have some more?


#     @happy_path
#     Scenario: Filtering by Search parameter and  multiple categories
#     Given Ludwig Gorny is on the feed page 
#     When he applies the following filters: Food, Transport
#     When he unapplies the following filters: Medical, Accomodation
#     When he searches for the following: Can I have some more?
#     Then he should see the Transport request: Can I have some more?
#     Then he should see the Food request: Can I have some more?


#     @sad_path
#     Scenario: No requests match the filter parameters
#     Given Ludwig Gorny is on the feed page 
#     When he applies the following filters: Transport, Food
#     When he unapplies the following filters: Medical, Accomodation
#     When he searches for the following: I need 10 bandages  
#     Then he should not see any requests
    



# Filtering requests by Type category and Search parameters
    # Filtering by a single category
    # Filtering by multiple categories
    # Filtering by Search parameter
    # Filtering by Search parameter and single category
    # Filtering by Search parameter and multiple categories
    # No requests match the filter parameters
    # Misuse:
    # Filter with no parameters selected

# Viewing existing requests by type
    # See list of pending requests on Your Requests
    # See categories in Your Requests
    # Filter Requests by categories
    # See list of your pending offers on Your Offers
    # See categories in Your Offers
    # Filter Your Offers by categories
    # There are no offers for a category
    # There are no requests for a category
