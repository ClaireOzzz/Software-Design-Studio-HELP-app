class Notification < ApplicationRecord

    belongs_to :user, inverse_of: :notifications, class_name: "User"

    # ConnectionNotification
    belongs_to :connection, class_name: "Connection"
end
