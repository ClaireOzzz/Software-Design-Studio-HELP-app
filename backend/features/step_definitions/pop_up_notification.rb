Then /^(?:|I )should be brought to "([^"]*)"$/ do |link|
    new_window=windows.last
    switch_to_window new_window
    expect(current_url).to eq(link)
end