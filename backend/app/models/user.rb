class User < ApplicationRecord

    
    def self.update_outreach_status(donor_id, request_id, new_status)

        begin
            u = User.find(donor_id)
        rescue 
            "User does not exist"
            false
        end
        # if new_status == nil, delete the outreach from the User's outreachs column
        if new_status == nil
            u.outreachs.delete(request_id)
        # Else, just update to the new_status
        else
            u.outreachs[request_id] = new_status
        end
        u.save

    end


    # Return all the outreach requests of the User. If request is passed, treats the given set as a superset.
    def get_outreachs (status, requests, negate=false)

        if requests == nil
            requests = Request.all
        end

        requests_hash = status ? self.outreachs.select {|key, value| value == status} : self.outreachs
        requests = negate ? requests.where.not(id: requests_hash.keys) : requests.where(id: requests_hash.keys)

        return requests
    end




    serialize :outreachs, Hash
    serialize :contacts, Hash

    has_many :requests, inverse_of: :user, class_name: "Request"
    has_many :notifications, inverse_of: :user, class_name: "Notification"
    has_many :donor_connections, inverse_of: :donor, class_name: "Connection", foreign_key: "donor_id"
    has_many :donee_connections, inverse_of: :donee, class_name: "Connection", foreign_key: "donee_id"
end
