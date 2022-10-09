class ConnectionNotification < Notification
    # # in app/models
    # # this is for Computers with type="Mac"
    # before_save :set_color
  
    # # Lets say all macs are silver, no point setting these ourselves
    # def set_color
    #   self.color = "silver"
    #   self.manafacturer = "apple"
    # end
  
    # # Lets overwrite the default_browser method
    # def default_browser
    #   "safari"
    # end

    # Sends connect request to the donee
    def self.create_from_connection(connection, message)
        notification_hash = {
            :user_id => connection.donee_id,
            :from_id => connection.donor_id,
            :type => "ConnectionNotification",
            :message => message,
            :connection_id => connection.id
        }
        n = ConnectionNotification.create!(notification_hash)
    end

    
end