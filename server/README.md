## Server Overview
Server is programmed using Node.JS and it interfaces with MongoDB. It handles serving the React.JS client, database requests for appointments and payments. express.js is where the majority of logic and requests originate in their implementation.

## File structure

`server` - Holds the server application
- `config` - This holds all of the API keys for the database/email        services as well as setup for the Express server
        - `config.js` api keys for local devlopment (not used in production)
        - `express.js` The hub for handling calls to the server as well as setting up the database. Some routes utilizes controllers which will be found under the controller folder.
- `controllers` - This holds definitions for various queryable Express routes as well as behavior for payments
- `models` - This holds definitions and setup for appointment objects
- `routes` - Holds more routing information
	- `api` - This holds how each route should communicate with a HTTP request
- `server.js` - Specifies on which port server should be hosted
