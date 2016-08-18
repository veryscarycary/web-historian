var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var urlParser = require('url');
var fs = require('fs');
// require more modules/folders here!

// build this out for the worker
// var siteRequest = $.ajax({
//   url: 'www.google.com',
//   type: 'GET',
//   contentType: 'text/html',
//   success: function(data){
    
//   },
//   error: function(err){

//   }
// });

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10
};

exports.handleRequest = function (req, res) {
  // handlers
  var endpoint = urlParser.parse(req.url).pathname;
  // console.log('POSTDATAAA', req._postData);
  // console.log('ENDPOINT', endpoint);
  // if url and GET

  


  if (endpoint === '/' && req.method === 'GET') {
    httpHelpers.serveSiteAssets(res, '/index.html');

  } else if ( endpoint === '/www.google.com') {
    if (req.method === 'GET') {
      httpHelpers.serveArchivedAssets(res, '/www.google.com');
    } else if (req.method === 'POST') {
      // fs.readFile() plus new site text
      fs.readFile(archive.paths.list, function(err, data) {
        var stringifiedData = data.toString();
        var newData = stringifiedData + '8' + endpoint + '8';
        console.log('NEWDATA', newData);
      //   var newData = sites.Container.push(endpoint.slice(1));
        if (!archive.isUrlInList(stringifiedData, endpoint)) {
          fs.writeFile(archive.paths.list, newData, function(err) {
            if (err) { throw err; }
            console.log('Saved new list!');
          });
        }
      });  
    }

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
