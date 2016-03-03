# zendesk-challenge

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

You should run `nmp install` and `grunt install` to download the dependencies.

## Build & development

The json file from the honeypot is pushed to couchdb database (the Python script *json_to_couchdb.py* can be used to do so).

The script *json_to_couchdb_sample.py* is a variant where you can specify the number of entry to the database to test the application.

couchdb is supposed running on localhost `http://127.0.0.1:5984` and CORS enabled:  

`curl -X PUT http://localhost:5984/_config/httpd/enable_cors -d '"true"'`  

`curl -X PUT http://localhost:5984/_config/cors/origins -d '"*"'`  

Run `grunt` for building and `grunt serve` for preview.


