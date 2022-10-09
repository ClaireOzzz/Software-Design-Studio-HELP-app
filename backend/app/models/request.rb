class Request < ApplicationRecord

    def update_request_status(new_status)
        self.status = new_status
        self.save
    end

    
    # Auto-Serialization from YAML to Hash/Array datatypes, for both to-and-fro the DB
    # https://stackoverflow.com/questions/4386545/how-to-keep-a-hash-value-in-the-table-column-in-rails
    serialize :quantity, Hash
    serialize :location, Hash
    serialize :preferred_mode_of_contact, Array
    serialize :tags, Array

    belongs_to :user, inverse_of: :requests, class_name: "User"

end
