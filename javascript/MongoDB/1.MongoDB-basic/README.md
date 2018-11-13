# MongoDB - Basic

[TOC]

## 1. Getting Started

### 1.1 Install MongoDB

- Download: <https://www.mongodb.com/download-center/community>

  MSI파일로 다운받은 뒤 계속 NEXT로 Compass까지 설치하자.

- Path 설정

  고급 시스템설정에의 PATH에서 MongoDB > bin 폴더까지의 경로를 추가하자.

- Data Directory 생성

  Data가 쌓이게 될 `c:/data/db` 폴더를 생성하자.

- Console 창에서 `mongod` 명령어를 입력하여 Database Server를 연결하자.
- Console 창에서 `mongo` 명령어를 통해 MongoDB가 실행되면 정상!

---

### 1.2 Mongoose

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

### 1.3 CRUD Operation

- **Create : Saving Data**

  위 Schema를 통해 Model을 만들고 Model을 통해서 만든 Document를 DB에 저장해보자.

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


---

