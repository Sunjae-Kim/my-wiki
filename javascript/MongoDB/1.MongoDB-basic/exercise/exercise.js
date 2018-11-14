const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost/exercise-basic",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Successfully Connected to MongoDB"))
  .catch(error => console.log(error));

/*
  Available Schema Datatypes : 
  String, Number, Date, Buffer, Boolean, ObjectID, Array
*/
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

/* Making Model */
const Course = mongoose.model("Course", courseSchema);

async function getExercise1() {
  try {
    const courses = await Course.find({ isPublished: true, tags: "backend" })
      .sort({ name: 1 })
      .select({ name: 1, author: 1 });
    console.log(courses);
  } catch (error) {
    console.error(error.message);
  }
}

async function getExercise2() {
  try {
    const courses = await Course
      .find({ isPublished: true })
      .or([{ tags: "frontend" }, { tags: "backend" }])
      .sort({ price: -1 })
      .select("name price");
    console.log(courses);
  } catch (error) {
    console.error(error.message);
  }
}

async function getExercise3() {
  try {
    const courses = await Course
    .find()
    .or(
      { price: { $gt: 15 } },
      { name: /.*js.*/i } // i가 뒤에 붙으면 대소문자 구분 X
    );
    console.log(courses);
  } catch (error) {
    console.error(error.message);
  }
}

// getExercise1();
// getExercise2();
getExercise3();
