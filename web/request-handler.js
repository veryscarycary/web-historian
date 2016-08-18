var path = require('path');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');
var fs = require('fs');
// require more modules/folders here!

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10
};

exports.handleRequest = function (req, res) {
  // handlers
  var endpoint = urlParser.parse(req.url).pathname;
  console.log('req.method: ', req.method);

  // console.log('POSTDATAAA', req._postData);
  // console.log('ENDPOINT', endpoint);
  // if url and GET
  if (endpoint === '/' && req.method === 'GET') {

    fs.readFile('./web/public/index.html', function(err, data) {
      headers['Content-Type'] = 'text/html';
      res.writeHead(200, headers);
      var x = ' ' + data;
      res.end(x);
    });

  } else if (endpoint === '/api/sites' && req.method === 'GET') {

    res.writeHead();
    res.end();

    var site = req.requested_site;
    // if (site in sites) {

    // }
    res.end();    
  } else {
    console.log(endpoint, "FAILED");
    headers['Content-Type'] = 'text/html';
    res.writeHead(404, headers);
    res.end();
  }

  // res.end(archive.paths.list);
};
