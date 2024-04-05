from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api/users", methods=['GET'])
def users():
	print('hello')
	return "hello"

if __name__ == '__main__':
	app.run(debug=True, port=8080)