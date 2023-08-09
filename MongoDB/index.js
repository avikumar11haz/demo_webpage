const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/testDatabase")
  .then(() => console.log("Connection is Successful"))
  .catch((err) => console.error("could not connect to mongodb", err));

//Schema

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 200 },
  tags: {
    type: Array,
    validate: {
      validator: function (tags) {
        return tags.length > 1;
      },
    },
  },
  category: {
    type: String,
    required: true,
    enum: ["DSA", "Web", "Mobile", "Data Science"],
  },
  creator: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, required: true },
  rating: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "MongoDB",
    tags: ["express", "mongodb"],
    category: "Web",
    creator: "haz33",
    isPublished: true,
    rating: 4.5,
  });

  try {
    await course.validate();
    // const result = await course.save();
    // console.log(result);
  } catch (error) {
    for (field in error.errors) {
      console.log(error.errors[field]);
    }
  }
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

//getCourses();

//update a document

async function updateCourse(id) {
  let course = await Course.findById(id);

  if (!course) return;

  course.name = "Ruby";
  course.creator = "Steve";

  const updateCourse = await course.save();

  console.log(updateCourse);
}
//updateCourse("64d388f14fa7ee6011c6af3e");

//deleting

async function deleteCourse(id) {
  let course = await Course.findByIdAndDelete(id);

  console.log(course);
}

// deleteCourse("64d388f14fa7ee6011c6af3e");
