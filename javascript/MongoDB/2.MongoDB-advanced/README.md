# MongoDB Advanced

[TOC]

## 1.  Relation

### 1.1 소유관계

- Data Consistency

  - 데이터를 읽어올 때 필요한 만큼만 가져올 수 있게된다.

  ```js
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

