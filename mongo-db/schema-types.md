# Mongoose Schema

[TOC]

## 1. Schema Types

### 1.1 Mongoose Map

- Mongoose에서 Map type으로 **schema** 및 **model**을 구현해보자

  ```js
  const userSchema = new Schema({
    socialMediaHandles: {
      type: Map,
      of: String
    }
  });
  
  const User = mongoose.model('User', userSchema);
  ```

  > `socialMediaHandles` 는 value가 String 타입인 Map 구조가 될것이다.
  >
  > <span style="color:red">mongoose의 Map은 value를 어떤 type으로 할지 of 뒤의 값으로 지정해줘야 한다.</span>

- Map 객체를 담은 User 모델을 만들어보자

  ```js
  console.log(new User({
    socialMediaHandles: {
      github: 'vkarpov15',
      twitter: '@code_barbarian'
    }
  }).socialMediaHandles);
  ```

  > 실행결과 : ```Map { 'github' => 'vkarpov15', 'twitter' => '@code_barbarian' }```
  >
  > 위에서 설명한것과 같이 value값이 string인 객체를 생성해보았다.

- 빈 객체를 만들어 Map을 담아보자

  ```js
  const user = new User({
    socialMediaHandles: {}
  });
  
  user.socialMediaHandles.set('github', 'vkarpov15');
  user.set('socialMediaHandles.twitter', '@code_barbarian');
  
  console.log(user.socialMediaHandles.get('github'));
  console.log(user.get('socialMediaHandles.twitter'));
  
  user.save();
  ```

  > 위의 방법과 같이 Mongoose의 map객체에서는 set 함수를 통해서만 map에 Object를 push할 수 있으며  단순 `user.socialMediaHandles.myspace = 'fail';` 처럼<span style="color:red"> `.` 을 이용한 접근은 허용되지 않는다.</span>

### 1.2 Buffer

- Buffer Type은 주로 byte 단위로 쪼개서 읽고 쓰게되는 파일 모델을 만들 때 사용이 된다.

  ```js
  const schema1 = new Schema({ binData: Buffer });
  const schema2 = new Schema({ binData: 'Buffer' });
  
  const Data = mongoose.model('Data', schema2);
  ```

  > 1, 2번 둘다 같은 값을 가지게 된다.

### 1.3 Get, Set

- Schema에 함수로서 적용시킬수 있는 type들이다.

- Get하거나, Set할 때, 즉 값을 설정하거나 불러올 때 `get`과 `set`에 정의해둔 함수를 거치고 오게 된다.

  ```js
  var numberSchema = new Schema({
    integerOnly: {
      type: Number,
      get: v => Math.round(v),
      set: v => Math.round(v),
      alias: 'i'
    }
  });
  
  var Number = mongoose.model('Number', numberSchema);
  
  var doc = new Number();
  doc.integerOnly = 2.001;
  doc.integerOnly; // 2
  doc.i; // 2
  doc.i = 3.001;
  doc.integerOnly; // 3
  doc.i; // 3
  ```

  > `alias` 는 말 그대로 약어로 설정해둘 수 있는 기능이다.

### 1.4 Index

- 스키마 안의 key에 index를 추가하면 해당 스키마로 생성된 모델의 키는 index값을 가지게 된다.

  ```js
    var animalSchema = new Schema({
      name: String,
      type: String,
      tags: { type: [String], index: true } // field level
    });
  
    animalSchema.index({ name: 1, type: -1 }); // schema level
  ```

  > Model의 index는 `_id` 가 되겠고 이건 Field 영역이다. 
  >
  > `tags` 에도 index를 true로 해뒀기 때문에 고유 index가 따로 생기며 이는 Schema 영역이 된다.