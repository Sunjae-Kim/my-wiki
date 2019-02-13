# Collaborative Filtering

![collaborative-filtering](https://cdn-images-1.medium.com/max/1600/1*6_NlX6CJYhtxzRM-t6ywkQ.png)

머신 러닝에서 basic 하게 사용되는 기법으로 연관성을 계산하여 아이템을 추천해주는 추천 시스템의 한 종류이다. 위와 같은 예시로 서로 연관이 깊은 두사람이 있으며 한사람이 구입한 물건을 다른 한사람에게 추천해주는 방식으로 추천 알고리즘이 짜여진다.

**ger** 라는 npm 모듈은 위와 같은 시스템을 간단하게 구현해볼 수 있게 만들어 졌다. 아래 커맨드로 설치 할 수 있다.

```bash
$ npm install ger
```

아래는 간단한 사용 예시이다.

```javascript
var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm);
 
ger.initialize_namespace('movies')
.then( function() {
  return ger.events([
    {
      namespace: 'movies',
      person: 'bob',
      action: 'likes',
      thing: 'xmen',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'movies',
      person: 'bob',
      action: 'likes',
      thing: 'avengers',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'movies',
      person: 'alice',
      action: 'likes',
      thing: 'xmen',
      expires_at: '2020-06-06'
    },
  ])
})
.then( function() {
  // What things might alice like?
  return ger.recommendations_for_person('movies', 'alice', {actions: {likes: 1}})
})
.then( function(recommendations) {
  console.log("\nRecommendations For 'alice'")
  console.log(JSON.stringify(recommendations,null,2))
})
.then( function() {
  // What things are similar to xmen?
  return ger.recommendations_for_thing('movies', 'xmen', {actions: {likes: 1}})
})
.then( function(recommendations) {
  console.log("\nRecommendations Like 'xmen'")
  console.log(JSON.stringify(recommendations,null,2))
})
```

위 함수를 실행했을 때의 결과를 보자

```javascript
Recommendations For 'alice'
{
  "recommendations": [
    {
      "thing": "xmen",
      "weight": 1.5,
      "last_actioned_at": "2015-07-09T14:33:37+01:00",
      "last_expires_at": "2020-06-06T01:00:00+01:00",
      "people": [
        "alice",
        "bob"
      ]
    },
    {
      "thing": "avengers",
      "weight": 0.5,
      "last_actioned_at": "2015-07-09T14:33:37+01:00",
      "last_expires_at": "2020-06-06T01:00:00+01:00",
      "people": [
        "bob"
      ]
    }
  ],
  "neighbourhood": {
    "bob": 0.5,
    "alice": 1
  },
  "confidence": 0.0007147696406599602
}
 
Recommendations Like 'xmen'
{
  "recommendations": [
    {
      "thing": "avengers",
      "weight": 0.5,
      "last_actioned_at": "2015-07-09T14:33:37+01:00",
      "last_expires_at": "2020-06-06T01:00:00+01:00",
      "people": [
        "bob"
      ]
    }
  ],
  "neighbourhood": {
    "avengers": 0.5
  },
  "confidence": 0.0007923350883032776
}
```

이렇게 아이템 베이스 및 유저 베이스 총 2가지로 구현할 수 있으며 각 관계마다 연관성이 얼마나 깊은지를 `weight` 라는 값으로 확인할 수도 있다.



참조: https://www.npmjs.com/package/ger