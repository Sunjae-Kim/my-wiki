const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/relation', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    minlength: 2,
  },
  github: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    minlength: 3,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Author'
  }
}));

async function createAuthor(name, github){
  const author = new Author({ name, github });
  try{
    const result = await author.save();
    console.log(result);
  } catch(error){
    console.error(error.message);
  }
}

async function createCourse(name, author){
  const course = new Course({ name, author });
  try{
    const result = await course.save();
    console.log(result);
  } catch(error){
    console.error(error.message);
  }
}

// const author = createAuthor('Sunjae', 'github.com/Sunjae-kim');
// const course = createCourse('React', '5beb8b743c4b6920dc64404e');

async function listCourses(){
  try{
    const courses = await Course
      .find()
      .populate('author')
      .select('name');
    console.log(courses);
  } catch(error){
    console.error(error.message);
  }
}

listCourses();