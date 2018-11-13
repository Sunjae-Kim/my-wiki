const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hello-mongo', { useNewUrlParser: true })
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
const course = new Course({
  name: '실전 DApp 빌드',
  author: 'john',
  tags: ['Ethereum', 'Blockchain', 'DApp'],
  isPublished: true
});

course.save()
  .then(result => console.log(result))
  .catch(error => console.error(error));