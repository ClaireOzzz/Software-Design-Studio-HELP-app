require "google/cloud/dialogflow/v2/agents"
require "google/cloud/dialogflow/v2/sessions"
require "json"

class Api::V1::ChatbotsController < ApplicationController
  # before_action :set_chatbot, only: %i[ show update destroy ]

  # GET /chatbots
  # def index
  #   client = ::Google::Cloud::Dialogflow::V2::Agents::Client.new
  #   request = ::Google::Cloud::Dialogflow::V2::GetAgentRequest.new # (request fields as keyword arguments...)
  #   response = client.get_agent request
  #   render json: {"message": "Hello World"}
  # end
  @google_project_id = "gebirahbot-taaf"

  def text_input 
    query_input = { text: { text: params[:text], language_code: 'en'}}
    client = ::Google::Cloud::Dialogflow::V2::Sessions::Client.new do |config|
      config.credentials =  "gebirahbot-taaf-a14d1038aa01.json"
      #unused : "gebirah-help-app-80a3f9237316.json"
    end
    request = ::Google::Cloud::Dialogflow::V2::DetectIntentRequest.new :query_input => query_input, "session" =>"projects/gebirahbot-taaf/agent/sessions/12345"
    # @dialogflow = Google::Cloud::Dialogflow::V2::Sessions.new
    # req = Google::Cloud::Dialogflow::V2::DetectIntentRequest.new
    # Create a request. To set request fields, pass in keyword arguments.
    # request = Google::Cloud::Dialogflow::V2::GetAgentRequest.new :parent => "projects/gebirah-help-app"
    # puts request

    # Call the get_agent method.
    # result = client.get_agent request
    result = client.detect_intent request

    # The returned object is of type Google::Cloud::Dialogflow::V2::Agent.
    # puts result
    puts result.query_result.fulfillment_messages[1]
    render json: {
      "text": result.query_result.fulfillment_text,
      "data": JSON.generate(result.query_result.fulfillment_messages[1])
    }
  end 

  def audio_input
    render json: {"data": "audio input"}
  end 

  # GET /chatbots/1
  def show
    render json: {"test": "test"}
  end


  # # POST /chatbots
  # def create
  #   @chatbot = Chatbot.new(chatbot_params)

  #   if @chatbot.save
  #     render json: @chatbot, status: :created, location: @chatbot
  #   else
  #     render json: @chatbot.errors, status: :unprocessable_entity
  #   end
  # end

  # # PATCH/PUT /chatbots/1
  # def update
  #   if @chatbot.update(chatbot_params)
  #     render json: @chatbot
  #   else
  #     render json: @chatbot.errors, status: :unprocessable_entity
  #   end
  # end

  # # DELETE /chatbots/1
  # def destroy
  #   @chatbot.destroy
  # end

  # private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_chatbot
  #     @chatbot = Chatbot.find(params[:id])
  #   end

  #   # Only allow a list of trusted parameters through.
  #   def chatbot_params
  #     params.fetch(:chatbot, {})
  #   end
end
