# zendesk-challenge

This is the code for Zendesk Challenge. User riendly IOC Look up.


## Build & development

1- You should run `nmp install` and `grunt install` to download the dependencies.  

2- Run `grunt --force`  for building and `grunt serve` for preview (Proxies still need to be enabled to query the APIs in preview mode).

3- Move the `honeypot.php`, `dshield.php` and `phishtank.php` to `dist` folder.

The honeypot (json) is pushed to a couchdb database hosted on Smileupps (the Python script *json_to_couchdb.py* can be used to do so).  

The script *json_to_couchdb_sample.py* is a variant where you can specify the number of entry to the database to test the application.

After the import of the json data to the database the design document `views_honeypot` should be added too. It contains some views (map functions) that create indexes on Ip adress, port and url.

A working demo of the application can be found here: http://heyrecruiters.com/zendesk-challenge




