# Add preferred_mode_of_contact, location, tags, all as arrays, to requests
class AddParametersToRequests < ActiveRecord::Migration[7.0]
  def change
    add_column :requests, :preferred_mode_of_contact, :text, default: "" 
    add_column :requests, :location, :text, default: "" 
    add_column :requests, :tags, :text, default: "" 
  end
end

# Request.create!(user_id:30, username:"okawan", title:"Need help", expiry:Date.new(2022,6,21), description:"dying by rails", request_type:"transport", family_size:{ :font_size => 10, :font_family => "Arial" }, preferred_mode_of_contact: ["WhatsApp", "Phone", "Telegram"], location: [12415212, 12415212], tags: ["bandage", "medical", "help"], status:"open", timestamp:DateTime.now)