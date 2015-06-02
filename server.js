var express = require('express')
var serveStatic = require('serve-static')

var app = express()

app.use(serveStatic('.tmp', { 'index': ['form-start.html', 'index.html'] }))
app.listen(8000, function () {
    console.log('The server is running on port 8000');
});