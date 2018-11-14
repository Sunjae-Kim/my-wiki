# MongoDB Advanced

[TOC]

## 1.  Relation

### 1.1 소유관계

- Data Consistency

  - 데이터를 읽어올 때 필요한 만큼만 가져올 수 있게된다.

  ```js
  const authorSchema = new mongoose.Schema({
    name: String,
    github: String
  })
  
  const courseScheme = new mongoose.Schema({
    name: String,
    author: authorSchema
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
  
  createCourse('HyperLedger', new Author({ name: 'John', github: 'github.com'}))
  ```


### 1.2 참조관계

- Query Performance

  - 일괄수정할 때 참조된 전체에 명령할 수 있어서 핸들링이 간편하다.

- `Populate` 를 통해 마치 embed된것 처럼 확인 가능

  ```js
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
  
  // const author = createAuthor('Sunjae', 'github.com/Sunjae-kim');
  // const course = createCourse('React', '5beb8b743c4b6920dc64404e'); 위 author의 ID
  
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
  ```

---

## 2. Practice with Express

지금까지 배운 MongoDB와 Express를 서로 연동하여 간단한 CRUD Operation을 수행할 수 있는 웹 어플리케이션을 만들어 보자.

- Genre, Movie 2개의 모델을 만든 뒤 models 폴더 안에 module화 한다.

  ```js
  const Joi = require("joi");
  const mongoose = require("mongoose");
  
  const genreSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    }
  });
  
  const Genre = mongoose.model("Genre", genreSchema);
  
  function validateGenre(genre) {
    const schema = {
      name: Joi.string()
        .min(3)
        .max(50)
        .required()
    };
    return Joi.validate(genre, schema);
  }
  
  exports.Genre = Genre;
  exports.validate = validateGenre;
  exports.genreSchema = genreSchema;
  ```

- Genres, Movies 2개의 라우터를 만든 뒤 routes 폴더안에 module화 한다.

  ```js
  const { Genre, validate } = require('../models/genre');
  const mongoose = require("mongoose");
  const express = require("express");
  const router = express.Router();
  
  /* CRUD Operation */
  /* Read */
  router.get("/", async (req, res) => {
    // Find
    const genres = await Genre.find().sort("name");
  
    // Response
    res.send(genres);
  });
  
  router.get("/:id", async (req, res) => {
    // Find
    const genre = await Genre.findById(req.params.id);
    if (!genre)
      return res
        .status(404)
        .send(`The genre with given ID(${req.params.id}) was not found.`);
  
    // Response
    res.send(genre);
  });
  
  /* Create */
  router.post("/", async (req, res) => {
    // Validation test
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);
  
    // Save
    let genre = new Genre(req.body);
    genre = await genre.save();
  
    // Response
    res.send(genre);
  });
  
  /* Update */
  router.patch("/:id", async (req, res) => {
    // Validation test
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);
  
    // Find and Update
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return new genre
    );
  
    // Response
    res.send(genre);
  });
  
  /* Delete */
  router.delete("/:id", async (req, res) => {
    // Find and Delete
    const genre = await Genre.findByIdAndDelete(req.params.id);
  
    // Response
    res.send(genre);
  });
  
  module.exports = router;
  ```

- index.js에서 module화 된 genres와 models를 import하여 middleware로 use한다.

  ```js
  /* Modules */
  const genres = require('./routes/genres');
  const movies = require('./routes/movies');
  const mongoose = require("mongoose");
  const express = require("express");
  const app = express();
  
  /* DB Connect */
  mongoose
    .connect(
      "mongodb://localhost/movie-api",
      { useNewUrlParser: true }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error(error));
  
  /* Middleware */
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/movies', movies);
  
  /* Server */
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  ```

