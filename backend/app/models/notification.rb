class Notification < ApplicationRecord

    belongs_to :user, inverse_of: :notifications, class_name: "User"

    # ConnectionNotification
    belongs_to :connection, inverse_of: :notification, class_name: "Connection"
end


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
    

    # def from 

    belongs_to :user, inverse_of: :notifications, class_name: "User"

    # ConnectionNotification
    belongs_to :connection, inverse_of: :notification, class_name: "Connection"
    
end