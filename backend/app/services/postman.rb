require 'net/http'

class Postman

    GOOGLE_MAPS_API_KEY = 'AIzaSyB3o4KOTL6IpypI0a0DYJrjwIAm-d9x19k';

    def self.send_req_to_api(uri)
        url = URI.parse(uri)
        http = Net::HTTP.new(url.host, url.port)
        req = Net::HTTP::Get.new(uri.to_s)
        puts "Postman Calling " + uri.to_s
        
        http.use_ssl = (url.scheme == "https") 
        res = http.request(req)

        return JSON.parse(res.body)
    end


    def self.google_maps_geocode_req(address)
        address_string = address.split(/[,\s]+/).join("+")
        address_string = Postman.format_param(address_string.encode('ASCII', 'binary', invalid: :replace, undef: :replace, replace: ''))
        location_data = Postman.send_req_to_api("https://maps.googleapis.com/maps/api/geocode/json?address=#{address_string}&key=#{GOOGLE_MAPS_API_KEY}")

        # puts location_data["results"][0]["formatted_address"]
        if !location_data["results"].empty?
            result = {:lat => location_data["results"][0]["geometry"]["location"]["lat"], :lng => location_data["results"][0]["geometry"]["location"]["lng"]}
            puts result
            return result
        end
        puts "failed to obtain lat lng"
        return {:lat => nil, :lng => nil}
    
    end

    def self.google_maps_rev_geocode_req(lat, lng)
        latlng = lat.to_s + "," + lng.to_s
        location_data = Postman.send_req_to_api("https://maps.googleapis.com/maps/api/geocode/json?latlng=#{latlng}&key=#{GOOGLE_MAPS_API_KEY}")
        
        if !location_data["results"].empty?
            result = location_data["results"][0]["formatted_address"]
            puts result
            return result
        end
        puts "failed to obtain address name"
        return nil
    
    end

    def self.format_param(param)
        reserved = /[\/.?=&:#\s]+/ # URI-reserved characters
        return param.gsub(reserved) {|s| "%" + s.ord.to_s(16)}
    end


        

    
end