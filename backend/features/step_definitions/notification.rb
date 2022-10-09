Then /^I should see a list of requests where donor has reached out$/ do
    actual = send_req_to_api("http://localhost:3000/api/v1/users/1/notifications")
    all('.notification-card').count.should be actual.length
end

Then /^I should see the contact details of the offers I accepted$/ do
    actual = send_req_to_api("http://localhost:3000/api/v1/users/1/connections?status=true")
    all('.contact-card').count.should be actual.length
end

Then /^I should see all the requests where donor has reached out$/ do
    actual = send_req_to_api("http://localhost:3000/api/v1/users/1/notifications")
    all('.notification-card').count.should be actual.length
end

When /^I (accept|reject) a donation$/ do |action|
    if action == "accept"
        find('.notification-card', match: :first).find('.accept-button').click
    else
        find('.notification-card', match: :first).find('.reject-button').click
    end
end
    
Then /^I should(?: be able to|) see "(.*)"$/ do |text|
    expect(page).to have_content(text)
end

Then /^I should be able to see the contact details of the donor$/ do
    # expect(page).to have_content("Congratulations! You're now connected with @Ludwig123.")
    expect(page).to have_content("Congratulations! You're now connected with @ludwig_gorny.")
end

Then /^the offer should be removed$/ do
    actual = send_req_to_api("http://localhost:3000/api/v1/users/1/notifications")
    all('.notification-card').count.should be actual.length
end