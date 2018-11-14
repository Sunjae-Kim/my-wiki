const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/embadding', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error));

const authorSchema = new mongoose.Schema({
  name: String,
  github: String
})

const courseScheme = new mongoose.Schema({
  name: String,
  author: [authorSchema]
})

const Author = mongoose.model('Author', authorSchema);
const Course = mongoose.model('Course', courseScheme);

async function createCourse(name, author) {
  try{
    const course = new Course({name, author});
    const result = await course.save();
    console.log(result);
  } catch(error){
    console.error(error);
  }
}

async function listCourses(){
  try{
    const courses = await Course.find();
  console.log(courses);
  } catch(error){
    console.error(error);
  }
}

createCourse('HyperLedger', new Author({ name: 'John', github: 'github.com'}))
// listCourses();