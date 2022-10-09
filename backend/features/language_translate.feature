@sprint_3
Feature: User should be able to change the translated language settings of the application
    As a donee
    I want to be able to change the translation language setting of the entire application to my preferred language
    So that I can overcome language barriers when I am interacting with others on the application, especially if my community does not use English.

Scenario: Default language should be English
    Given I log in as "OksanaKovalenko"
    Given I am on the profile page  
    When I click on the settings icon
    Then I should see the current language set as "English"

Scenario: User should be able to view all language
    Given I log in as "OksanaKovalenko"
    Given I am on the profile page 
    When I click on the settings icon
    And I select the language select menu 
    # https://cloud.google.com/translate/docs/languages
    Then I should see 5 language options


Scenario: User should be able to select a language
    Given I log in as "OksanaKovalenko"
    Given I am on the profile page 
    When I click on the settings icon
    And I select the language: Ukrainian
    # Then I should see the current language set as "Ukrainian"
    Then I should see the current language set as "українська"
    And I should see "УПОДОБАННЯ"


Scenario: User should be able to view a translated Feed page
    Given I log in as "OksanaKovalenko"
    Given I have set my language to: Ukrainian
    Given I am on the feed page  
    # Then I should see "Finding a home for a family"
    And I click on a request
    Then I should see "опис" 
    And I should see "Бажаний спосіб контакту"

    # # Viewing request details
    # When I follow "Пошук житла для сім'ї"
    # # Then I should see "Our house got bombed and we need to find a new home for our family"
    # Then I should see "Наш будинок розбомбили, і нам потрібно знайти новий дім для нашої родини"
    # # Username should NOT be translated
    # Then I should see "@ OksanaKovalenko" in the "username" field


Scenario: User should be able to view a translated View More page
    Given I log in as "OksanaKovalenko"
    Given I have set my language to: Ukrainian
    Given I am on the more information page  
    # Then I should see "Education Abroad"
    Then I should see "Освіта"
    # Then I should see "Volunteer"
    Then I should see "Волонтер"
    # Then I should see "Donate"
    Then I should see "Пожертвуйте"
    # Then I should see "Find Employment"
    Then I should see "Працевлаштування"


Scenario: User should be able to view a translated Profile page
    Given I log in as "OksanaKovalenko"
    Given I have set my language to: Ukrainian
    Given I am on the profile page  

    # Then I should see "Help Requested"
    Then I should see "ПОТРІБНА ДОПОМОГА"
    # Username should NOT be translated
    And I should see "ПРОПОНУЄТЬСЯ ДОПОМОГА"

# WHAT IS THE SAD PATH?? :<