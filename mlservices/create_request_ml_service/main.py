from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import ast
from model import model




app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "gebirah-help-ml-service!"

@app.route('/predict', methods=['POST'])
def predict():
    text= request.json['text']
    label, summarized_text = model(text)

    output = {
        "label": label, 
        "summarized_text": summarized_text
    }
    return output

if __name__ == "__main__": 
    # app.run(debug=True,  host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
    app.run(debug=True,  host="0.0.0.0", port=8000)