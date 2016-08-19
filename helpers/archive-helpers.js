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
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    console.log('readFile has succeeded with this data: ', data);

    var urls = data.split('\n');
    return cb(urls) || urls;
  });
};

// webserver uses this function
exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls(function(data) {
    cb(_.contains(data, url));
  });
};

// webserver uses this function
exports.addUrlToList = function(url, cb) {
  exports.readListOfUrls(function(contents) {
    fs.writeFile(exports.paths.list, contents + '\n' + url, function(err) {
      if (err) { throw err; }
      cb();
    });
  });
};

exports.isUrlArchived = function(url, cb) {
  fs.readdir(exports.paths.archivedSites, function (err, contents) {
    console.log('contents: ', contents);
    cb(_.reduce(contents, function(acc, curr) {
      if (curr === url) {
        return true;
      }
      return acc;
    }, false));
  });
};

exports.downloadUrls = function(site) {
  $.ajax({
    url: site,
    method: 'GET',
    dataType: 'text',
    // data: {},
    success: function () {},
  });

};
