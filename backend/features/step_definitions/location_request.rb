def fill_autocomplete(field, options = {})
    fill_in field, :with => options[:with]
  
    page.execute_script %Q{ $('##{field}').trigger("focus") }
    page.execute_script %Q{ $('##{field}').trigger("keydown") }
    selector = "ul.ui-autocomplete a:contains('#{options[:select]}')"
  
    page.should have_selector selector
    page.execute_script "$(\"#{selector}\").mouseenter().click()"
end

When /I fill in location: (.*)/ do |location|
    fill_autocomplete("Location", :with => location)
end
  

Then /^I should see the following suggested locations: (.*)$/ do |locations|
    locations.split(',').each do |location|
        page.should have_content(location)
    end
end

Then /^the location field should disappear$/ do
    page.should_not have_selector("#location-autocomplete")
end

When /^I check the option "([^"]*)"$/ do |option|
    case option
    when "Use Current Location"
        find("#location-checkbox", visible: :all).click
    end
end

# Reference: https://www.karlentwistle.com/capybara/2022/01/11/simulate-geolocation.html
Given /^I am at the latlng location (.*), (.*)$/ do |lat, lng| 
    page.driver.browser.execute_cdp(
        'Emulation.setGeolocationOverride',
        latitude: lat.to_f,
        longitude: lng.to_f,
        accuracy: 50
    )
end


# UNTESTED STEP DEF!
# Reference: https://www.karlentwistle.com/capybara/2022/01/11/simulate-geolocation.html
Given /^I am at the named location (.*)$/ do |name| 

    latlng = Postman.google_maps_geocode_req(name)

    page.driver.browser.execute_cdp(
        'Emulation.setGeolocationOverride',
        latitude: latlng[:lat],
        longitude: latlng[:lng],
        accuracy: 50
      )
end


Then /^I should see the proximity of the "(.*)" request being within (.*)km of my location$/ do |title, prox_limit|
    title_div = find('div', text: title, exact_text: true)
    prox_p = title_div.sibling('.proximity')

    match = prox_p.text.match(/^(\d*)(m|km) away/)
    proximity = match.captures[0].to_s.to_i
    units = match.captures[1].to_s
    
    puts prox_p.text 
    puts proximity
    puts units

    if units == "m" 
        proximity/=1000
    end

    expect(proximity).to be <= prox_limit.to_f
    
end
