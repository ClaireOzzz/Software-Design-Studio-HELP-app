require "rails_helper"

RSpec.describe Api::V1::RequestsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/feed/requests").to route_to({"controller"=>"api/v1/requests", "action"=>"index"})
      expect(get: "/api/v1/users/1/requests").to route_to({"controller"=>"api/v1/requests", "action"=>"index", "user_id"=>"1"})
    end

    it "routes to #show" do
      expect(get: "/api/v1/feed/requests/1").to route_to({"controller"=>"api/v1/requests", "action"=>"show", "id"=>"1"})
      expect(get: "/api/v1/users/1/requests/1").to route_to({"controller"=>"api/v1/requests", "action"=>"show", "id"=>"1", "user_id"=>"1"})
    end


    it "routes to #create" do
      expect(post: "/api/v1/feed/requests").to route_to({"controller"=>"api/v1/requests", "action"=>"create"})
      expect(post: "/api/v1/users/1/requests").to route_to({"controller"=>"api/v1/requests", "action"=>"create", "user_id"=>"1"})
      
    end

    it "routes to #update via PUT" do
      expect(put: "/api/v1/feed/requests/1").to route_to({"controller"=>"api/v1/requests", "action"=>"update", "id"=>"1"})
      expect(put: "/api/v1/users/1/requests/1").to route_to({"controller"=>"api/v1/requests", "action"=>"update", "id"=>"1", "user_id"=>"1"})
    end

    it "routes to #update via PATCH" do
      expect(patch: "/api/v1/feed/requests/1").to route_to({"controller"=>"api/v1/requests", "action"=>"update", "id"=>"1"})
      expect(patch: "/api/v1/users/1/requests/1").to route_to({"controller"=>"api/v1/requests", "action"=>"update", "id"=>"1", "user_id"=>"1"})
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/feed/requests/1").to route_to({"controller"=>"api/v1/requests", "action"=>"destroy", "id"=>"1"})
      expect(delete: "/api/v1/users/1/requests/1").to route_to({"controller"=>"api/v1/requests", "action"=>"destroy", "id"=>"1", "user_id"=>"1"})
    end

    it "routes to #accept" do
      expect(post: "/api/v1/feed/requests/1/accept").to route_to({"controller"=>"api/v1/requests", "action"=>"accept", "id"=>"1"})
      expect(post: "/api/v1/users/1/requests/1/accept").to route_to({"controller"=>"api/v1/requests", "action"=>"accept", "id"=>"1", "user_id"=>"1"})
    end
  end
end
