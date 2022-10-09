Then /I should see a loading icon/ do 
    find(".MuiCircularProgress-root").should be_visible
end

When /I upload an image/ do 
    # find("#upload-button").click
    page.attach_file("upload", File.absolute_path('./features/rocket.jpg'),make_visible: true)
end

When /I click "DETECT"/ do
    find("#detect-button").click
end