class Connection < ApplicationRecord
    belongs_to :request, inverse_of: :connections, class_name: "Request"

    # ConnectionNotification
    has_one :notification, inverse_of: :connection, class_name: "ConnectionNotification"

    belongs_to :donee, inverse_of: :donee_connections, class_name: "User"
    belongs_to :donor, inverse_of: :donor_connections, class_name: "User"
end
