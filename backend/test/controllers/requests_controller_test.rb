require "test_helper"

class RequestsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @request = requests(:one)
  end

  test "should get index" do
    get requests_url, as: :json
    assert_response :success
  end

  test "should create request" do
    assert_difference("Request.count") do
      post requests_url, params: { request: { description: @request.description, expiry: @request.expiry, family_size: @request.family_size, request_id: @request.request_id, request_type: @request.request_type, status: @request.status, timestamp: @request.timestamp, title: @request.title, user_id: @request.user_id, username: @request.username } }, as: :json
    end

    assert_response :created
  end

  test "should show request" do
    get request_url(@request), as: :json
    assert_response :success
  end

  test "should update request" do
    patch request_url(@request), params: { request: { description: @request.description, expiry: @request.expiry, family_size: @request.family_size, request_id: @request.request_id, request_type: @request.request_type, status: @request.status, timestamp: @request.timestamp, title: @request.title, user_id: @request.user_id, username: @request.username } }, as: :json
    assert_response :success
  end

  test "should destroy request" do
    assert_difference("Request.count", -1) do
      delete request_url(@request), as: :json
    end

    assert_response :no_content
  end
end
