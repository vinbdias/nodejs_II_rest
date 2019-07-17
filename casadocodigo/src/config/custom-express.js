
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use('/static', express.static('src/app/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((request, response, next) => {

    response.set('Content-type', 'application/json');
    next();
});

const routes = require('../app/routes/routes');
routes(app);

app.use((request, response, next) => 
    response.status(404)
        .json({ erro: 'Not found' })
);

app.use((error, request, response, next) => 
    response.status(500)
        .json({ erro: 'Internal server error' })
);

module.exports = app;