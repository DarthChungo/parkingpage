const express = require('express');
let app = new express();

app.get('/', async(req, res) => {
    await res.send('You have reached this domain\'s parking page.');
});

app.all('*', async(req, res) => {
    await res.status(400).send('Unknown path.');
});

let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Started listening on localhost:${port}`);
});