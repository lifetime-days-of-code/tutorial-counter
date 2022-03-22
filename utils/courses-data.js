const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "courses.json");

function getStoredCourses() {
  const fileData = fs.readFileSync(filePath);
  const storedCourses = JSON.parse(fileData);

  return storedCourses;
}

function storedCourses(storableCourses) {
  fs.writeFileSync(filePath, JSON.stringify(storableCourses));
}

/*
 * [variable that you want to expose. How it should be referred when importing]: [the function you want to expose]
 * getStoredCourses: getStoredCourses
 */
module.exports = {
  getStoredCourses: getStoredCourses,
  storedCourses: storedCourses,
};
