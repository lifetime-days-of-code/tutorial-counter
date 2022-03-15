const path = require("path");

const pathGenerator = function (rootUrl, folder, url) {
  return path.join(rootUrl, folder, url);
};

module.exports = pathGenerator;
