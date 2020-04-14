import json
from pprint import pprint
import datetime

import pandas as pd
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# main index page
@app.route('/')
def index():
    # generating a list of possible years to populate a dropdown
    possible_years = [f"{i:02}" for i in range(int(datetime.datetime.now().strftime("%y")), 2, -1)]

    return render_template("index.html", possible_years=possible_years)

# route to only return data to be called with ajax
@app.route('/_get_data')
def get_data():
    year = request.args.get("year", "20")

    df = pd.read_csv(f"https://cals.arizona.edu/AZMET/data/06{year}rd.txt", header=None)
    df.columns = [
        'Year', 'DOY', 'Station Num',
        'Air Max', 'Air Min', 'Air Mean',
        'RH Max', 'RS Min', 'RH Mean',
        'VPD Mean', 'Solar Rad', 'Precip',
        'Four Soil Temp Max', 'Four Soil Temp Min', 'Four Soil Temp Mean',
        'Twenty Soil Temp Max', 'Twenty Soil Temp Min', 'Twenty Soil Temp Mean',
        'Wind Speed', 'Wind Vec Mag',
        'Wind Vec Dir', 'Wind Dir StDev',
        'Max Wind Speed', 'Heat Units',
        'Ref Evapo', 'Ref Evapo Pen',
        'Actual Vap', 'Dewpoint Daily'
    ]

    # returning a jsonified dictionary object to be used in javascript on the frontend
    # DataFrame.to_json() returns a string, so call json.loads on in to convert that string to a dictionary
    return jsonify(json.loads(df.to_json()))


if __name__ == "__main__":

    app.run(debug=True)
