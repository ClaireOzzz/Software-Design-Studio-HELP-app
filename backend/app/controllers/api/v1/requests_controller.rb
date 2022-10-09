class Api::V1::RequestsController < ApplicationController
  before_action :set_request, only: %i[ show update destroy accept repost ]
  before_action :check_expiry, only: %i[ index show ]

  

  # GET /requests
  def index

    if request.path.include?("feed")
      @requests = Request.get_feed_requests(params[:user_id], params[:search], params[:category]) 
    # /api/v1/users/:user_id/requests
    # /api/v1/users/1/requests?type=outreach&status=pending
    elsif params[:user_id]
      @requests = Request.get_user_requests(params[:user_id], params[:type], params[:status])
    # /api/v1/requests
    else 
      @requests = Request.all
    end
    # Order in descending date of creation
    @requests = @requests != nil ? @requests.order(created_at: :desc) : @requests

    # Handling proximity filtering
    if params[:proximity] && params[:lat] && params[:lng] && !@requests.empty?
      limit = params[:proximity].to_f
      lat = params[:lat].to_f
      lng = params[:lng].to_f
      @requests = @requests.filter { |req| req.distanceFrom(lat, lng) < limit }
    end
    
    render json: @requests
  end

  # GET /requests/1
  def show
    # if @request.status == "expired" && request.path.include?("feed")
    #   render :json => {:error => "Request not found/expired"}.to_json, :status => 404
    # else
      # render json: @request
    # end
    render json: @request
  end

  # POST /requests
  # user_id in JSON object will be the user_id of DB entry, irregardless of URI sent
  # Sample JSON to pass into request body to create Request DB entry:
  def create
    # init all new requests to pending status
    @request = Request.new(request_params)
    if !@request.location.empty?
      @request.update_lat_long()
    end
    @request.username = User.find(request_params[:user_id]).username
    @request.status = "pending"

    if @request.save
      render json: @request, status: :created, location: api_v1_user_url(@request)
    else
      puts @request.errors.full_messages
      render json: @request.errors, status: :unprocessable_entity
    end
  end



  # PATCH/PUT /requests/1
  def update
    if @request.update(request_params)
      render json: @request
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # DELETE /requests/1
  def destroy
    requestService = RequestService.new(@request)
    requestService.destroy_associated
    # update donors outreach
    users = User.select { |user| user.outreachs.key?(@request.id) }
    users.each do |user|
      User.update_outreach_status(user.id, @request.id, nil)
    end
    @request.destroy
    render json: @request
  end

  # POST /requests/:id/accept
  # Param: user_id (donor accepting the request): Integer
  def accept
    
    if @request == nil
      puts "what request??"
      return
    end
    requestService = RequestService.new(@request)
    result = requestService.accept_request(params[:user_id]) # returns [connection, notification]

    # Send webpush
    # if result
    #   notification_service = NotificationService.new(result[1])
    #   notification_service.push_notification(nil) # unimplemented
    # end

    render json: result

  end

  # POST /requests/:id/repost
  def repost

    # update expiry
    @request.expiry = DateTime.now + 3.days
    @request.save

    # update status
    @request.update_request_status(nil)
    
    render json: @request

  end


  # Private callbacks
  # Use callbacks to share common setup or constraints between actions.
  private
    # may cause lag on GET requests on large scale deployment
    # checks expiry of requests and set status to expired as needed
    def check_expiry
      Request.all.each do |req|
        req.update_status_by_expiry()
      end
    end

    # This method, set_request, is not called on index action
    def set_request
      @request = Request.find(params[:id])
    end


    # Only allow a list of trusted parameters through.
    def request_params
      params.require(:request).permit(
          :user_id, 
          :username, 
          :title, 
          :expiry, 
          :description, 
          :request_type, 
          :status, 
          :quantity => [ :adults, :children, :infants, :qty ], 
          :preferred_mode_of_contact => [], 
          :location => [ :lat,
            :lng,
            :name,
            :to => [:lat, :lng, :name], 
            :from => [:lat, :lng, :name]
          ], 
      )
    end
end
