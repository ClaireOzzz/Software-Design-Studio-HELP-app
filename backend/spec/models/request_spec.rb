require 'rails_helper'
# require 'webmock/rspec'

RSpec.describe Request, type: :model do

    describe "Instance method " do
        before(:each) do 
            # Init request
            request_params = {
                :id => 99,
                :user_id => 1, 
                :username => "OksanaKovalenko", 
                :title => "MOCKTITLE", 
                :request_type => "food", 
                :status => "pending", 
                :expiry => DateTime.now + 3.days
            }
    
            @request = Request.create(request_params)
            @request.save
            @request = Request.find(99)

            # mock location API request
            @mock_location_data = {
                :lat => "mocklat",
                :lng => 'mocklng',
                :name => 'mockname'
            }
            allow(Postman).to receive(:google_maps_geocode_req).and_return(@mock_location_data)
            allow(Postman).to receive(:google_maps_rev_geocode_req).and_return("mockname")
        end

        it "update_request_status(new_status)" do
            @request.update_request_status("expired")
            @request.save
            
            expect(Request.find(@request.id).status).to eq("expired")

            @request.update_request_status("pending")
            @request.save
            
            expect(Request.find(@request.id).status).to eq "pending"
        end

        describe "update_status_by_expiry()" do
            it "updates the status of expired request" do
                @request.expiry = DateTime.now - 3.days # Set the expiry to past
                @request.update_status_by_expiry

                expect(@request.status).to eq("expired")
            end

            it "does not update the status of a non-expired request" do
                @request.expiry = DateTime.now + 3.days # Set the expiry to future
                @request.update_status_by_expiry

                expect(@request.status).to eq("pending")
            end
        end


        it "update_lat_long() given name and transport request" do
            @request.request_type = "transport"
            @request.location[:to] = {}
            @request.location[:from] = {}
            @request.location[:to][:name] = "SUTD, Singapore"
            @request.location[:from][:name] = "Changi City Point, Singapore"

            @request.update_lat_long()

            expect(@request.location[:to][:lat]).to eq("mocklat")
            expect(@request.location[:to][:lng]).to eq("mocklng")

            expect(@request.location[:from][:lat]).to eq("mocklat")
            expect(@request.location[:from][:lng]).to eq("mocklng")

        end

        it "update_lat_long() given latlng and transport request" do
            @request.request_type = "transport"
            @request.location[:to] = {}
            @request.location[:from] = {}

            @request.location[:to][:lat] = 1.3413647
            @request.location[:to][:lng] = 103.963338
            @request.location[:from][:lat] = 1.3342732
            @request.location[:from][:lng] = 103.9627387

            @request.update_lat_long()

            expect(@request.location[:to][:name]).to eq("mockname")
            expect(@request.location[:from][:name]).to eq("mockname")


        end

        it "update_lat_long() given name and non-transport request" do
            
            @request.request_type = "medical"
            @request.location = {}
            @request.location[:name] = "SUTD, Singapore"

            @request.update_lat_long()

            expect(@request.location[:lat]).to eq("mocklat")
            expect(@request.location[:lng]).to eq("mocklng")

        end

        it "update_lat_long() given latlng and non-transport request" do
            @request.request_type = "medical"
            @request.location = {}
            @request.location[:lat] = 1.3413647
            @request.location[:lng] = 103.963338

            @request.update_lat_long()

            expect(@request.location[:name]).to eq("mockname")
        end

        it "distanceFrom(lat, lng) for transport request" do
            @request.request_type = "transport"
            @request.location[:to] = {}
            @request.location[:from] = {}

            @request.location[:to][:lat] = 1.3413647
            @request.location[:to][:lng] = 103.963338
            @request.location[:from][:lat] = 1.39
            @request.location[:from][:lng] = 139

            expect(@request.distanceFrom(1.40, 139.1).round).to eq 11
        end

        it "distanceFrom(lat, lng) for non-transport request" do
            @request.request_type = "medical"
            @request.location = {}
            @request.location[:lat] = 1.39
            @request.location[:lng] = 139

            expect(@request.distanceFrom(1.40, 139.1).round).to eq 11
        end

        it "distanceFrom(lat, lng) for request with no latlng" do
            @request.request_type = "medical"
            @request.location = {}
            @request.location[:name] = "some location"

            expect(@request.distanceFrom(1.40, 139.1)).to eq 0
        end
    end


    
    describe "Class method " do
        it "haversine(coords1, coords2)" do
            coords1 = {lat: 1.39, lng: 139}
            coords2 = {lat: 1.40, lng: 139.1}

            expect(Request.haversine(coords1, coords2).round).to eq 11
        end

        # search not used in app thus not tested.
        # Hardcoded values based on seeds. Change accordingly, or find a better way.
        describe "get_feed_requests(user_id, search, category)" do
            it "for all feed requests" do
                expect(Request.get_feed_requests(1, nil, nil).length).to eq(10) 
                # includes not explicitly expired seeds
                # this is because expiry is changed on GET requests
            end 

            it "for invalid user_id" do
                expect{ Request.get_feed_requests(0, nil, nil).length }
                .to raise_error(ActiveRecord::RecordNotFound)
            end

            it "for all food requests" do
                expect(Request.get_feed_requests(1, nil, "food").length).to eq(2)
            end

            it "for all food and accommodation requests" do
                expect(Request.get_feed_requests(1, nil, ["food", "accommodation"]).length).to eq(4)
            end

            it "invalid status given " do
                expect(Request.get_feed_requests(1, nil, "invalid").length).to eq(0)
            end

        end

        # Hardcoded values based on seeds. Change accordingly, or find a better way.
        describe "get_user_requests(user_id, type, status) " do
            it "for no status" do
                expect(Request.get_user_requests(1, nil, nil).length).to eq(6)
            end
            it "for invalid user_id" do
                expect{ Request.get_user_requests(0, nil, nil).length }
                .to raise_error(ActiveRecord::RecordNotFound)
            end
            it "for valid status" do
                expect(Request.get_user_requests(1, "sent", "accepted").length).to eq(1)
            end
            it "for outreach request and valid status" do
                expect(Request.get_user_requests(1, "outreach", "pending").length).to eq(1)
            end
        end
    end

end