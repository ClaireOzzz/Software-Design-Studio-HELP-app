cd frontend 
npm install 

cd ../backend 
bundle
rails db:migrate 
rails db:seed 
rails db:test:prepare

cd ../mlservices/create_request_ml_service
pip install -r requirements.txt 

cd ../gebirah-chatbot
bundle
rails db:migrate 
rails db:seed 
rails db:test:prepare

cd ../mine-detection/mine-detection-server
bundle
rails db:migrate 
rails db:seed 
rails db:test:prepare