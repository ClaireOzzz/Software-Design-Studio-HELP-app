# bundle exec cucumber features/language_translate.feature

Feature: User should be able to change the translated language settings of the application
    As a donee
    I want to be able to change the translation language setting of the entire application to my preferred language
    So that I can overcome language barriers when I am interacting with others on the application, especially if my community does not use English.

Scenario: Default language should be None
    Given I am on the profile page  
    When I follow "Language Settings"
    Then I should see the current language set as "None"

Scenario: User should be able to view all language
    Given I am on the profile page 
    When I follow "Language Settings"
    And I select the dropdown menu 
    # https://cloud.google.com/translate/docs/languages
    Then I should see 109 language options


Scenario: User should be able to select a language
    Given I am on the profile page 
    When I follow "Language Settings"
    And I select the language: Ukrainian
    # Then I should see the current language set as "Ukrainian"
    Then I should see the current language set as "украї́нська"


Scenario: User should be able to view a translated Feed page
    Given I am User 1
    Given I have set my language to "Ukrainian"
    Given I am on the feed page  
    # Then I should see "Finding a home for a family"
    Then I should see "Пошук житла для сім'ї"

    # Viewing request details
    When I follow "Пошук житла для сім'ї"
    # Then I should see "Our house got bombed and we need to find a new home for our family"
    Then I should see "Наш будинок розбомбили, і нам потрібно знайти новий дім для нашої родини"
    # Username should NOT be translated
    Then I should see "@ OksanaKovalenko" in the "username" field


Scenario: User should be able to view a translated View More page
    Given I have set my language to "Ukrainian"
    Given I am on the view more page  
    # Then I should see "Education Abroad"
    Then I should see "Освіта за кордоном"
    # Then I should see "Volunteer"
    Then I should see "Волонтер"
    # Then I should see "Donate"
    Then I should see "Пожертвуйте"
    # Then I should see "Find Employment"
    Then I should see "Знайти роботу"


Scenario: User should be able to view a translated Profile page
    Given I am User 1
    Given I have set my language to "Ukrainian"
    Given I am on the profile page  

    # Then I should see "Help Requested"
    Then I should see "Потрібна допомога"
    # Username should NOT be translated
    Then I should see "Ludwig123"


# WHAT IS THE SAD PATH?? :<