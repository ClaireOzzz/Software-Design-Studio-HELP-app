class Api::V1::NotificationsController < ApplicationController
  before_action :set_notification, only: %i[ show update destroy accept reject ]
  before_action :set_notification_service, only: %i[ accept reject ]

  # GET /notifications
  def index
    @notifications = params[:user_id] ? Notification.where(user_id: params[:user_id]) : Notification.all

    render json: @notifications
  end

  # GET /notifications/1
  def show
    render json: @notification
  end

  # POST /notifications
  def create
    if (notification_params[:type] == "ConnectionNotification")
      @notification = ConnectionNotification.create_from_connection(
        Connection.find(notification_params[:connection_id]), 
        notification_params[:message]
      )
      render json: @notification, status: :created, location: api_v1_user_url(@notification)
    else 
      @notification = Notification.new(notification_params)

      if @notification.save
        render json: @notification, status: :created, location: api_v1_user_url(@notification)
      else
        render json: @notification.errors, status: :unprocessable_entity
      end
    end

  end

  # PATCH/PUT /notifications/1
  def update
    if @notification.update(notification_params)
      render json: @notification
    else
      render json: @notification.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notifications/1
  def destroy
    @notification.destroy
  end

  def accept
    # @notification_service.push_notification # Unimplemented
    c = @notification_service.accept_connection
    render json: c.get_connection_contacts
  end

  def reject
    # @notification_service.push_notification # Unimplemented
    result = @notification_service.reject_connection
    render json: result
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_notification
      @notification = Notification.find(params[:id])
    end

    def set_notification_service
      @notification_service = NotificationService.new(@notification)
    end

    # Only allow a list of trusted parameters through.
    def notification_params
      params.require(:notification).permit(:user_id, :from_id, :message, :type, :connection_id, :created_at, :updated_at)
    end
end
