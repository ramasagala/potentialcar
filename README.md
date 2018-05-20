# potentialcar
Backend API to control the potential-car

## Setup
```
$ git clone https://github.com/ramasagala/potentialcar.git
$ cd potentialcar
$ npm install
$ npm test
$ npm start
```
Default url: http://localhost:3003

Default application settings (e.g. port, db connection) could be configured in `config.js`

## List of end-points
### POST cars/
Create a car (`_id`,`name`,`created`,`license_plate`)
### GET cars/
Get List of cars
### POST cars/:id
Update a car by ID
### GET cars/:id
Get a car by ID
### POST cars/:id/settings/
Update car settings (`lights`,`left_signal`,`right_signal`,`speed`)
### GET cars/:id/settings/
Update car settings


## Dependencies
Implemented using node.js (v10.1.0)

HTTP routing using `express.js`

Unit Test using `mocha` + `chai` + `chai-http`

Database using mongoDB with `mongoose`
