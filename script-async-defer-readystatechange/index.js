var express = require('express')
var app = express()
var path = require('path')

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/script-default.js', function (req, res) {
  res.set('Content-Type', 'application/javascript')
  res.send('console.log("execute default script")')
})

app.get('/script-async.js', function (req, res) {
  res.set('Content-Type', 'application/javascript')
  res.send('console.log("execute async script")')
})

app.get('/script-defer.js', function (req, res) {
  res.set('Content-Type', 'application/javascript')
  res.send('console.log("execute defer script")')
})

app.listen(3000, function () {
  console.log('listening on port 3000.')
});
