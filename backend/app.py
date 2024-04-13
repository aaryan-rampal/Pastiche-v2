from flask import Flask, jsonify, request
from flask_cors import CORS
import pickle
import faiss
import numpy as np
import torch

app = Flask(__name__)
CORS(app)

with open('index.pickle', 'rb') as f:
    index_bytes = pickle.load(f)

# Deserialize the index from the byte array
index = faiss.deserialize_index(index_bytes)

@app.route("/api/pastiche/startup", methods=['GET'])
def startup():
    return "Startup complete", 200


def turnToNumpy(points):
    x_values = [point['x'] for point in points]
    y_values = [point['y'] for point in points]

    points_array = np.column_stack((x_values, y_values))
    doFFT(points_array)
    return points_array

def doFFT(edge):
    points_tensor = torch.from_numpy(edge)

    # centralize the edge
    centroid = points_tensor.float().mean(dim=0)
    centered_points = (points_tensor - centroid).to(torch.float64)

    # normalize the 2d array
    cnt1 = centered_points.numpy()
    scale = np.max(np.abs(cnt1))
    cnt1 /= scale

    # perform fast fourier transform
    dft = np.fft.fft(cnt1[:, 0] + 1j * cnt1[:, 1])
    descriptors = dft[:10]
    # faiss can't take complex numbers so convert to real numbers
    real_vectors = np.concatenate((np.real(descriptors), np.imag(descriptors)), axis=0)
    query = torch.from_numpy(real_vectors).unsqueeze(0)
    print(query.shape)

    D, I = index.search(query, 5)     # actual search
    print(D, I)
    if (D[0][0] > 100):
        print('try again. closest match was ', D[0][0])
    else:
        print(D[0][0], I[0][0])


@app.route("/api/pastiche", methods=['POST'])
def findClosestMatch():
    request_data = request.json.get('data')
    points = turnToNumpy(request_data.get('points'))
    # print(points)

    return 'stub', 200

if __name__ == '__main__':
    app.run(debug=True, port=8080)