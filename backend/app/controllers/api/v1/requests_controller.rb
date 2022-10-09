# To Note:
  # user_id for request object retrieved/created will be the user_id specfied in the URI
  # INDEX: Requests assumed to be searched in DESC order of creation

class Api::V1::RequestsController < ApplicationController
  before_action :set_request, only: %i[ show update destroy accept ]

  # GET /requests
  def index

    @requests = Request.all
    

    # /api/v1/feed/requests
    # /api/v1/feed/requests?category=accommodation
    # /api/v1/feed/requests?category[]=medical&category[]=transport&search=searchstring
    if request.path.include?("feed")
      # Get all requests that have not expired, then if search and categories are given, filter accordingly
      @requests = @requests.where.not(status: ["expired", "completed"])
      @requests = params[:search] ? @requests.where("lower(title) = ?", params[:search].downcase) : @requests # Case-insensitive search
      @requests = params[:category] ? @requests.where(request_type: params[:category]) : @requests  # Supports both array form and non-array form

      # if user_id passed in, remove those requests that:
        # the user created
        # the user has accepted the request before
      if params[:user_id]
        @requests = @requests.where.not(user_id: params[:user_id])

        user = User.find(params[:user_id])
        requests_hash = user.outreachs.select {|key, value| value == "pending"}
        @requests = @requests.where.not(id: requests_hash.keys) 
      end
      
      
    # /api/v1/users/:user_id/requests
    # /api/v1/users/1/requests?type=outreach&status=pending
    elsif params[:user_id]
      # Initialize user, throws 404 if user does not exist
      user = User.find(params[:user_id])
      # If want to get user outreach requests
      if params[:type] == "outreach"
        # Filter the hash by status, then for the resulting hash, find for requests that satisfies the key values 
        requests_hash = params[:status] ? user.outreachs.select {|key, value| value == params[:status]} : user.outreachs
        @requests = Request.where(id: requests_hash.keys)

      # Default: Get all requests that the User created, then filter by status
      else 
        @requests = user.requests
        @requests = (@requests != nil && params[:status]) ? @requests.where(status: params[:status]) : @requests
      end

    
    # /api/v1/requests
    else 
      @requests = Request.all
    end

    # Order in descending date of creation
    @requests = @requests != nil ? @requests.order(created_at: :desc) : @requests
    render json: @requests
  end

  # GET /requests/1
  def show
    if @request.status == "expired" && request.path.include?("feed")
      render :json => {:error => "Request not found/expired"}.to_json, :status => 404
    else
      render json: @request
    end
  end

  # POST /requests
  # user_id in JSON object will be the user_id of DB entry, irregardless of URI sent
  # Sample JSON to pass into request body to create Request DB entry:
  def create
    # init all new requests to pending status
    @request = Request.new(request_params)
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
    @request.destroy
  end

  # POST /requests/:id/accept
  # Param: user_id (donor accepting the request): Integer
  def accept
    
    if @request == nil
      puts "what request??"
      return
    end
    requestService = RequestService.new(@request)
    result = requestService.accept_request(params[:user_id])

    # result = [connection, notification]

    # If connect users is successful
    if result
      # Send a Webpush notification to the Donee
      notification_service = NotificationService.new(result[1])
      # notification_service.push_notification(nil) # unimplemented
    end

    render json: result

  end


  # Private callbacks
  # Use callbacks to share common setup or constraints between actions.
  private

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
          :location => [ :lat, :lng, :to, :from], 
          :tags => []
      )
    end
end
