var fs = require('fs');
var path = require('path');
var $ = require('jquery');
var _ = require('underscore');
var http = require('http');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// readListOfUrls(isUrlInList(addUrlToList(), site));

// worker uses this function
exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {

    var urls = data.split('\n');
    return cb(urls) || urls;
  });
};

// webserver uses this function
exports.isUrlInList = function(url, cb) {
  return exports.readListOfUrls(function(data) {
    return cb(_.contains(data, url));
  });
};

// webserver uses this function
exports.addUrlToList = function(url, cb) {
  exports.readListOfUrls(function(contents) {
    fs.writeFile(exports.paths.list, contents + '\n' + url, function(err) {
      if (err) { throw err; }
      if (cb) { cb(); }
    });
  });
};

exports.isUrlArchived = function(url, cb) {
  fs.readdir(exports.paths.archivedSites, function (err, contents) {
    cb(_.reduce(contents, function(acc, curr) {
      if (curr === url) {
        return true;
      }
      return acc;
    }, false));
  });
};

exports.downloadUrls = function(urlsArray, cb) {
  // for each
  urlsArray.forEach(function(url) {
    exports.isUrlArchived(url, function(bool) {
      if (!bool) {
        console.log('isUrlArchived truthiness FALSE: ', bool);
        console.log('THE URL', url);

        // http.get('http://www.google.com/index.html', function (res) {
        //   console.log( 'GOT RESPONSE', res);
        //   // consume response body
        //   // res.resume();
        // });
        // debugger;
        http.get(url, function (response) {
          var data = '';
          response.on('data', function(chunk) { data += chunk; });
          console.log(data);
          return data;
        });
        //   .on('error', function (e) { console.log('ERRRRRRRRRRRRRRRRR', e); });

        // request(url, function (error, response, body) {
        //   // if (!error && response.statusCode === 200) {
        //     console.log(response); // Show the HTML for the Google homepage.
        //   // }
        // });
      }

// fs.writeFileSync(exports.paths.archivedSites + url,
        // $.ajax({
        //   url: url,
        //   method: 'GET',
        //   dataType: 'text/html',
        //   success: function (data) {
        //     console.log('DAAAATTTTTAAAA', data);
        //     fs.writeFileSync(archive.paths.archivedSites + url, data);
        //   },
        //   error: function (err) {
        //     console.log('You, sir, have an error.', err);
        //   }
        // });  

    });
  });
  
    // is URL !archived?
      // download via ajax
      // add url to 




};
