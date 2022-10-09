# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Request Seeds
requests = [

    {   
        :user_id => 1, 
        :username => "Ludwig123",
        :title => "NEED BANDAGES", 
        :expiry => Date.new(2022,6,20), 
        :description => "i am BLEEDING HELP PLEASE", 
        :request_type => "medical",
        :quantity => {qty: 5}, 
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Telegram", "Phone"],
        :location => {"lat" => -34.397, "lng" => 150.644},
        :tags => ["Bandages", "Bleeding"]
    },
    { 
        :user_id => 3, 
        :username => "OksanaKovalenko",
        :title => "Finding a home for a family", 
        :expiry => Date.new(2022,6,19), 
        :description => "Our house got bombed and we need to find a new home for our family", 
        :request_type => "accommodation",
        :quantity => {adults: 2, children: 2, infants: 1}, 
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone", "Telegram"],
        :location => {"lat" => -33.597, "lng" => 149.142},
        :tags => ["Home", "Accomodation", "Family"]
    },
    { 
        :user_id => 2, 
        :username => "999_NotARussian_999",
        :title => "Need transport to Jyiv", 
        :expiry => Date.new(2022,6,19), 
        :description => "I am a relief worker that got separated from my group. Please Help!", 
        :request_type => "transport",
        :quantity => {adults: 1, children: 0, infants: 0}, 
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone"],
        :location => {
            "from" => {
                "lat" => -35.397,
                "lng" => 153.149
            },
            "to" => {
                "lat" => -36.124,
                "lng" => 152.412
            }
        },
        :tags => ["Transport", "Jyiv"]
    },
    { 
        :user_id => 3, 
        :username => "OksanaKovalenko",
        :title => "Need to feed my family!", 
        :expiry => Date.new(2022,6,19), 
        :description => "My family ran out of food. Please help! 😖 Will accept any food donations!", 
        :request_type => "food",
        :quantity => {adults: 2, children: 2, infants: 1}, 
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone", "Telegram"],
        :location =>  {"lat" => -33.597, "lng" => 149.142},
        :tags => ["Food", "Family"]
    },
    {   
        :user_id => 1, 
        :username => "Ludwig123",
        :title => "Need food", 
        :expiry => Date.new(2022,6,10), 
        :description => "I'm hungry and starving", 
        :request_type => "food",
        :quantity => {adults: 1, children: 0, infants: 0}, 
        :status => "expired", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Telegram", "Phone"],
        :location => {"lat" => -34.397, "lng" => 150.644},
        :tags => ["Hungry", "Starving"]
    },
    {   
        :user_id => 1, 
        :username => "Ludwig123",
        :title => "Need food", 
        :expiry => Date.new(2022,6,12), 
        :description => "I'm hungry!! please", 
        :request_type => "food",
        :quantity => {adults: 1, children: 0, infants: 0},
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Telegram", "Phone"],
        :location => {"lat" => -34.397, "lng" => 150.644},
        :tags => ["Hungry"]
    },
    
    

]





# Request Seeds
users = [

    {   # 1
        :username => "Ludwig123",
        :password => "1234567890",
        :contacts => {
            "Whatsapp" => 546234162,
            "Phone" => 1234567890,
            "Telegram" => "@bLuddy"
        }
    },

    {   # 2
        :username => "999_NotARussian_999",
        :password => "1234567890",
        :contacts => {
            "Whatsapp" => 9876543210,
            "Phone" => 9876543210,
            "Telegram" => "definietlyUkrainian"
        }
    },

    {   # 3
        :username => "OksanaKovalenko",
        :password => "1234567890",
        :contacts => {
            "Whatsapp" => 3333333333,
            "Phone" => 3333333333,
            "Telegram" => "Oksana12"
        }
    },

    {   # 4
        :username => "Lurker1234",
        :password => "1234567890",
        :contacts => {
            "Whatsapp" => 1231231231,
            "Phone" => 1231231231,
            "Telegram" => "mtlv123"
        }
    },

]


# Connection Seeds
connections = [

    {   # 1
        :request_id => 1,
        :donor_id => 4
    },

    {   # 2
        :request_id => 4,
        :donor_id => 1
    },

    {   # 3
        :request_id => 6,
        :donor_id => 2
    }

]

complete_requests = [
    {
        :notification_id => 3
    },
]

# # Notification Seeds
# notifications = [

#     {   # 1
#         :user_id => 1,
#         :from_id => 3,
#         :type => "ConnectionNotification",
#         :message => "message",
#         :connection_id => 1
#     }
    
# ]

users.each do |req|
    User.create!(req)
end


requests.each do |req|
    u = User.find(req[:user_id])
    u.requests.create(req)
    # Request.create!(req)
end


# Seeds notifications and connections
connections.each do |c|
    rs = RequestService.new(Request.find(c[:request_id]))
    rs.accept_request(c[:donor_id])
end

# Request completion 
complete_requests.each do |n|
    ns = NotificationService.new(Notification.find(n[:notification_id]))
    ns.accept_connection()
end




