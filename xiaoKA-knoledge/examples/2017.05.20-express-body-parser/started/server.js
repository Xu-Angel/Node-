var http = require('http');
var queryString = require('querystring')
var parsePostBody = function(req, done) {
  var arr = [];
  var chunks;

  req.on('data', buff => {
    arr.push(buff);
  });

  req.on('end', () => {
    chunks = Buffer.concat(arr);
    done(chunks);
  });
};

var server = http.createServer(function(req, res) {
  parsePostBody(req, (chunks) => {
      console.log(chunks, 'chunks');
    var body = chunks.toString();
    body = JSON.parse(body)
    queryString.parse()
    res.end(`Your nick is ${body}`)
  });
});

server.listen(3000);