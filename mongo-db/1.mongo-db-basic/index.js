const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hello-mongo', { useNewUrlParser: true })
  .then(() => console.log('Successfully Connected to MongoDB'))
  .catch(error => console.log(error));

/*
  Available Schema Datatypes : 
  String, Number, Date, Buffer, Boolean, ObjectID, Array
*/

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2},
  author: String,
  tags: {
     type: Array,
     validate: {
      validator: function(tags) { 
        const result = tags.every(tag => tag.lenght > 0);
        return tags && tags.length > 0 && result;
      },
      message: 'A Course should have at least 1 tag'
     }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

/* Making Model */
const Course = mongoose.model('Course', courseSchema);

/* CRUD Operation */
/* Create */
async function createCourse() {
  const course = new Course({
    name: 'a',
    author: 'me',
    tags: [],
    isPublished: true
  });
  
  try{
    const result = await course.save();
    console.log(result);
  }catch(error){
    console.error(error.message);
  }
}

createCourse();

/* Read */
async function getCourses(){
  try{
    const courses = await Course.find();
    console.log(courses);
  }catch(error){
    console.error(error.message);
  }
}

/* Read  */
async function getCourse(){
  try{
    const courses = await Course
      .find({ isPublished: true })
      .limit(10) // 10개의 데이터만 
      .sort({ name: -1 }) // 이름 내림차순
      .select({ name: 1, tags: 1 }) // 이름과 태그만 가져온다.
    console.log(courses);
  }catch(error){
    console.error(error.message);
  }
}

/* Update */
/* Query First */
async function updateCourse(id){
  try{
    // Find
    const course = await Course.findById(id); // 1개 객체 반환
    if(!course) return;

    // Change
    course.author = '선재';
    course.tags = ['TIL', 'MusicSeed', 'Gardeners'];

    // Save
    const result = await course.save();
    console.log(result);
  }catch(error){
    console.error(error)
  }
}

/* Update First */
async function updateCourses(){
  try{
    const result = await Course.updateMany({ isPublished: false }, {
      $set: {
        author: 'Sunjae',
      }
    })
    console.log(result);
  }catch(error){
    console.error(error)
  }
}

/* Destroy */
async function removeCourse(id){
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}