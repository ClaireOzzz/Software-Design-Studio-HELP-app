cd backend
npx kill-port 3000 -y
npx kill-port 5000 -y 
npx kill-port 7000 -y  
# npx kill-port 8000 -y
npx kill-port 9000 -y

rm db/test.sqlite3
rails db:test:prepare
rails db:seed RAILS_ENV=test

rails s -e test  & cd ../frontend && npm run start & pwd & cd ../mlservices/create_request_ml_service && python main.py & cd ../mlservices/gebirah-chatbot && rails s & cd ../mlservices/mine-detection/mine-detection-server && rails s & bundle exec cucumber --publish
$SHELL

