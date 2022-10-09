require "test_helper"

class ChatbotsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @chatbot = chatbots(:one)
  end

  test "should get index" do
    get chatbots_url, as: :json
    assert_response :success
  end

  test "should create chatbot" do
    assert_difference("Chatbot.count") do
      post chatbots_url, params: { chatbot: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show chatbot" do
    get chatbot_url(@chatbot), as: :json
    assert_response :success
  end

  test "should update chatbot" do
    patch chatbot_url(@chatbot), params: { chatbot: {  } }, as: :json
    assert_response :success
  end

  test "should destroy chatbot" do
    assert_difference("Chatbot.count", -1) do
      delete chatbot_url(@chatbot), as: :json
    end

    assert_response :no_content
  end
end
