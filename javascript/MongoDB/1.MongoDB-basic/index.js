const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/exercise-basic', { useNewUrlParser: true })
  .then(() => console.log('Successfully Connected to MongoDB'))
  .catch(error => console.log(error));

/*
  Available Schema Datatypes : 
  String, Number, Date, Buffer, Boolean, ObjectID, Array
*/
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

/* Making Model */
const Course = mongoose.model('Course', courseSchema);

/* CRUD Operation */
/* Create */
async function createCourse() {
  const course = new Course({
    name: '실전 DApp 빌드',
    author: 'john',
    tags: ['Ethereum', 'Blockchain', 'DApp'],
    isPublished: true
  });
  
  try{
    const result = await course.save();
    console.log(result);
  }catch(error){
    console.error(error.message);
  }
}

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

