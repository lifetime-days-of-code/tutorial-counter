const express = require("express");
const path = require("path");
const app = express();

const defaultRoutes = require("./routes/default");
const coursesRoutes = require("./routes/courses");

// this should be the first thing to do after defining the app if we want to use ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// checks if its a request for a static file
app.use(express.static("public"));

//It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: false }));

const PORT = 3000 || ENV.SERVER;
// every request that start with a "/" should be handled by defaultRoutes
app.use("/", defaultRoutes);
app.use("/", coursesRoutes);

app.use(function (req, res) {
  // we are using status so we can communicate to the browser that this request leaded to failure 404 page.
  // because previously in the dev tools the status was 200 because in reality it served a 404 page.
  res.status(404).render("404");
  // this needs to be here because the code is executed top to bottom and this should be the last stop
  // this will kick in whenever we have a request that's not handled by any of the other routes
});

// we need ot pass all the 4 parameters so express can understand that this is a special error handling function
app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
