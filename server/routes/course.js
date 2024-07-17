const express = require("express")
const router = express.Router()


const {
    createSubSection,
    // updateSubSection,
    // deleteSubSection,
  } = require("../controllers/Subsection")

// Categories Controllers Import
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
    editCategory,
  } = require("../controllers/Category")

  const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    // editCourse,
    // getInstructorCourses,
    // deleteCourse,
  } = require("../controllers/Course")

//   category

router.post("/createCategory",  createCategory)
router.post("/editCategory" ,editCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)



// courese


// Courses can Only be Created by Instructors
router.post("/createCourse",  createCourse)
// Edit Course routes
// router.post("/editCourse",  editCourse)
//Add a Section to a Course
router.post("/addSection",  createSubSection)
// Update a Section
// router.post("/updateSection",  updateSection)
// Delete a Section
// router.post("/deleteSection",  deleteSection)
// Edit Sub Section
// router.post("/updateSubSection",  updateSubSection)
// Delete Sub Section
// router.post("/deleteSubSection",  deleteSubSection)
// Add a Sub Section to a Section
// router.post("/addSubSection",  createSubSection)
// Get all Courses Under a Specific Instructor
// router.get("/getInstructorCourses",  getInstructorCourses)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails",  getFullCourseDetails)
// To Update Course Progress
// router.post("/updateCourseProgress",  updateCourseProgress)
// To get Course Progress
// router.post("/getProgressPercentage", auth, isStudent, getProgressPercentage)
// Delete a Course
// router.delete("/deleteCourse", deleteCourse)






module.exports = router
