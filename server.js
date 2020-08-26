const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');


var cert_priv = fs.readFileSync(path.join(__dirname, 'ssl/server.key'), 'utf-8');
var cart_pub = fs.readFileSync(path.join(__dirname, 'ssl/server.crt'), 'utf-8');
var cert = {key: cert_priv, cert: cart_pub };

var app = new express();


app.get('/', (req, res) => {
    res.status(200).send('You have reached this domain\'s parking page.');
});

app.all('*', (req, res) => {
    res.status(400).send('Unknown path.');
});


https.createServer(cert, app).listen(8443, () => {
    console.log('HTTPS Server started listening on localhost:8443');
});