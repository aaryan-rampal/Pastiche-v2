from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/pastiche", methods=['POST'])
def users():
	request_data = request.json.get('data')
	points = request_data.get('points')
	print(a)
	return points, 200

if __name__ == '__main__':
	app.run(debug=True, port=8080)