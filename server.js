var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');


var cert_prv  = fs.readFileSync(path.join(__dirname, 'ssl/server.key'), 'utf8');
var cart_pub = fs.readFileSync(path.join(__dirname, 'ssl/server.crt'), 'utf8');
var cert = {key: cert_prv, cert: cart_pub};


var express = require('express');
var app = new express();

app.get('/', (req, res) => {
    res.status(200).send('You have reached this domain\'s parking page.');
});

app.all('*', (req, res) => {
    res.status(400).send('Unknown path.');
});


var http_server = http.createServer(app);
var https_server = https.createServer(cert, app);

http_server.listen(8080, () => {
    console.log('HTTP Server started listening on localhost:8080');
});

https_server.listen(8443, () => {
    console.log('HTTPS Server started listening on localhost:8443');
});