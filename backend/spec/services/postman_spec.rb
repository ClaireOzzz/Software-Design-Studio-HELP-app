require 'rails_helper'
require 'webmock/rspec'



RSpec.describe Postman do

    # self.update_outreach_status(donor_id, request_id, new_status)
    describe "Postman Service method " do

        it "update_outreach_status(donor_id, request_id, new_status)" do
            # Mock URL
            stub_request(:any, "https://www.mockwebsite.com").
                to_return(
                    body: '{"data": "MOCKDATA"}', 
                    status: 200,
                )

        
            expect(Postman.send_req_to_api("https://www.mockwebsite.com")["data"]).to eq("MOCKDATA")
        end
    end

    describe "Google Maps methods " do

        before(:all) do
            # mock location API request
            @mock_location_data = JSON.parse('{
                "results": [
                    {
                        "formatted_address": "mock address",
                        "geometry": {"location": {"lat": "mocklat", "lng": "mocklng"}}
                    }
                ],
                "status": 200
            }')
            @mock_bad_data = JSON.parse('{
                "results": [],
                "status": 500
            }')

        end

        describe "given valid inputs, run the method " do
            before(:each) do
                # mock valid input to API call
                allow(Postman).to receive(:send_req_to_api).and_return(@mock_location_data)
            end

            it "google_maps_geocode_req(address)" do
                result = Postman.google_maps_geocode_req("SUTD, Singapore")
                expect(result[:lat]).to eq("mocklat")
                expect(result[:lng]).to eq("mocklng")
            end

            it "google_maps_rev_geocode_req(lat, lng)" do
                result = Postman.google_maps_rev_geocode_req(69, 420)
                expect(result).to eq("mock address")
            end
        
        end

        
        describe "given invalid inputs, run the method " do
            before(:each) do
                # mock invalid input to API call
                allow(Postman).to receive(:send_req_to_api).and_return(@mock_bad_data)
            end

            it "google_maps_geocode_req(address)" do
                result = Postman.google_maps_geocode_req("nonexistent address")
    
                expect(result[:lat]).to eq(nil)
                expect(result[:lng]).to eq(nil)
            end

            it "google_maps_rev_geocode_req(lat, lng)" do
                result = Postman.google_maps_rev_geocode_req(69, 420)
                expect(result).to eq(nil)
            end
        
        end

    end

end