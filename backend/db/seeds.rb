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
        :username => "Zukov Vladinsky",
        :title => "NEED BANDAGES", 
        :expiry => Date.new(2022,6,20), 
        :description => "i am BLEEDING HELP PLE", 
        :request_type => "medical",
        :quantity => {qty: 5}, 
        :status => "open", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Telegram", "Phone"],
        :location => {"lat" => -34.397, "lng" => 150.644},
        :tags => ["Bandages", "Bleeding"]
    },
    { 
        :user_id => 3, 
        :username => "Oksana Kovalenko",
        :title => "Finding a home for a family", 
        :expiry => Date.new(2022,6,19), 
        :description => "Our house got bombed and we need to find a new home for our family", 
        :request_type => "accomodation",
        :quantity => {Adult: 2, Child: 2, Infant: 1}, 
        :status => "open", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone", "Telegram"],
        :location => {"lat" => -33.597, "lng" => 149.142},
        :tags => ["Home", "Accomodation", "Family"]
    },
    { 
        :user_id => 2, 
        :username => "Aaron Cykes",
        :title => "Need transport to Jyiv", 
        :expiry => Date.new(2022,6,19), 
        :description => "I am a relief worker that got separated from my group. Please Help!", 
        :request_type => "transport",
        :quantity => {Adult: 1, Child: 0, Infant: 0}, 
        :status => "open", 
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
        :username => "Oksana Kovalenko",
        :title => "Need to feed my family!", 
        :expiry => Date.new(2022,6,19), 
        :description => "My family ran out of food. Please help! 😖 Will accept any food donations!", 
        :request_type => "food",
        :quantity => {Adult: 2, Child: 2, Infant: 1}, 
        :status => "open", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone", "Telegram"],
        :location =>  {"lat" => -33.597, "lng" => 149.142},
        :tags => ["Food", "Family"]
    },
    

]





# Request Seeds
users = [

    {   # 1
        :username => "Ludwig123",
        :password => "1234567890"
    },

    {   # 2
        :username => "999_NotARussian_999",
        :password => "1234567890"
    },

    {   # 3
        :username => "HelpMePlease",
        :password => "1234567890"
    },

    {   # 4
        :username => "Lurker1234",
        :password => "1234567890"
    },

]


# Connection Seeds
connections = [

    {   # 1
        :request_id => 1,
        :donor_id => 3,
        :donee_id => 1,
        :status => false
    },

    {   # 2
        :request_id => 4,
        :donor_id => 2,
        :donee_id => 3,
        :status => true
    }

]

# Notification Seeds
notifications = [

    {   # 1
        :user_id => 1,
        :from_id => 3,
        :type => "ConnectionNotification",
        :message => "message",
        :connection_id => 1
    }
    
]

users.each do |req|
    User.create!(req)
end


requests.each do |req|
    u = User.find(req[:user_id])
    u.requests.create(req)
    # Request.create!(req)
end

connections.each do |c|
    Connection.create!(c)
end

notifications.each do |n|
    u = User.find(n[:user_id])
    u.notifications.create(n)
end



