require 'rails_helper'

RSpec.describe Connection, type: :model do
  
  describe "Instance method " do
    it "get_connection_contacts()" do

      c = {
        request_id: 1,
        donor_id: 3,
        donee_id: 1,
        status: false,
      }

      connection = Connection.create!(c)

      actual = connection.get_connection_contacts()

      donor_expected = User.find(3).contacts
      donee_expected = User.find(1).contacts

      expect(actual[:donor_contact] == donor_expected).to be true
      expect(actual[:donee_contact] == donee_expected).to be true
    end
  end

end
