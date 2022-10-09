# bundle exec cucumber features/filter_request.feature

When /I select the following filters: (.*)/ do |filters|
    
    filters.split(",").each do |filter|
        find(".search-bar").click
        find('.MuiAutocomplete-option', text: filter.strip).click
        # step %Q{I select filter: #{filter.strip}}
    end
 end

Then /^I select filter: (.*)$/ do |category|
    find(".search-bar").click
    find('.MuiAutocomplete-option', text: category).click
end

Then /.+ should see the requests for: (.*)/ do |types|
    types = types.split(",").map{|type| type.strip}
    uri = "http://localhost:3000/api/v1/feed/requests?user_id=1"
    lat = 1.3237998
    long = 103.8592839

    locationTypes = ["< 1km", "10km", "50km"]
    categoryTypes = ["Food", "Transport", "Medical", "Accommodation"]
    
    if (types & locationTypes).any?
        uri += "&lat=#{lat}&lng=#{long}"
    end

    types.each do |type|
        if locationTypes.include?type
            case type
            when "< 1km"
                uri += "&proximity=1"
                break
            when "10km"
                uri += "&proximity=10"
                break
            when "50km"
                uri += "&proximity=50"
                break
            end
        elsif categoryTypes.include?type
            uri += "&category[]=#{type.downcase}"
        end
    end
    puts uri

    actual = send_req_to_api(uri)
    sleep 2
    expect(all('.request').count).to eq actual.length
end

When "I fill in the following search query: {string}" do |query|
    fill_in "search-query", with: query
end

# Then /.+ should see the following requests: (.*)/ do |requests|