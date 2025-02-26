from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/test")
def test():
    return {"message": "Hello from Python backend!"}

if __name__ == "__main__":
    app.run(port=5328)
