# Given /the following requests exist/ do |requests_table| 
#     requests_table.hashes.each do |request|
#         # Request.create!(request)
#     end
# end 

# Then "{int} seed {word}(s) should exist" do |n_seeds, record|
#     record_class_name = record.downcase
#     # change the record_class_name to singular
#     if record_class_name[-1] == 's'
#         record_class_name = record_class_name[0..-2]
#     elsif record_class_name[-2] == 'es'
#         record_class_name = record_class_name[0..-3]
#     end 
    
#     case record_class_name
#     when 'request'
#         Request.count.should be n_seeds.to_i
#     end
# end 


Then "I should see the {word} requests" do |status| 
    case status 
    when "open"
        actual = send_req_to_api("http://localhost:3000/api/v1/users/1/feed/requests").length()
        expect(all('.request').count).to be actual
    end 
end 

When /^.+ clicks on the first request/ do 
    find(".request", match: :first).click
end 


Then /^details for the first (\w+) is( not)? visible$/ do  |element, has_not|
    if has_not.nil?
        expect(page).to have_selector(".#{element}-details") 
    else
        expect(page).not_to have_selector(".#{element}-details")
    end 
end


When /^.+ clicks the (.+) button/ do |button_name|
    case button_name
    when "close request"
        find(".close-request").click
    when "accept"
        find(".accept-request").click
    when "Continue"
        click_button("Continue")
    end
end

# Given /^the first request is( not)? open/ do |has_not|
#     if has_not.nil?
#         Request.first.update(status: 'open')
#     else 
#         Request.first.update(status: 'closed')
#     end
# end

Given "there are no requests" do 
    Request.destroy_all
end

Then('he should see {string}') do |string|
    #add within component 
    page.assert_text(string)
end

# When he clicks the close button 

# When /he clicks on the {string} request/ do |num|


#     user = User.find_by_username(username)
#     request = user.requests.first
#     click_link request.title  
# end
