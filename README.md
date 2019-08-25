# getir-case

This RESTful API with a single endpoint that fetches the data in the
provided MongoDB collection and return the results in the requested format.

### Tech

getir-case uses a number of open source projects to work properly.
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework 
* [MongoDB] - nosql database

And of course getir-case itself is open source with a [public repository][git]
 on GitHub.

### Installation

Follow the comments in the below for installation.

```sh
$ git clone https://github.com/haticeyunlu/getir-case.git
$ cd getir-case
$ npm install -d
$ cp config/config_template.js config/index.js
$ vim config/index.js
$ npm start
```

For production environments...

```sh
$ git clone https://github.com/haticeyunlu/getir-case.git
$ cd getir-case
$ npm install --production
$ cp config/config_template.js config/index.js
$ vim config/index.js
$ npm start
```

For test...

```sh
$ npm test
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
```
### Configuration

* app.port: the port number you want to serve
* database.uri: connection string of database


### Request (as cURL)
```bash
curl -X POST \
  http://host:port/api/record \
  -H 'Content-Type: application/json' \
  -d '{
	"startDate":"2016-07-01",
	"endDate":"2016-07-10",
	"minCount":1000,
	"maxCount":1500
	}'
```


   [git]: <https://github.com/haticeyunlu/getir-case>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [MongoDB]: <https://www.mongodb.com/>
   [AngularJS]: <http://angularjs.org>
  

