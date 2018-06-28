var express = require('express');
var app = express();
 
app.use(express.static('public'));
 
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/views/" + "login.html" );
})

app.get('/login.html', function (req, res) {
   res.sendFile( __dirname + "/views/" + "login.html" );
})

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/views/" + "index.html" );
})

// app.post('/index.html', function (req, res) {
//    res.sendFile( __dirname + "/views/" + "index.html" );
// })

app.get('/list.html', function (req, res) {
   res.sendFile( __dirname + "/views/" + "list.html" );
})

app.get('/to_do.html', function (req, res) {
   res.sendFile( __dirname + "/views/" + "to_do.html" );
})

app.get('/done.html', function (req, res) {
   res.sendFile( __dirname + "/views/" + "done.html" );
})
var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("访问地址为 http://127.0.0.1:%s",port)
 
})