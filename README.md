![Alt text](/images/cover.png "Optional title")

# Gebirah HELP app 

Our application is a non profit humanitarian app aiming to help users assist others within their community and get help 

### Link to our Google site 
https://sites.google.com/mymail.sutd.edu.sg/pelican/home 

### Design Workbook
The design workbook contains all the design iterations.
Click [here](https://docs.google.com/document/d/1JTMoWL6NHqtFPFNF7bLJVMTa9YyRwz1VWOSiVf6YaZk/edit?usp=sharing) to view.

### System Architecture 
![Alt text](/images/system_architecture.png "Optional title")

To run our code you have two options: 
1. Use our integrated shell script 
2. Run it Manually 

### Dependencies 
- Python 3.8.8 
- Ruby 2.7.6 

### Shell Script 
To perform all installations you may call the following shell script: 
```
# Run this code block once
# cd to root directory of repository 
./prepare_files.sh
```

To run all tests: 
```
# cd to root directory of repository 
./test.sh
```

### Run manually 
#### install packages in frontend
```
cd frontend
npm install 
```

#### install packages and seed database for microservice 1, feed page and notification
```
# in frontend folder 
cd ../backend
bundle 
```
```
# Run this if database not seeded 
rails db:migrate 
rails db:seed 
rails db:test:prepare
```
#### install packages and seed database for microservice 2, ml text summarization and zero shot classification 
```
# in backend folder 
cd ../mlservices/create_request_ml_service
pip install -r requirements.txt 
```

#### install packages and seed database for microservice 3, chatbot 
```
# in mlservices/create_request_ml_service folder 
cd ../gebirah-chatbot
bundle
```
```
# Run this if database not seeded 
rails db:migrate 
rails db:seed 
rails db:test:prepare
```

#### install packages and seed database for microservice 4, unexploded ordnance object detection 
```
# in mlservices/chatbot folder
cd ../mine-detection/mine-detection-server
bundle
```
```
# Run this if database not seeded 
rails db:migrate 
rails db:seed 
rails db:test:prepare
```

### Start app 
#### Run frontend 
Our React frontend runs on port 5000 
```
# in root folder 
cd frontend 
npm start 
``` 
#### Run backend 
Our rails backend runs on port 3000 
```
# in root folder
cd backend
rails s 
```
#### Run ml text summarization and zero shot classification
Our flask ml text summarization and zero shot classification backend runs on port 8000
```
# in root folder 
cd mlservices/create_request_ml_service
python main.py 
```

#### Run chatbot 
Our flask ml text summarization and zero shot classification backend runs on port 7000
```
cd mlservices/gebirah-chatbot
rails s 
```

#### Run UXO detection 
Our unexploded ordnance detection runs on port 9000, requires google cloud object detection model to be running 
```
# in root folder 
cd mlservices/mine-detection/mine-detection-server
rails s 
```

### Running tests 
#### kill all ports
```
npx kill-port 3000 -y
npx kill-port 5000 -y 
npx kill-port 7000 -y  
npx kill-port 8000 -y
npx kill-port 9000 -y
```
#### seed test database 
Open a new terminal and run
```
# in root folder 
cd backend 
rm db/test.sqlite3
rails db:test:prepare
rails db:seed RAILS_ENV=test
```
#### run backend 
```
# in backend folder
rails s 
```
#### run frontend 
Open a new terminal and run
```
# in root folder
cd frontend 
npm run start 
```

#### Run ml text summarization and zero shot classification
Open a new terminal and run
```
# in root folder 
cd mlservices/create_request_ml_service
python main.py 
```

#### run chatbot 
Open a new terminal and run
```
# in root folder 
cd mlservices/gebirah-chatbot
rails s 
```
#### Run UXO detection 
Open a new terminal and run 
```
# in root folder 
cd mlservices/mine-detection/mine-detection-server
rails s 
```
#### run cucumber tests 
```
# in root folder 
cd backend 
bundle exec cucumber
```