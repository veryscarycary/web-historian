var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveSiteAssets = function(resp, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  fs.readFile(archive.paths.siteAssets + asset, function(err, data) {
    exports.headers['Content-Type'] = 'text/html';
    resp.writeHead(200, exports.headers);
    resp.write(data);
    resp.end();
  });
};

exports.serveArchivedAssets = function(resp, asset, callback) {
  fs.readFile(archive.paths.archivedSites + asset, function(err, data) {
    exports.headers['Content-Type'] = 'text/html';
    resp.writeHead(200, exports.headers);
    resp.write(data);
    resp.end();
  });
};



// As you progress, keep thinking about what helper functions you can put here!
