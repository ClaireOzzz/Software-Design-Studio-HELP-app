class Api::V1::ConnectionsController < ApplicationController
  before_action :set_connection, only: %i[ show update destroy ]

  # GET /connections
  def index
    @connections = params[:status] ? Connection.where(status: ActiveModel::Type::Boolean.new.cast(params[:status]) ) : Connection.all
    @connections = params[:user_id] ? @connections.where(donee_id: params[:user_id]).or(@connections.where(donor_id: params[:user_id])) : @connections

    render json: @connections
  end

  # GET /connections/1
  def show
    render json: @connection
  end

  # POST /connections
  def create
    @connection = Connection.new(connection_params)

    if @connection.save
      render json: @connection, status: :created, location: api_v1_user_url(@connection)
    else
      render json: @connection.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /connections/1
  def update
    if @connection.update(connection_params)
      render json: @connection
    else
      render json: @connection.errors, status: :unprocessable_entity
    end
  end

  # DELETE /connections/1
  def destroy
    @connection.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_connection
      @connection = Connection.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def connection_params
      params.require(:connection).permit(:request_id, :donor_id, :donee_id, :status, :notification_id)
    end
end
