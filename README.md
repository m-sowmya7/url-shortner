POST request --
http://localhost:8001/url

and while testing in PostMan-
body->raw->{"url": "website link"}

the output will be something like this:
{
    "miniId": "GD0CjiXU8"
}

GET request --
http://localhost:8001/miniId

search for this link in google to access the website

MONOGO DB commands --
mongosh - to start the shell
show dbs - to view all the databases
use <data_base_name> - go to the database
show collections
db.<collections>/find({})