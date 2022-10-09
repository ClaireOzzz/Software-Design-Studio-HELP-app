module ApiHelper
    def send_req_to_api(uri)
        url = URI.parse(uri)
        req = Net::HTTP::Get.new(url.to_s)
        res = Net::HTTP.start(url.host, url.port) {|http|
        http.request(req)
        }
        JSON.parse(res.body)
    end
end 

World(ApiHelper)