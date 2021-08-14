const http = require('http')
const fs = require('fs')

function onRequest( request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  fs.readFile('./index.html', null , function (err, data) {
    if(err){
      response.writeHead(404);
      response.write('file not found');
    }else{
      response.write(data);
    }
    response.end();
  })
  response.end();
}
http.createServer(onRequest).listen(5000)