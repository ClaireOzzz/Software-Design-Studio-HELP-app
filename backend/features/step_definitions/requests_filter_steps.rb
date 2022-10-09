
    
# #############################################################################################
# # Given

# # Repeated
# # # Populate DB with Requests
# # Given /the following requests exist/ do |requests_table|
# #     requests_table.hashes.each do |request|
# #         Request.create!(request)
# #     end
# # end


# Given /^.+ (?:am|is) on the (.+) page$/ do |page_name|
#     case page_name 
#     when "feed"
#         visit "/"
#     end
# end


# #############################################################################################
# # When

# # When he applies the following filter: Medical
# # When he unapplies the following filters: Food, Transport, Accomodation
# When /^.+ (un)?applies the following filter(s)?: (.*)/ do |uncheck, plural, filters|
#     # Click the button to access the filter menu
#     click_button "filter"

#     # puts page.body

#     # Split the filters string into an array of filters
#     # Check and uncheck each filter as needed
#     filters = plural ? filters.split(', ') : [filters]
#     filters.each do |filter|
#         if uncheck
#             uncheck filter
#         else
#             check filter
#         end
#     end

#     # Click the button to apply the filters
#     click_button "apply"
# end


# # When he searches for the following: "Can I have some more?" 
# When /^.+ searches for the following: (.*)/ do |search_term|
#     fill_in "search", :with => search_term
#     click_button "search"
# end



# #############################################################################################
# # Then


# # N seed requests should exist
# Then /(.*) seed requests should exist/ do |count|
#     expect(Request.count).to eq(count.to_i)
# end



# # TO CONFIRM IMPLEMENTATION 
# # OPEN ISSUES: 
#     # Must we use split cases into open and closed requests?  
#     # ( I'm guessing so? So can reuse the same step definition later )
#     # How do we know if a request is open or closed?
#     # Implementation of category: how to tell the category of the request, and that title + category belongs to the same request?
#     # Should we instead implement by count comparison? --> much easier tbh, but comprehensive enough?

# # He should see the requests: "Req1", "Req2", "Req3"
# # He should not see the Medical request: "Req4"
# Then /^.+ should\s?(not)? see the(?=\s)?(.+)? request(s)?: (.+)/ do |not_visible, category, plural, req|

#     req = plural ? req.split(', ') : [req]
#     req.each do |r|
#         if not_visible
#             expect(page).to have_no_content(r)
#             # expect(page).to have_no_content(category) # Category check: TO IMPLEMENT!! 
#             # Right now its just checking for the presence of the title, not the specific request
#             # Put as content (name) first. To change to possibly Xpath or count comparison depending on frontend implementation
           
#         else
#             expect(page).to have_content(r)
#             # expect(Request.where(category: category).count).to eq(TO_CONFIRM_IMPLEMENTATION)
#         end
#     end

#     # fail "Unimplemented"

# end


# # TO CONFIRM IMPLEMENTATION 
# # Then he should not see any requests
# # Then he should not see any Medical requests
# Then /^.+ should not see any(?=\s)?(.+)? requests$/ do |category|

#     # expect(page).to have_no_content("Requests")

#     fail "Unimplemented"
# end


# # Repeated (copy below)
# # IMPLEMENTED BELOW. TO DELETE ONCE CONFIRMED
# # Then he should see the open requests
# # Then /^.+ should see the open requests/ do

# #     #expect(Request.count).to eq(all('tr').count - 1)

# #     fail "Unimplemented"
# # end
# # # Change to regex to change the "I"?
# # Then "I should see the {word} requests" do |status| 
# #     case status 
# #     when "open"
# #         # rspec find all elements with classname request
# #         save_and_open_page
# #         all('div').count.should be 10
# #         # all('div').count.should be Request.where(status: 'open').count
# #     end 
# # end 












