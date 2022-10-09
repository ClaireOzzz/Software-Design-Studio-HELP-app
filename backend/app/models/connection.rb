class Connection < ApplicationRecord
    belongs_to :request

    belongs_to :donee, inverse_of: :donee_connections, class_name: "User"
    belongs_to :donor, inverse_of: :donor_connections, class_name: "User"

    def get_connection_contacts()
        return {
            donee_contact: self.donee.contacts,
            donor_contact: self.donor.contacts
        }
    end

end
