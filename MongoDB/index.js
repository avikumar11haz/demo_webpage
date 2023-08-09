const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/testDatabase")
  .then(() => console.log("Connection is Successful"))
  .catch((err) => console.error("could not connect to mongodb", err));

//Schema

const courseSchema = new mongoose.Schema({
  name: String,
  creator: String,
  publishedDate: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "JavaScript",
    creator: "haz",
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course.find({ creator: "haz" })
    .select({ name: 1, publishedDate: 1 })
    .sort({ name: 1 });
  console.log(courses);
}

getCourses();
