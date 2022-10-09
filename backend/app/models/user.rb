class User < ApplicationRecord
    serialize :outreachs, Hash

    has_many :requests, inverse_of: :user, class_name: "Request"

    has_many :notifications, inverse_of: :user, class_name: "Notification"

    has_many :donor_connections, inverse_of: :donor, class_name: "Connection", foreign_key: "donor_id"
    has_many :donee_connections, inverse_of: :donee, class_name: "Connection", foreign_key: "donee_id"

    # Included for Push Notifications
    include Mongoid::Document
    field :name, type: String
    field :email, type: String
    field :subscription, type: Hash

end
