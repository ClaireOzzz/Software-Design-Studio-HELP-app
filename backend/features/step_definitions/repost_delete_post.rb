require 'net/http'


When /^(?:|I) click on the (.*) icon for post: "(.*)"/ do |button, name|

    if button == "delete"
        found = find(".delete-icon-#{name.gsub!(" ", "-")}")
    elsif button == "repost"
        found = find("#repost-icon-#{name.gsub!(" ", "-")}")
    end
    found.click
    sleep(1)
end

Then /.* should not see the post: "(.*)"/ do |name|
    expect(page).not_to have_content(name)
end
