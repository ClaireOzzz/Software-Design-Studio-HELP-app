

# GIVEN ===============================================================

Given /I have set my language to (.*)/ do |lang|
    pending
end

Given('I am User {int}') do |int|
    pending # Write code here that turns the phrase above into concrete actions
end


# WHEN ================================================================

# AND =================================================================
And /I select the language: (.*)/ do |lang|
    pending
end




# THEN ===============================================================
Then('I should see {int} language options') do |int|
    pending
    expect(page).to have_selector(:css, 'li', count: int)
end


Then /I should see the current language set as "(.*)"/ do |lang|
    pending
end


Then /I should see "(.*)" in the "(.*)" field/ do |content, header|
    pending
end