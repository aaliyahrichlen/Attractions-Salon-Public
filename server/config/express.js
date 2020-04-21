const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    api = require('../routes/api/index');

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true, useUnifiedTopology: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middlewareE
    app.use(bodyParser.json());

    if (process.env.NODE_ENV === 'production') {
        //this is for the https rerouting
        app.use('*', function(req, res, next) {
            console.log('HELLLLLLLO')
            console.log(req.get('X-Forwarded-Proto'));
            if ((req.get('X-Forwarded-Proto') !== 'https')) {
            res.redirect('https://' + req.get('Host') + req.url);
            } else
            next();
        });
    }

    //This enabled CORS, Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) 
    //on a web page to be requested from another domain outside the domain from which the first resource was served

    app.all('/*', function(req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
        if (req.method == 'OPTIONS') {
        res.status(200).end();
        } else {
        next();
        }
    });

    // add a router
    // app.use('/api/example', exampleRouter);
    app.use('/api', api);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    app.get('/images/:image_id', (req, res, next) => {

        let filepath = path.resolve(__dirname + '/../images/' + req.params.image_id);

        res.sendFile(filepath);

    });

    return app
}

