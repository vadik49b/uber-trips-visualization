from csv import DictReader
from flask import Flask
from flask_socketio import SocketIO, emit
from random import randint
import json

rides = []

with open('uber-data.csv') as csvfile:
    rides_reader = DictReader(csvfile, delimiter=',')
    for ride in rides_reader:
        rides.append(ride)

app = Flask(__name__)
socketio = SocketIO(app)


@app.route('/api/ride')
def get_ride():
    random_ride = rides[randint(0, len(rides))]
    return json.dumps(random_ride)


@socketio.on('connect')
def test_connect():
    emit('my response', {'data': 'Connected'})


if __name__ == '__main__':
    socketio.run(app)
