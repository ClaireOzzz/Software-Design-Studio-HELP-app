require 'net/http'

# When /.+ follow (.*)?/ do |button_name|
#     click_button button_name
# end





# And I select the dropdown menu
And /.+ select the dropdown menu/ do 
    find(".MuiSelect-select", match: :first).click
end

# And I select a category
# And I select Expired
And /^I select category: (.*)$/ do |category|
    find('li', text: category).click 
end

# And there is no requests for that category 
And /there are no (offers|requests) for category: (.*)/ do |type, status|
    type = case type
        when "offers" then "outreach"
        when "requests" then "sent"
    end
    actual = send_req_to_api("http://localhost:3000/api/v1/users/1/requests?type=#{type}&status=#{status}")
    expect(actual.length).to eq(0)
end




# Then I should see the following categories: Pending,Accepted,Expired
Then /.+ should see the following categories: (.*)/ do |categories|
    categories_arr = categories.split(",")
    
    categories_arr.each do |cat|
        expect(page).to have_selector(:css, 'li', text: cat)
    end
end

# Then I should see a list of pending requests
# Then I should see a list of expired requests
# Then I should see a list of pending offers
Then /.+ should see a list of (offers|requests) for category: (.*)/ do |type, status|
    type = case type
        when "offers" then "outreach"
        when "requests" then "sent"
    end
    status = status.downcase

    actual = send_req_to_api("http://localhost:3000/api/v1/users/1/requests?type=#{type}&status=#{status}")
    puts "http://localhost:3000/api/v1/users/1/requests?type=#{type}&status=#{status}"
    p actual
    
    all('.request').count.should eq actual.length
end

# Then I should see a message saying there are no requests for that category
# Then I should see a message saying there are no offers for that category
Then /.+ should see a message saying there are no .* for that category/ do 
    page.assert_text("It's empty!")
end




def send_req_to_api(uri)
    url = URI.parse(uri)
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http|
    http.request(req)
    }
    JSON.parse(res.body)
end




