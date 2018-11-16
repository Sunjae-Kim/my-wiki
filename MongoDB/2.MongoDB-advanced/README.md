# MongoDB Advanced
- [1. Relation](#1-relation)
    - [1.1 소유관계](#11-%EC%86%8C%EC%9C%A0%EA%B4%80%EA%B3%84)
    - [1.2 참조관계](#12-%EC%B0%B8%EC%A1%B0%EA%B4%80%EA%B3%84)
- [2. Practice with Express](#2-practice-with-express)
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

## 2. Practice with Express - Making a movie API

- 지금까지 배운 MongoDB와 Express를 서로 연동하여 간단한 CRUD Operation을 수행할 수 있는 웹 어플리케이션을 만들어 보자. 

- 이제부터는 코드의 내용이 대부분이고 설명보다는 코드와 주석을 통해서 보는것이 이해가 더 빠를것이기 때문에 아래의 링크를 통해서 보도록 하자.

- [Movie API](https://github.com/Sunjae-Kim/TIL/tree/master/mongodb/2.mongodb-advanced/movie-api)

  - [models](https://github.com/Sunjae-Kim/TIL/tree/master/mongodb/2.mongodb-advanced/movie-api/models) : 모든 모델은 명시적으로 단수형으로 naming 정한다.
    - [genre](https://github.com/Sunjae-Kim/TIL/tree/master/mongodb/2.mongodb-advanced/movie-api/models/genre.js)
    - [movie](https://github.com/Sunjae-Kim/TIL/tree/master/mongodb/2.mongodb-advanced/movie-api/models/movie.js)
  - [routes](https://github.com/Sunjae-Kim/TIL/tree/master/mongodb/2.mongodb-advanced/movie-api/routes) : 모든 라우터는 명시적으로 복수형으로 naming한다.
    - [genres](https://github.com/Sunjae-Kim/TIL/tree/master/mongodb/2.mongodb-advanced/movie-api/routes/genres)
    - [movies](https://github.com/Sunjae-Kim/TIL/tree/master/mongodb/2.mongodb-advanced/movie-api/routes/movies)

  > 파일들은 Model과 Router별로 나누어져 관리되고 있으며 앞으로의 API들 역시 해당 모델로 만들어질것으로 잘 익혀두자.