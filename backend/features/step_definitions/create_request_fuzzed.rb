Given /.* am using fuzzed input/ do
    @f = Fuzzer.new 
end

# Then "I am cool" do
#     expect(true).to eq(true)
#     30.times do
#         puts @f.mutate_string
#     end
# end

# I fill in the food request form with fuzzed inputs 12 times
# I fill in the transport request form with fuzzed inputs
Then /.* fill in the (.*) request form with fuzzed inputs(?= (\d+) times)?/ do |category, times|
    
    if !times
        times = 5
    end
    valid_categories = ["food", "medical", "accommodation", "transport"]
    if !valid_categories.include? category
        category = valid_categories.sample
    end

    times.to_i.times do |ind|
        puts "________________________\nIteration #{ind + 1}"

        step "I am on the request form page for: #{category.capitalize}"
        step 'I fuzz title and description'

        if category == "transport"
            step "I fuzz number of people"
            step "I fuzz location for transport"
        elsif category == "medical"
            step "I fuzz quantity" 
            step "I fuzz location"
        else
            step "I fuzz number of people"
            step "I fuzz location"
        end

        step "I fuzz expiry"
        step "I fuzz contact options"
        
        # assert 
        step 'I press "Submit"'
        step 'I should see "REQUEST SUCCESSFUL!"'
        step 'I press "Return to Feed"'
        current_path = URI.parse(current_url).path
        if current_path.respond_to? :should
          expect(current_path).to eq(path_to("feed"))
        else
          assert_equal path_to("feed"), current_path
        end
      
    end

    puts "All fuzzed scenarios pass"

end

When "I fuzz title and description" do
    fuzzed_title = @f.mutate_string "My son needs a ride from Kyiv to Lviv! Please help."
    fuzzed_description = @f.mutate_string "My son needs a ride from Kyiv to Lviv, he is only 8 years old and I am very worried for his safety. Please help me!"

    if fuzzed_title == ""
        fuzzed_title = @f.get_random_string
    end
    if fuzzed_description == ""
        fuzzed_description = @f.get_random_string
    end

    puts "Title: " + fuzzed_title + "\n"
    puts "Description: " + fuzzed_description + "\n"

    fill_in "Title", with: fuzzed_title
    fill_in "Description", with: fuzzed_description


end


When "I fuzz number of people" do
    adults = rand(Fuzzer.num_upper_limit).to_s
    children = rand(Fuzzer.num_upper_limit).to_s
    infants = rand(Fuzzer.num_upper_limit).to_s

    puts "adults: " + adults + "\n"
    puts "children: " + children + "\n"
    puts "infants: " + infants + "\n"

    fill_in "Adults" , with: adults
    fill_in "Children", with: children
    fill_in "Infants", with: infants
end

When "I fuzz quantity" do 
    qty = adults = rand(Fuzzer.num_upper_limit).to_s
    puts "Quantity: " + qty + "\n"
    fill_in "Quantity", with: qty
end



When "I fuzz location for transport" do
    step 'I fuzz location for "Location" field'
    step 'I fuzz location for "location-autocomplete" field'
end

When "I fuzz location" do
    step 'I fuzz location for "Location" field'
end


When /I fuzz location for "(.*)" field/ do |field|
    string = @f.get_random_string
    option_id = '#' + field + '-option-0'
    fill_in field, with: string
    sleep 0.5

    while page.has_css?('.MuiAutocomplete-noOptions') && string != ""
        string = @f.delete(string)
        fill_in field, with: string
        sleep 0.5
    end
    puts "String: " + string
    if (string == "") || page.has_css?('.MuiAutocomplete-noOptions')
        puts "Location Option: " + "" + "\n"
        step 'I check the option "Use Current Location"'
    else
        element = find(option_id)
        puts "Location Option: " + element.text(:all) + "\n"
        element.click
    end
end

When "I fuzz expiry" do
    options = [
        "Three days",
        "Five days",
        "One week",
    ]

    find('#expiry').click
    within('.MuiMenu-list') do
        option = options.sample
        puts "Expiry Option: " + option + "\n"
        find('li.MuiMenuItem-root', text: option).click
    end
end

When "I fuzz contact options" do
    options = [
        "Facebook Messenger",
        "LINE",
        "Phone text message",
        "Telegram",
        "Viber",
        "WeChat",
        "Whatsapp"
    ]
    n = rand(1..options.length)
    chosen = options.sample n
    find('#contactOptions').click
    within('.MuiMenu-list') do
        chosen.each do |option|
            puts "Contact Option: " + option + "\n"
            find('li.MuiMenuItem-root', text: option).click
        end
    end
    click_at(0,0)
end


