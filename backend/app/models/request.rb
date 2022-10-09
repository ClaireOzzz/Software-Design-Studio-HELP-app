class Request < ApplicationRecord

    def update_request_status(new_status)
     
      if (new_status)
        self.status = new_status
        self.save

      # If no new_status is given, update by checking connections/expiry date
      elsif !update_status_by_expiry
        connections = Connection.where(request_id: self.id )
        puts connections
        if connections.empty?
          puts "pending"
          self.update_request_status("pending")
        elsif connections.where(status: true).empty?
          puts "accepted"
          self.update_request_status("accepted")
        else
          puts "completed"
          self.update_request_status("completed")
        end
      end
    end

    def update_status_by_expiry()
      now = DateTime.now
      if now > expiry && self.status != "expired"
        self.update_request_status("expired")
        return true
      end
      return false
    end



    # Get an index of requests owned by a specific user, as a donee or donor, with the specified status.
    def self.get_user_requests(user_id, type, status)
      # Initialize user, throws 404 if user does not exist
      user = User.find(user_id)
      # If want to get user outreach requests
      if type == "outreach"
        # Filter the hash by status, then for the resulting hash, find for requests that satisfies the key values 
        requests = user.get_outreachs(status, nil)

      # Default: Get all requests that the User created, then filter by status
      else 
        requests = user.requests
        requests = (requests != nil && status) ? requests.where(status: status) : requests
      end
      return requests
    end



    # Get an index of requests (for a specific user?) viewing the feed, for the given search and category params
    def self.get_feed_requests(user_id, search, category) 
    
      # Get all requests that are not expired
      requests = Request.where.not(status: ["expired"])

      # Filter by search or category
      requests = search ? requests.where("lower(title) = ?", search.downcase) : requests # Case-insensitive search
      requests = category ? requests.where(request_type: category) : requests  # Supports both array form and non-array form

      # if user_id passed in, remove those requests that:
        # the user created
        # the user has accepted the request before (negate flag = true)
      if user_id
        requests = requests.where.not(user_id: user_id)
        requests = User.find(user_id).get_outreachs("pending", requests, true)
      end

      return requests
    end



    def update_lat_long()
        if self.request_type == "transport"

          # Transport request with name given
          if self.location[:to][:name] && self.location[:from][:name]

            to_location_data = Postman.google_maps_geocode_req(self.location[:to][:name])
            from_location_data = Postman.google_maps_geocode_req(self.location[:from][:name])
        
            self.location[:to][:lat] = to_location_data[:lat]
            self.location[:to][:lng] = to_location_data[:lng]
      
            self.location[:from][:lat] = from_location_data[:lat]
            self.location[:from][:lng] = from_location_data[:lng]

          # Transport request with latlng given
          elsif (self.location[:to][:lat] \
              && self.location[:to][:lng] \
              && self.location[:from][:lat] \
              && self.location[:from][:lng])

            to_location_name = Postman.google_maps_rev_geocode_req(self.location[:to][:lat], self.location[:to][:lng])
            from_location_name = Postman.google_maps_rev_geocode_req(self.location[:from][:lat], self.location[:from][:lng])

            self.location[:to][:name] = to_location_name
            self.location[:from][:name] = from_location_name
          end

        else

          # Other request with name given
          if self.location[:name]
            location_data = Postman.google_maps_geocode_req(self.location[:name])
            
            self.location[:lat] = location_data[:lat]
            self.location[:lng] = location_data[:lng]

          # Other request with latlng given
          elsif self.location[:lat] && self.location[:lng]
            location_name = Postman.google_maps_rev_geocode_req(self.location[:lat], self.location[:lng])

            self.location[:name] = location_name
            
          end
        end
        self.save
    end



    def distanceFrom(lat, lng)
      # Set up location coords
      req_coords = (self.request_type == 'transport') ? self.location[:from] : self.location
      if req_coords && req_coords[:lat] && req_coords[:lng]
        user_coords = {:lat => lat, :lng => lng}
        # puts Request.haversine(req_coords, user_coords)
        return Request.haversine(req_coords, user_coords)
      end
      return 0
    end


    def self.haversine(coords1, coords2)

      # Setup
      lat1 = coords1[:lat]
      lon1 = coords1[:lng]
      
      lat2 = coords2[:lat]
      lon2 = coords2[:lng]

      # Deltas
      dlat = (lat2-lat1) * Math::PI / 180 
      dlon = (lon2-lon1) * Math::PI / 180 

      # Computation
      r = 6371; # KM
      c = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
          Math.cos((lat1) * Math::PI / 180) * Math.cos((lat2) * Math::PI / 180) * 
          Math.sin(dlon / 2) * Math.sin(dlon / 2)
      
      return 2*r * Math.atan2( Math.sqrt(c), Math.sqrt(1 - c) )
    end

    
    # Auto-Serialization from YAML to Hash/Array datatypes, for both to-and-fro the DB
    # https://stackoverflow.com/questions/4386545/how-to-keep-a-hash-value-in-the-table-column-in-rails
    serialize :quantity, Hash
    serialize :location, Hash
    serialize :preferred_mode_of_contact, Array

    belongs_to :user, inverse_of: :requests, class_name: "User"

end
