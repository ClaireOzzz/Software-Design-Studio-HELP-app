class RequestService
    def initialize(request)
        @request = request
    end


    def accept_request(donor_id)
        if User.update_outreach_status(donor_id, @request.id, "pending") && @request.update_request_status("accepted") 
            return connect_users(donor_id)
        else
            raise "Something when wrong when accepting request!"
        end
    end


    # Creates the connection and notification objects 
    def connect_users(donor_id)

        # 1. Create connection between the 2 users
        connection_hash = { 
            :request_id => @request.id,
            :donor_id => donor_id,
            :donee_id => @request.user_id,
            :status => false
        }

        # Check if Connection already exists 
        connection_exists =  Connection.exists?(
            donor_id: connection_hash[:donor_id],
            donee_id: connection_hash[:donee_id]
        )
        

        c = Connection.create!(connection_hash)

        # 2. Send notification to the donee for acceptance
        donor_name = User.find(donor_id).username
        message = "#{donor_name} would like to help you for your request: '#{@request.title}.'"

        # 3. Create notification to donee
        n = ConnectionNotification.create_from_connection(c, message)

        # 4 return the connection and the notification
        result = [c, n]
        result[2] = "Connection already Exists" if connection_exists 

        return result
    end



    def destroy_associated()
        # Destroy all related notifications
        # Find all notifications that corresponds to the same request
        connections_to_delete = Connection.where(request_id: @request.id)
        notifications_to_delete = Notification.where(connection_id: connections_to_delete.ids)

        # Find all outreach keys to delete
        connections_to_delete.each do |c|
            User.update_outreach_status(c.donor.id, @request.id, nil)
        end


        # Destroy the notifications and connections
        notifications_to_delete.destroy_all
        connections_to_delete.destroy_all
    end

end