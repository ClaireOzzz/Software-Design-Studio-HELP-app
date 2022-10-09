# To Note:
  # user_id for request object retrieved/created will be the user_id specfied in the URI
  # INDEX: Requests assumed to be searched in DESC order of creation

class Api::V1::RequestsController < ApplicationController
  before_action :set_request, only: %i[ show update destroy ]

  # GET /requests
  def index

    # /api/v1/users/:user_id/requests
    # /api/v1/users/1/requests?type=outreach&status=pending
    if params[:user_id]
      # Initialize user, throws 404 if user does not exist
      user = User.find(params[:user_id])
      if params[:type] == "outreach"
        # Filter the hash by status, then for the resulting hash, find for requests that satisfies the key values 
        requests_hash = params[:status] ? requests_hash.select {|key, value| value == params[:status]} : user.outreachs
        @requests = Request.where(id: requests_hash.keys)
      # Default: Get all requests that the User created, then filter by status
      else 
        @requests = user.requests
        @requests = (@requests != nil && params[:status]) ? @requests.where(status: params[:status]) : @requests
      end

    # /api/v1/feed/requests
    # /api/v1/feed/requests?category=accomodation
    # /api/v1/feed/requests?category[]=medical&category[]=transport&search=searchstring
    elsif request.path.include?("feed")
      # Get all requests that have not expired, then if search and categories are given, filter accordingly
      @requests = Request.where.not(status: "expired")
      @requests = params[:search] ? Request.where("lower(title) = ?", params[:search].downcase) : @requests # Case-insensitive search
      @requests = params[:category] ? @requests.where(request_type: params[:category]) : @requests  # Supports both array form and non-array form
      
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
      render(:file => File.join(Rails.root, 'public/403.html'), :status => 403, :layout => true)
    else
      render json: @request
    end
  end

  # POST /requests
  # user_id in JSON object will be the user_id of DB entry, irregardless of URI sent
  # Sample JSON to pass into request body to create Request DB entry:
  def create
    @request = Request.new(request_params)

    if @request.save
      render json: @request, status: :created, location: api_v1_user_url(@request)
    else
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
    @request.destroy
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
          :quantity => [ :Adult, :Child, :Infant, :qty ], 
          :preferred_mode_of_contact => [], 
          :location => [ :lqt, :lng, :to, :from], 
          :tags => []
      )
    end
end
