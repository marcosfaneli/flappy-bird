const express = require('express')
const app = express()
const port = 5000

app.get('/', function(request, response){
    response.sendFile( __dirname + '/index.html');
});

app.use(express.static(__dirname + '/script'));

app.listen(port, () => console.log(`listening at ${port}`))