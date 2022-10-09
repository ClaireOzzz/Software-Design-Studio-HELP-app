  
Then /.* should see the chatbot/ do
    page.assert_text "Hello, I am Tony"
end

When /.* say "(.*)"/ do |string|
    # fill_in ".react-chatbot-kit-chat-input", with: string
    find(".react-chatbot-kit-chat-input").set string
    find(".react-chatbot-kit-chat-btn-send").click
end

Then /.* should see (\d*) suggested options/ do |n|
    expect(all(".option-card").count).to eq n.to_i
end

# Then /.* should see "(.*)"/ do |string|
#     page.assert_text(string)
# end

And /.* wait for (.*) seconds/ do |t|
    sleep t.to_i
end