from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route("/api/test")
def test():
    return {"message": "Hello from Python backend!"}

@app.route('/upload', methods=['POST'])
def upload_audio():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file part"}), 400
    
    audio = request.files['audio']
    
    if audio.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Save the file to a directory
    file_path = os.path.join('uploads', audio.filename)
    audio.save(file_path)

    return jsonify({"message": "Audio file uploaded successfully", "file_path": file_path})

if __name__ == "__main__":
    app.run(port=5328, ssl_context='adhoc')