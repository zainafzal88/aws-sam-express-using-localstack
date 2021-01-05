const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const s3 = AWS.S3({ endpoint: 'http://localhost:4572' });

app.get('/', (req, res) => {
    res.send('Hello From Express');
});

app.listen(3000);

module.exports = app;