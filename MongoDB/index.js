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

// comparision operators

// eq (equal)
//gt(greater than)
// gte(greater than and equal to)
// lt
// lte

// in => {$in : [3, 4.2]}
// not in

// Logical operators
//or
// and

async function getCourses() {
  const courses = await Course.find({ rating: { $in: [4.5, 4, 4.1, 4.3] } })
    .select({ name: 1, publishedDate: 1 })
    .or([{ creator: "haz" }, { rating: 4.5 }]);
  console.log(courses);
}

getCourses();
