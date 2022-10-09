Then /^I should see the following types: (.*)$/ do |types|
    types.split(',').each do |type|
        expect(page).to have_content(type)
    end
end

When /^I click on type: (.*)$/ do |type|
    find(".#{type.downcase}-card").click()
end

Then /^I should be on the (.*) page for: (.*)$/ do |page_name, type|
    current_path = URI.parse(current_url).path
    if current_path.respond_to? :should
        current_path.should eq "#{path_to(page_name)}/#{type}"
    else
        assert_equal "#{path_to(page_name)}/#{type}", current_path
    end
end

Given /^I am on the (.*) page for: (.*)$/ do |page_name, type|
    visit path_to(page_name)+"/#{type}"
end
    
When /^I fill in the form for: (.*)$/ do |type|
    case type 
    when "Food"
        fill_in "Title", with: "I need milk for my baby"
        fill_in "Description", with: "I need milk for my baby"
        fill_in "Adults" , with: "0"
        fill_in "Children", with: "0"
        fill_in "Infants", with: "1"
        fill_in "Location", with: "Kyiv"
        find('#Location-option-0').click
        find('#expiry').click

        within('.MuiMenu-list') do
            find('li.MuiMenuItem-root', text: 'Three days').click
        end
        find('#contactOptions').click
        within('.MuiMenu-list') do
            find('li.MuiMenuItem-root', text: 'Telegram').click
            find('li.MuiMenuItem-root', text: 'Whatsapp').click
        end
        click_at(0,0)
        # find('.MuiBackdrop-root').click
    when "Medical"
        fill_in "Title", with: "I need medicine"
        fill_in "Description", with: "I need medicine"
        fill_in "Quantity", with: "2"
        fill_in "Location", with: "Kyiv"
        find('#Location-option-0').click
        find('#expiry').click
        within('.MuiMenu-list') do
            find('li.MuiMenuItem-root', text: 'Three days').click
        end
        find('#contactOptions').click
        within('.MuiMenu-list') do
            find('li.MuiMenuItem-root', text: 'Telegram').click
            find('li.MuiMenuItem-root', text: 'Whatsapp').click
        end
        click_at(0,0)
    when "Accommodation"  
        fill_in "Title", with: "I need a place to stay"
        fill_in "Description", with: "I need a place to stay"
        fill_in "Adults" , with: "2"
        fill_in "Children", with: "0"
        fill_in "Infants", with: "0"
        fill_in "Location", with: "Kyiv"
        find('#Location-option-0').click
        find('#expiry').click
        within('.MuiMenu-list') do
            find('li.MuiMenuItem-root', text: 'Three days').click
        end
        find('#contactOptions').click
        within('.MuiMenu-list') do
            find('li.MuiMenuItem-root', text: 'Telegram').click
            find('li.MuiMenuItem-root', text: 'Whatsapp').click
        end
        click_at(0,0)
    when "Transport"
        fill_in "Title", with: "I need transport"
        fill_in "Description", with: "I need transport"
        fill_in "Adults" , with: "0"
        fill_in "Children", with: "0"
        fill_in "Infants", with: "1"
        fill_in "Location", with: "Kyiv"
        find('#Location-option-0').click
        fill_in "location-autocomplete", with: "Lviv"
        find('#location-autocomplete-option-0').click
        find('#expiry').click
        within('.MuiMenu-list') do
            find('li.MuiMenuItem-root', text: 'Three days').click
        end
        find('#contactOptions').click
        within('.MuiMenu-list') do
            find('li.MuiMenuItem-root', text: 'Telegram').click
            find('li.MuiMenuItem-root', text: 'Whatsapp').click
        end
        click_at(0,0)
    end
end

Then "I should be alerted with {string}" do |text| 
    text_found = page.driver.browser.switch_to.alert.text
    expect(text_found).to eq text
end

When "I accept the alert with text {string}" do |text|
    page.driver.browser.switch_to.alert.accept
end

