import * as http from 'http';
import * as url from 'url';

const port = 5000;
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

/* Global variables */
let listingData, server;

const requestHandler = (request, response) => {
    const parsedUrl = url.parse(request.url);
    console.log("Request Recieved")
    response.end("Hello World");
};



// Creates the server
server = http.createServer(requestHandler);

// Start the server
server.listen(proccess.env.PORT || port, () => {
    console.log(`Sever started at http://127.0.0.1:${port}`);
});
