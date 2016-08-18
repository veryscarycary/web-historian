var path = require('path');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // handlers

  var endpoint = urlParser.parse(req.url).pathname;

  console.log('POSTDATAAA', req._postData);
  console.log('ENDPOINT', endpoint);
  // if url and GET
  if (endpoint === '/api/sites' && req.method === 'GET') {
    

    var site = req.requested_site
    // if (site in sites) {

    // }
    res.end();    
  }

  res.end(archive.paths.list);
};
