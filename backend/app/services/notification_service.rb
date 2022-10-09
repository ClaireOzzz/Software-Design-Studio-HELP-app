class NotificationService
    def initialize(notification)
        @notification = notification
    end

    # Webpush
    # requests and notification controllers
    def push_notification(notification)
        # raise NotImplementedError
    end

    def accept_connection()
        check_type(ConnectionNotification)
        
        connection = @notification.connection

        # update the User and Request tables
        connection.request.update_request_status("completed")
        User.update_outreach_status(
            connection.donor.id,
            connection.request.id,
            "completed"
        )

        # Update the connection status to true
        connection.update(status: true)

        # Send a notif to the donor
        # Unimplemented
        
        # Destroy the notifications and connections
        @notification.destroy        
        return connection
    end

    def reject_connection()
        check_type(ConnectionNotification)
        connection_to_delete = @notification.connection

        User.update_outreach_status(
            connection_to_delete.donor.id,
            connection_to_delete.request.id,
            nil
        )

        # Send a notif to the donor
        # Unimplemented

        # destroy connection entry and corresponding notification
        @notification.destroy
        connection_to_delete.destroy

        # update Request
        connection_to_delete.request.update_request_status(nil)
        # connections = Connection.where(request_id: connection_to_delete.request.id )
        # if connections.empty?
        #     connection_to_delete.request.update_request_status("pending")
        # end
        
        return "Connection Rejected"
    end


    def check_type(expected_class)
        bool = @notification.is_a? expected_class
        raise TypeError, "expected a #{expected_class.name}, got #{@notification.class.name}" unless bool
        return bool
    end


end