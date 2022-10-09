require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/users").to route_to({"controller"=>"api/v1/users", "action"=>"index"})
    end

    it "routes to #show" do
      expect(get: "/api/v1/users/1").to route_to({"controller"=>"api/v1/users", "id"=>"1", "action"=>"show"})
    end


    it "routes to #create" do
      # expect(post: "/users").to route_to("users#create")
      expect(post: "/api/v1/users").to route_to({"controller"=>"api/v1/users", "action"=>"create"})
    end

    it "routes to #update via PUT" do
      # expect(put: "/users/1").to route_to("users#update", id: "1")
      expect(put: "/api/v1/users/1").to route_to({"controller"=>"api/v1/users", "id"=>"1", "action"=>"update"})
    end

    it "routes to #update via PATCH" do
      expect(patch: "/api/v1/users/1").to route_to({"controller"=>"api/v1/users", "id"=>"1", "action"=>"update"})
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/users/5").to route_to({"controller"=>"api/v1/users", "id"=>"5", "action"=>"destroy"})
    end
  end
end
