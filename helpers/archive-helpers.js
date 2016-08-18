var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  fs.readFile('../web/archives/sites.txt', 'utf8', function(err, data) {
    console.log('readFile has succeeded with this data: ', data);
    cb(data);
  });
};

// webserver uses this function
exports.isUrlInList = function(data, site) {
  return _.contains(data, site) ? true : false; // exports.addUrlToList(data, site);
};

// webserver uses this function
exports.addUrlToList = function(data, site) {
  fs.writeFile('../web/archives/sites.txt', data, 'utf8', function(err) {
    if (err) { throw err; }
    console.log('writeFile has succeeded, data saved');
  });
};

exports.isUrlArchived = function(site) {
  fs.readdir('../web/archives/sites/', function (err, contents) {
    return _.reduce(contents, function(acc, curr) {
      if (curr === site) {
        return true;
      }

      return acc;
    }, false);
  });
};

exports.downloadUrls = function() {
};
