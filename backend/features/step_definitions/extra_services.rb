services_count = 5

Then /^I should see their icon and name$/ do 
    all('.services-icon').count.should be services_count
    all('.services-name').count.should be services_count
end