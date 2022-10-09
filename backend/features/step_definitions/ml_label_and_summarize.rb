Then /the following category should be selected: (.*)/ do |category|
    sleep 5
    all(".#{category.downcase}-card.card-highlight").count.should eq 1
end

Then /I should see the form for: (.*)/ do |form_inputs|
    form_inputs = form_inputs.split(",").map{|input| input.strip}
    form_inputs.each do |input|
        find("##{input.downcase}-input").should be_visible
    end
end