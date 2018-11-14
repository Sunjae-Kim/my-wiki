# MongoDB - Basic

[TOC]


## 1. Install MongoDB

- Download: <https://www.mongodb.com/download-center/community>

  MSI파일로 다운받은 뒤 계속 NEXT로 Compass까지 설치하자.

- Path 설정

  고급 시스템설정에의 PATH에서 MongoDB > bin 폴더까지의 경로를 추가하자.

- Data Directory 생성

  Data가 쌓이게 될 `c:/data/db` 폴더를 생성하자.

- Console 창에서 `mongod` 명령어를 입력하여 Database Server를 연결하자.
- Console 창에서 `mongo` 명령어를 통해 MongoDB가 실행되면 정상!

---

## 2. Mongoose

- `$ npm install mongoose` 통해서 설치한다.

- **Run**

  ```js
  const mongoose = require('mongoose');
  
  mongoose.connect('mongodb://localhost/hello-mongo', { useNewUrlParser: true })
    .then(() => console.log('Successfully Connected to MongoDB'))
    .catch(error => console.log(error));
  ```

- **Schema**

  MongoDB에는 Schema가 없기 때문에 Mongoose가 지원하는 schema의 기능을 사용하게 된다.

  그렇다고 Joi를 안 쓰지는 않는다. 

  ```js
  const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
  });
  ```

  > - ID는 Mongoose의 Schema가 `ObjectID` 타입으로 자동으로 생성을 해준다.
  > - Schema Datatypes : String, Number, Date, Buffer, Boolean, Object ID, Array

## 3. CRUD Operation

### 3.1 Create : Saving Data

- 위 Schema를 통해 Model을 만들고 Model을 통해서 만든 Document를 DB에 저장해보자.

  ```js
    const Course = mongoose.model('Course', courseSchema);
    
    const course = new Course({
      name: 'Express API 빌드하기',
      author: 'neo',
      tags: ['nodeJS', 'express', 'mongodb'],
      isPublished: true
    });
    
    course.save()
      .then(result => console.log(result))
      .catch(error => console.error(error));
  ```

  > MongoDB Compass를 통해서 데이터가 잘 들어갔는지 확인해보자.


### 3.2 Read : Get Data

- 다양한 조건에 맞는 정보를 가져오는 함수를 만들어보자.

  ```js
    async function getCourse(){
      try{
        const courses = await Course
          .find({ isPublished: true })
          .limit(10) 						// 10개의 데이터만 
          .sort({ name: -1 }) 				// 이름 내림차순
          .select({ name: 1, tags: 1 }) 	// 이름과 태그만 가져온다.
        console.log(courses);
      }catch(error){
        console.error(error.message);
      }
    }
  ```

  > `find` 의 매겨변수로 아무것도 넘겨주지 않게 되면 모든 Course들을 가져오게 된다.

- **비교 쿼리 연산자**

  | 연산자 | 뜻            | 사용법                              |
  | ------ | ------------- | ----------------------------------- |
  | `$eq`  | 같은          | `.find({ price: {$eq: 10} })`       |
  | `$ne`  | 같지 않은     | -                                   |
  | `$gt`  | 큰            | -                                   |
  | `$gte` | 크거나 같은   | -                                   |
  | `$lt`  | 작은          | -                                   |
  | `$lte` | 작거나 같은   | -                                   |
  | `$in`  | 포함되어 있는 | `.find({ price: {$in: [10, 15]} })` |
  | `$nin` | 포함되지 않는 | -                                   |

- **논리 쿼리 연산자**

  | 연산자 | 뜻                                                           |
  | ------ | ------------------------------------------------------------ |
  | `$and` | Joins query clauses with a logical `AND` returns all documents that match the conditions of both clauses. |
  | `$not` | Inverts the effect of a query expression and returns documents that do *not* match the query expression. |
  | `$or`  | Joins query clauses with a logical `NOR` returns all documents that fail to match both clauses. |
  | `$nor` | Joins query clauses with a logical `OR` returns all documents that match the conditions of either clause. |

  > 출처 : <https://docs.mongodb.com/manual/reference/operator/query/>

- **정규 표현식**

  | 코드       | 뜻                    | 예시                        |
  | ---------- | --------------------- | --------------------------- |
  | `/^ne/`    | 'ne' 로 시작하는      | `.find({ name: /.*js.*/ })` |
  | `/hn$`     | 'hn' 으로 끝나는      | -                           |
  | `/.*oh.*/` | 'oh' 가 포함되어 있는 | -                           |

### 3.3 Update

#### 3.3.1 Query First :

- **find** > **change** > **save**

  ```js
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
  ```

  > 객체의 정보를 수정한다고 해도 DB에 바로 반영이 되지 않는다. 그럼으로 반드시 수정한 후 저장을 한 뒤에 다른 작업을 수행하도록 하자.

#### 3.3.2 Update First:

- **직접 Update > result**

  ```js
  
  ```

  >
















