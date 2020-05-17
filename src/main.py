# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python37_app]
from flask import Flask, jsonify
from flask import render_template
from flask import request
from google.cloud import datastore
import uuid
import datetime

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)
#CORS(app)

# 初期表示
@app.route('/')
def index():
    return render_template('index.html')

# 生成
@app.route('/create', methods=["POST"])
def crate():
    count = request.form["chips"]
    name1 = request.form["name1"]
    name2 = request.form["name2"]
    name3 = request.form["name3"]
    name4 = request.form["name4"]

    # Instantiates a client
    datastore_client = datastore.Client(namespace="mahjang-chips")

    # The kind for the new entity
    kind = 'Chips'
    # The name/ID for the new entity
    name = str(uuid.uuid4())

    print(name)
    # The Cloud Datastore key for the new entity
    chips_key = datastore_client.key(kind, name)

    # Prepares the new entity
    chips = datastore.Entity(key=chips_key)
    chips['id'] = name
    chips['name1'] = name1
    chips['name2'] = name2
    chips['name3'] = name3
    chips['name4'] = name4
    chips['chips1'] = count
    chips['chips2'] = count
    chips['chips3'] = count
    chips['chips4'] = count
    chips['created'] = datetime.datetime.now()

    # Saves the entity
    datastore_client.put(chips)
    host_name = request.host_url
    return render_template('create.html', host_name=host_name, uuid=name)

# 初期表示
@app.route('/view/<id>')
def view(id=""):
    # Instantiates a client
    datastore_client = datastore.Client(namespace="mahjang-chips")
    kind = 'Chips'
    key = datastore_client.key("Chips", id)
    entity = datastore_client.get(key)
    
    return render_template('view.html', id=id, name1=entity["name1"], name2=entity["name2"], name3=entity["name3"], name4=entity["name4"],
     chips1=entity["chips1"], chips2=entity["chips2"], chips3=entity["chips3"], chips4=entity["chips4"])

@app.route('/regist', methods=['POST'])
def regist():
    json = request.get_json()
    
    datastore_client = datastore.Client(namespace="mahjang-chips")
    kind = 'Chips'
    key = datastore_client.key("Chips", json["id"])
    chips = datastore_client.get(key)
    
    chips['chips1'] = int(chips["chips1"]) + int(json["diff1"])
    chips['chips2'] = int(chips["chips2"]) + int(json["diff2"])
    chips['chips3'] = int(chips["chips3"]) + int(json["diff3"])
    chips['chips4'] = int(chips["chips4"]) + int(json["diff4"])

    datastore_client.put(chips)

    entity = datastore_client.get(key)
    return jsonify(entity)

@app.route('/refresh', methods=['POST'])
def refuresh():
    json = request.get_json()
    
    datastore_client = datastore.Client(namespace="mahjang-chips")
    kind = 'Chips'
    key = datastore_client.key("Chips", json["id"])
    entity = datastore_client.get(key)
    return jsonify(entity)

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python37_app]
