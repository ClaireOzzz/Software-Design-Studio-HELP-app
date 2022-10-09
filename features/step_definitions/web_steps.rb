
Given /^.+ (?:am|is) on the (.+) page$/ do |page_name|
    case page_name 
    when "feed"
        visit "/"
    end
end

Then "I should see the {word} requests" do |status| 
    case status 
    when "open"
        # rspec find all elements with classname request
        save_and_open_page
        all('div').count.should be 10
        # all('div').count.should be Request.where(status: 'open').count
    end 
end 



