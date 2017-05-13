from csv import DictReader
from flask import Flask
from random import randint
import json

rides = []

with open('uber-data.csv') as csvfile:
    rides_reader = DictReader(csvfile, delimiter=',')
    for ride in rides_reader:
        rides.append(ride)

app = Flask(__name__)


@app.route('/api/ride')
def get_ride():
    random_ride = rides[randint(0, len(rides))]
    return json.dumps(random_ride)


if __name__ == '__main__':
    app.run()
