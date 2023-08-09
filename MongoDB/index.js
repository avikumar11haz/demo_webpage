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
  rating: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "RectJs",
    creator: "haz33",
    isPublished: true,
    rating: 4.3,
  });

  const result = await course.save();
  console.log(result);
}

// ratings 0 to 5

// createCourse();

// eq (equal)
//gt(greater than)
// gte(greater than and equal to)
// lt
// lte

// in => {$in : [3, 4.2]}
// not in

async function getCourses() {
  const courses = await Course.find({ rating: { $gte: 4.1 } })
    .select({ name: 1, publishedDate: 1 })
    .sort({ name: 1 });
  console.log(courses);
}

getCourses();
