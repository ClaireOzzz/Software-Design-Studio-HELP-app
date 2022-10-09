When /^.+ (?:am|is) (?:on|redirected to) the (.+) page$/ do |page_name|
    visit path_to(page_name)
end

When /^(?:|I) click on the (.+) icon$/ do |icon|
    find(".#{icon}-icon").click()
end

When /^(?:|I )follow "([^"]*)"$/ do |link|
  click_link(link)
end

When /^(?:|I )press "([^"]*)"$/ do |button|

  click_button(button)
  sleep 1
end

When /^(?:|I )fill in "([^"]*)" with "([^"]*)"$/ do |field, value|
    fill_in(field, :with => value)
end

When /^(?:|I )fill in "([^"]*)" for "([^"]*)"$/ do |value, field|
    fill_in(field, :with => value)
end

When /^(?:|I )select "([^"]*)" from "([^"]*)"$/ do |value, field|
    select(value, :from => field)
end

Then /.* should be on the (.+) page$/ do |page_name|
    current_path = URI.parse(current_url).path
    if current_path.respond_to? :should
      current_path.should == path_to(page_name)
    else
      assert_equal path_to(page_name), current_path
    end
  end
  
# Then "I should see {string}" do |text|
#   expect(page).to have_content(text)
# end

When /^(?:|I )check "([^"]*)"$/ do |value|
  page.check(value)
end

Given /.* log in as "(.*)"/ do |username|
  visit path_to("login")
  find('span', text: username).click
end