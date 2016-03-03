import re
from pprint import pprint
import json
import couchdb

with open('honeypot.json', 'r') as myfile:
    data = myfile.read()

#correct json
data = '{"data": ['+data    
data = re.sub(r'events" }', r'events" },', data)
data = re.sub(r'alerts" }', r'alerts" },', data)
data = data[:-2]+']}'

# json to dict
data = json.loads(data)

#see if everything is working fine
#pprint(data['honeypot'][0]['payload'])

#creating a new database in couchdb
couch = couchdb.Server()
honeypot_db = couch.create('honeypot') # create a new database 'honeypot'
#honeypot_db = couch["honeypot"]  #select existing database

#saving payloads instances to database
for pot in data['data']:
    
    #adding timestamp to payloads field if 'channel:amun.events'
    tmp = pot['payload']
    timestamp = pot['timestamp']
    tmp = str(tmp[:-1])+',"time": '+ str(timestamp) +'}'
    tmp = re.sub("u'","'",tmp)
    tmp = tmp.replace("'","\"")
    tmp = json.loads(tmp)
    
    #save to db
    honeypot_db.save(tmp)