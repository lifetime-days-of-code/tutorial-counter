const express = require("express");
const uuid = require("uuid");

const coursesData = require("../utils/courses-data");

const router = express.Router();

router.get("/tutorials", (req, res) => {
  //TODO Add notes for query parameters

  let order = req.query.order;
  let nextOrder = "descending";

  if (order !== "ascending" && order !== "descending") {
    order = "ascending";
  }

  if (order === "descending") {
    nextOrder = "ascending";
  }

  const storedCourses = coursesData.getStoredCourses();
  //TODO fix sorting because is  not working when you press the button the query parameter is changing value but the tutorials are not getting sorted
  // sort the courses Alphabetically
  storedCourses.sort(function (resA, resB) {
    if (
      (order === "ascending" && resA.name > resB.name) ||
      (order === "descending" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("tutorials", {
    numberOfTutorials: storedCourses.length,
    tutorials: storedCourses,
    nextOrder: nextOrder,
  });
});

/*
==== NOTE ====
* we don't know how many tutorials we are going to have so we need to generate the path dynamic
*':' is a dynamic placeholder in the path and after that we can add any identifier we want
! `router.get("tutorials/:placeholder", (req,res) => {...})` //tutorials/t1
! `app.get("tutorials/:placeholder", (req,res) => {...})` //tutorials/t1

*/
router.get("/tutorials/:id", (req, res) => {
  // params.id -> we are looking for the id key because we choose to use :id placeholder value in the get() method
  const tutorialId = req.params.id;

  const storedCourses = coursesData.getStoredCourses();

  for (const course of storedCourses) {
    if (course.id === tutorialId) {
      // we are returning here to stop the function execution
      return res.render("tutorial-details", { tutorial: course });
    }
    // we can't use else here to return an error if a course doesn't exist because there will be many cases in which a course will not exist.
  }
  // render the page outside the loop and the if check.
  res.status(404).render("404");
});

router.get("/recommend", (req, res) => {
  res.render("recommend");
});

router.post("/recommend", (req, res) => {
  // const courseName = req.body.coursename;
  // const courseUrl = req.body.courseurl;
  // const usedEmail = req.body.email;
  // const userName = req.body.username;
  // const startingDate = req.body.date;
  const course = req.body;
  course.id = uuid.v4();

  const courses = coursesData.getStoredCourses();

  courses.push(course);
  storedCourses(courses);

  res.redirect("/recommend");
});

module.exports = router;
