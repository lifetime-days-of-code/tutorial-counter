const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
// this should be the first thing to do after defining the app if we want to use ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// checks if its a request for a static file
app.use(express.static("public"));

//It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: false }));

const PORT = 3000 || ENV.SERVER;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/tutorials", (req, res) => {
  const filePath = path.join(__dirname, "data", "courses.json");

  const fileData = fs.readFileSync(filePath);
  const storedCourses = JSON.parse(fileData);

  res.render("tutorials", { numberOfRestaurants: storedCourses.length });
});

app.get("/recommend", (req, res) => {
  res.render("recommend");
});

app.post("/recommend", (req, res) => {
  // const courseName = req.body.coursename;
  // const courseUrl = req.body.courseurl;
  // const usedEmail = req.body.email;
  // const userName = req.body.username;
  // const startingDate = req.body.date;
  const course = req.body;
  const filePath = path.join(__dirname, "data", "courses.json");

  const fileData = fs.readFileSync(filePath);
  const storedCourses = JSON.parse(fileData);

  storedCourses.push(course);
  fs.writeFileSync(filePath, JSON.stringify(storedCourses));

  res.redirect("/recommend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
