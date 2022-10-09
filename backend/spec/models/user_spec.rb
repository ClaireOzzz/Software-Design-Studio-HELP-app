require 'rails_helper'

RSpec.describe User, type: :model do

  # self.update_outreach_status(donor_id, request_id, new_status)
  describe "Class method " do
    it "update_outreach_status(donor_id, request_id, new_status)" do
      
      User.update_outreach_status(1, 4, "Test")
      expect(User.find(1).outreachs[4]).to eq("Test")

      User.update_outreach_status(1, 4, nil)
      expect(User.find(1).outreachs.key?(4)).to be false
    end
  end

end
