

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
    step %Q{I select the language select menu}
    find(".MuiListItemText-primary", text: lang).click
end

And /I select the language select menu/ do 
    find(".language-select").click
end



# THEN ===============================================================
Then('I should see {int} language options') do |int|
    expect(page).to have_selector(:css, '.MuiListItemText-primary', count: int)
end

Given /I have set my language to: (.*)/ do |lang| 
    step %Q{I am on the profile page} 
    step %Q{I click on the settings icon}
    step %Q{I select the language: #{lang}}
end


Then /I should see the current language set as "(.*)"/ do |lang|
    page.assert_text(lang)
end


Then /I should see "(.*)" in the "(.*)" field/ do |content, header|
    pending
end

And /I click on a request/ do 
    find(".request", match: :first).click
end