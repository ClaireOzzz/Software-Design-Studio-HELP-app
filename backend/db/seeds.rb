# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Request Seeds
requests = [

    {    # 1
        :user_id => 1, 
        :username => "OksanaKovalenko",
        :title => "NEED BANDAGES", 
        :expiry => Date.today + 1.days, 
        :description => "i am BLEEDING HELP PLEASE", 
        :request_type => "medical",
        :quantity => {qty: 5}, 
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Telegram", "Phone"],
        :location => {:name => "SUTD, 8 Somapah Rd, Singapore 487372"},
    },
    {     # 2
        :user_id => 3, 
        :username => "ekatarina",
        :title => "Finding a home for a family", 
        :expiry => Date.today + 2.days, 
        :description => "Our house got bombed and we need to find a new home for our family", 
        :request_type => "accommodation",
        :quantity => {adults: 2, children: 2, infants: 1}, 
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone", "Telegram"],
        :location => {:name => "Marina Square, Singapore"},
    },
    {     # 3
        :user_id => 2, 
        :username => "Heorhiyhello",
        :title => "Need transport to Jyiv", 
        :expiry => Date.today + 2.days, 
        :description => "I am a relief worker that got separated from my group. Please Help!", 
        :request_type => "transport",
        :quantity => {adults: 1, children: 0, infants: 0}, 
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Telegram"],
        :location => {
            :from => {:name => "Polish-Ukrainian Border Crossing Budomierz-Hruszow"},
            :to => {:name => "Maidan Nezalezhnosti"}
        },
    },
    {    # 4
        :user_id => 3, 
        :username => "ekatarina",
        :title => "Need to feed my family!", 
        :expiry => Date.today + 4.days, 
        :description => "My family ran out of food. Please help! 😖 Will accept any food donations!", 
        :request_type => "food",
        :quantity => {adults: 2, children: 2, infants: 1}, 
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone", "Telegram"],
        :location =>  {:name => "Marina Square, Singapore"},
    },
    {   # 5   
        :user_id => 1, 
        :username => "OksanaKovalenko",
        :title => "Need food", 
        :expiry => Date.today - 5.days, 
        :description => "I'm hungry and starving", 
        :request_type => "food",
        :quantity => {adults: 1, children: 0, infants: 0}, 
        :status => "expired", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Telegram", "Phone"],
        :location => {:name => "SUTD, 8 Somapah Rd, Singapore 487372"},
    },
    {   # 6     
        :user_id => 1, 
        :username => "OksanaKovalenko",
        :title => "Need food", 
        :expiry => Date.today + 5.days, 
        :description => "I'm hungry!! please", 
        :request_type => "food",
        :quantity => {adults: 1, children: 0, infants: 0},
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Telegram", "Phone"],
        :location => {:name => "SUTD, 8 Somapah Rd, Singapore 487372"},
    },

    {   # 7     
        :user_id => 5, 
        :username => "Polinanana",
        :title => "need to go to fetch my family", 
        :expiry => Date.today + 6.days, 
        :description => "my family stuck please help i want to see them", 
        :request_type => "transport",
        :quantity => {adults: 3, children: 3, infants: 0},
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone"],
        :location => {
            :from => {:name => "Changi City Point"},
            :to => {:name => "Woodlands Checkpoint"}
        },
    },

    {   # 8     
        :user_id => 3, 
        :username => "ekatarina",
        :title => "Need fever medication", 
        :expiry => Date.today + 6.days, 
        :description => "My mum is stuck with a bad fever and it is not going down since 4 days ago. We need a batch of panadol to let her recover. Please help!", 
        :request_type => "medical",
        :quantity => {qty: 40},
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone", "Telegram"],
        :location => {:name => "Simei MRT, Singapore"},
    },

    {   # 9     
        :user_id => 5, 
        :username => "Polinanana",
        :title => "Require food", 
        :expiry => Date.today + 7.days, 
        :description => "Hello, we require food as our rations are running out in a week!", 
        :request_type => "food",
        :quantity => {adults: 3, children: 3, infants: 0},
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone"],
        :location => {:name => "SUTD, 8 Somapah Rd, Singapore 487372"},
    },

    {   # 10     
        :user_id => 5, 
        :username => "Polinanana",
        :title => "We need rice rations!", 
        :expiry => Date.today + 7.days, 
        :description => "We are running out of our staple food rice and we would appreciate rice donations.", 
        :request_type => "food",
        :quantity => {adults: 3, children: 3, infants: 0},
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone"],
        :location => {:name => "Sungei Gedong Camp, Singapore"},
    },

    {   # 11     
        :user_id => 4, 
        :username => "ludwig_gorny",
        :title => "I need to go to deliver a package", 
        :expiry => Date.today + 9.days, 
        :description => "My friend had recently pass away and I need to pass his belongings to his family. Please help make his dying widh come true.", 
        :request_type => "transport",
        :quantity => {adults: 1, children: 0, infants: 0},
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone", "Telegram", "WeChat"],
        :location => {
            :from => {:name => "Singapore Science Centre, Singapore"},
            :to => {:name => "Bangkok Train Station, Thailand"}
        },
    }, 
    
    {   # 12     
        :user_id => 4, 
        :username => "ludwig_gorny",
        :title => "I need a place to stay for a month", 
        :expiry => Date.today + 6.days, 
        :description => "I need a place to stay for 1 month so that I can recover my leg from being broken", 
        :request_type => "accommodation",
        :quantity => {adults: 1, children: 0, infants: 0},
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone", "Telegram", "WeChat"],
        :location => {:name => "Dorsett Kuala Lumpur, Malaysia"},
    },
    
    {   # 13     
        :user_id => 1, 
        :username => "OksanaKovalenko",
        :title => "Require painkillers", 
        :expiry => Date.today - 2.days, 
        :description => "My child has the flu and we need painkillers for his rising fever.", 
        :request_type => "medical",
        :quantity => {qty: 30},
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Telegram", "Phone"],
        :location => {:name => "SUTD, 8 Somapah Rd, Singapore 487372"},
    },

    {   # 14     
        :user_id => 2, 
        :username => "Heorhiyhello",
        :title => "Can anybody bring us to the hospital?", 
        :expiry => Date.today - 5.days, 
        :description => "My child has recently gotten a fever and we need an official diagnosis. Can anybody drive us to the hospital to get him checked?", 
        :request_type => "transport",
        :quantity => {adults: 1, children: 1, infants: 0},
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone", "Telegram", "WeChat"],
        :location => {
            :from => {:name => "Singapore Science Centre, Singapore"},
            :to => {:name => "Nee Soon Medical Centre, Singapore"}
        },
    },

    {   # 14     
        :user_id => 5, 
        :username => "Polinanana",
        :title => "We need to fetch our father!!", 
        :expiry => Date.today - 7.days, 
        :description => "Our father got left by the train and we need to get him to safety. A 2-way car rider would be very helpful. Thank you.", 
        :request_type => "transport",
        :quantity => {adults: 3, children: 0, infants: 0},
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Phone"],
        :location => {
            :from => {:name => "Choa Chu Kang MRT/LRT station, Singapore"},
            :to => {:name => "Sultan Shoal Lighthouse, Singapore"}
        },
    },

    {   # 15     
        :user_id => 1, 
        :username => "OksanaKovalenko",
        :title => "We need a trip to the post office", 
        :expiry => Date.today + 7.days, 
        :description => "We have a package stuck at the post office. Public transport isn't working so we are proposing to carpool to the place. Thank you!", 
        :request_type => "transport",
        :quantity => {adults: 2, children: 0, infants: 0},
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Telegram", "Phone"],
        :location => {
            :from => {:name => "Mapletree Business City II, 70 Pasir Panjang Road, Singapore"},
            :to => {:name => "SingPost Centre, Singapore"}
        },
    },

    {   # 16   
        :user_id => 1, 
        :username => "OksanaKovalenko",
        :title => "Relatives require place to stay", 
        :expiry => Date.today + 5.days, 
        :description => "My relatives are arriving in a bit and I am helping them find a place to stay. They are nice people so if you can help that will be great!", 
        :request_type => "accommodation",
        :quantity => {adults: 2, children: 0, infants: 1}, 
        :status => "pending", 
        :timestamp => DateTime.now,
        :preferred_mode_of_contact => ["Whatsapp", "Telegram", "Phone"],
        :location => {:name => "Exeter Road, Singapore"},
    },
    

]





# Request Seeds
users = [

    {   # 1
        :username => "OksanaKovalenko",
        :password => "1234567890",
        :contacts => {
            "Whatsapp" => 546234162,
            "Phone" => 1234567890,
            "Telegram" => "Oksana12"
        }
    },

    {   # 2
        :username => "Heorhiyhello",
        :password => "1234567890",
        :contacts => {
            "Whatsapp" => 9876543210,
            "Telegram" => "slavaUkraini999"
        }
    },

    {   # 3
        :username => "ekatarina",
        :password => "1234567890",
        :contacts => {
            "Whatsapp" => 3333333333,
            "Phone" => 3333333333,
            "Telegram" => "@bLuddy"
        }
    },

    {   # 4
        :username => "ludwig_gorny",
        :password => "1234567890",
        :contacts => {
            "Whatsapp" => 1231231231,
            "Phone" => 1231231231,
            "Telegram" => "mtlv123",
            "WeChat" => "mtlv1231"
        }
    },

    {   # 5
        :username => "Polinanana",
        :password => "5555555555",
        :contacts => {
            "Whatsapp" => 5555555555,
            "Phone" => 5555555555,
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
    },

    {   # 4
        :request_id => 1,
        :donor_id => 5
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
    # u = User.find(req[:user_id])
    # u.requests.create(req)
    r = Request.create!(req)
    r.update_lat_long
    r.save
end


# Seeds notifications and connections
connections.each do |c|
    rs = RequestService.new(Request.find(c[:request_id]))
    rs.accept_request(c[:donor_id])
end

# Request completion 
complete_requests.each do |n|
    begin
        ns = NotificationService.new(Notification.find(n[:notification_id]))
        ns.accept_connection()
    rescue
        puts "Seeded Notification not accepted. (Probably doesn't exist. Its fine though.)"
    end  
end




