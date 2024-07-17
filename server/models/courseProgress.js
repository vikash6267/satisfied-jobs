const mongoose = require("mongoose")

const courseProgress = new mongoose.Schema({
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
})

module.exports = mongoose.model("courseProgress", courseProgress)
